import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AssetInfo {
  id: string;
  name: string;
  price: number;
  symbol: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssetList {
  private assets = new BehaviorSubject<AssetInfo[]>([
    {
      id: '1',
      name: 'Bitcoin',
      price: 100000,
      symbol: 'BTC',
    },
    {
      id: '2',
      name: 'Ethereum',
      price: 3000,
      symbol: 'ETH',
    },
    {
      id: '3',
      name: 'Solana',
      price: 100,
      symbol: 'SOL',
    },
  ]);

  isValidAsset(assetId: string) {
    return this.assets.value.some((asset) => asset.id === assetId);
  }

  getAssets() {
    return this.assets.asObservable();
  }

  addAsset(asset: AssetInfo) {
    this.assets.next([...this.assets.value, { ...asset, id: crypto.randomUUID() }]);
  }

  removeAsset(id: string) {
    this.assets.next(this.assets.value.filter((asset) => asset.id !== id));
  }

  updateAsset(id: string, asset: AssetInfo) {
    this.assets.next(this.assets.value.map((a) => (a.id === id ? asset : a)));
  }

  changeAssetPrice(id: string, price: number) {
    this.assets.next(this.assets.value.map((a) => (a.id === id ? { ...a, price } : a)));
  }
}
