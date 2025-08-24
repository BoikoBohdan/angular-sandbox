import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, exhaustMap, map, Observable, takeLast, tap } from 'rxjs';
import { AssetInfo, AssetList } from '../asset-list/asset-list';

export interface PortfolioAsset {
  id: string;
  assetId: string;
  amount: number;
}

export type PortfolioAssetWithAssetInfo = PortfolioAsset &
  AssetInfo & {
    totalPrice: number;
  };
interface PortfolioUpsertTransaction {
  assetId: string;
  amount: number;
  action: 'buy' | 'sell';
}

export interface PortfolioHistory {
  id: string;
  assetId: string;
  amount: number;
  totalPrice: number;
  date: string;
  action: 'buy' | 'sell';
  assetName: string;
}

@Injectable({
  providedIn: 'root',
})
export class Portfolio {
  private assetList = inject(AssetList);
  private portfolioAssets$ = new BehaviorSubject<PortfolioAsset[]>([]);
  private portfolioHistory$ = new BehaviorSubject<PortfolioHistory[]>([]);

  getPortfolioAssets(): Observable<PortfolioAssetWithAssetInfo[]> {
    return combineLatest([this.portfolioAssets$, this.assetList.getAssets()]).pipe(
      map(([portfolioAssets, assetList]) => {
        return portfolioAssets.map((portfolioAsset) => {
          const asset = assetList.find((asset) => asset.id === portfolioAsset.assetId);
          return {
            ...portfolioAsset,
            totalPrice: portfolioAsset.amount * (asset?.price ?? 0),
            name: asset?.name ?? '',
            price: asset?.price ?? 0,
            symbol: asset?.symbol ?? '',
          };
        });
      })
    );
  }

  getPortfolioHistory(): Observable<PortfolioHistory[]> {
    return combineLatest([this.portfolioHistory$, this.assetList.getAssets()]).pipe(
      map(([portfolioHistory, assetList]) => {
        return portfolioHistory.map((history) => {
          const asset = assetList.find((asset) => asset.id === history.assetId);
          return {
            ...history,
            totalPrice: history.amount * (asset?.price ?? 0),
            assetName: asset?.name ?? '',
          };
        });
      })
    );
  }

  getPortfolioTotal() {
    return this.getPortfolioAssets().pipe(
      map((portfolioAssets) =>
        portfolioAssets.reduce((acc, asset) => acc + asset.amount * asset.price, 0)
      )
    );
  }

  updatePortfolioHistory(transaction: PortfolioUpsertTransaction) {
    const newTransaction = {
      id: crypto.randomUUID(),
      assetId: transaction.assetId,
      amount: transaction.amount,
      totalPrice: 0,
      date: new Date().toISOString(),
      action: transaction.action,
      assetName: '',
    };
    console.log('newTransaction', newTransaction, crypto.randomUUID());
    this.portfolioHistory$.next([...this.portfolioHistory$.value, newTransaction]);
  }

  buyPortfolioAsset(transaction: PortfolioUpsertTransaction) {
    const currentAsset = this.portfolioAssets$.value;
    const asset = currentAsset.find((asset) => asset.assetId === transaction.assetId);
    if (!asset) {
      this.portfolioAssets$.next([
        ...currentAsset,
        { id: crypto.randomUUID(), assetId: transaction.assetId, amount: transaction.amount },
      ]);
      return;
    } else {
      const updatedAsset = currentAsset.map((asset) =>
        asset.assetId === transaction.assetId
          ? { ...asset, amount: asset.amount + transaction.amount }
          : asset
      );
      this.portfolioAssets$.next(updatedAsset);
      this.updatePortfolioHistory(transaction);
    }
  }

  sellPortfolioAsset(transaction: PortfolioUpsertTransaction) {
    const currentAsset = this.portfolioAssets$.value;
    const updatedAsset = currentAsset.map((asset) =>
      asset.assetId === transaction.assetId
        ? { ...asset, amount: asset.amount - transaction.amount }
        : asset
    );
    this.portfolioAssets$.next(updatedAsset);
    this.updatePortfolioHistory(transaction);
  }
}
