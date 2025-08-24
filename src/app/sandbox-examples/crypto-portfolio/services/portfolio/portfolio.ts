import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, exhaustMap, map, tap } from 'rxjs';
import { AssetList } from '../asset-list/asset-list';

interface PortfolioAsset {
  id: string;
  assetId: string;
  amount: number;
}

interface PortfolioUpsertTransaction {
  assetId: string;
  amount: number;
}

interface PortfolioHistory {
  id: string;
  assetId: string;
  amount: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class Portfolio {
  private assetList = inject(AssetList);
  private portfolioName$ = new BehaviorSubject<string>('');
  private portfolioAssets$ = new BehaviorSubject<PortfolioAsset[]>([]);
  private portfolioHistory$ = new BehaviorSubject<PortfolioHistory[]>([]);

  getPortfolioName() {
    return this.portfolioName$.asObservable();
  }

  setPortfolioName(name: string) {
    this.portfolioName$.next(name);
  }

  getPortfolioAssets() {
    return combineLatest([this.portfolioAssets$, this.assetList.getAssets()]).pipe(
      map(([portfolioAssets, assetList]) => {
        return portfolioAssets.map((portfolioAsset) => {
          const asset = assetList.find((asset) => asset.id === portfolioAsset.assetId);
          return { ...portfolioAsset, totalPrice: portfolioAsset.amount * (asset?.price ?? 0) };
        });
      })
    );
  }

  getPortfolioTotal() {
    return this.getPortfolioAssets().pipe(
      map((portfolioAssets) => portfolioAssets.reduce((acc, asset) => acc + asset.totalPrice, 0))
    );
  }

  getPortfolioTotalHistory() {
    return this.portfolioHistory$.asObservable();
  }

  updatePortfolioHistory(transaction: PortfolioUpsertTransaction) {
    this.assetList.getAssets().pipe(
      map((assetList) => assetList.find((asset) => asset.id === transaction.assetId)),
      tap((asset) => {
        this.portfolioHistory$.next([
          ...this.portfolioHistory$.value,
          {
            id: crypto.randomUUID(),
            assetId: transaction.assetId,
            amount: transaction.amount,
            totalPrice: transaction.amount * (asset?.price ?? 0),
          },
        ]);
      })
    );
  }

  upsertPortfolioAsset(transaction: PortfolioUpsertTransaction) {
    const asset = this.portfolioAssets$.value.find(
      (asset) => asset.assetId === transaction.assetId
    );
    this.updatePortfolioHistory(transaction);
    if (asset) {
      this.updatePortfolioAsset(transaction);
    } else {
      this.addPortfolioAsset(transaction);
    }
  }

  updatePortfolioAsset(transaction: PortfolioUpsertTransaction) {
    this.portfolioAssets$.next(
      this.portfolioAssets$.value.map((asset) =>
        asset.assetId === transaction.assetId ? { ...asset, amount: transaction.amount } : asset
      )
    );
  }

  addPortfolioAsset(transaction: PortfolioUpsertTransaction) {
    const isValidAsset = this.assetList.isValidAsset(transaction.assetId);
    if (!isValidAsset) {
      throw new Error('Invalid asset ID');
    }

    this.portfolioAssets$.next([
      ...this.portfolioAssets$.value,
      {
        id: crypto.randomUUID(),
        assetId: transaction.assetId,
        amount: transaction.amount,
      },
    ]);
  }

  removePortfolioAsset(assetId: string) {
    this.portfolioAssets$.next(
      this.portfolioAssets$.value.filter((asset) => asset.assetId !== assetId)
    );
    this.updatePortfolioHistory({ assetId, amount: 0 });
  }
}
