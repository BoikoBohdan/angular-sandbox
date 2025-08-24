import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Asset {
  id: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class AssetList {
  private assets = new BehaviorSubject<Asset[]>([]);

  isValidAsset(assetId: string) {
    return this.assets.value.some((asset) => asset.id === assetId);
  }

  getAssets() {
    return this.assets.asObservable();
  }

  addAsset(asset: Asset) {
    this.assets.next([...this.assets.value, { ...asset, id: crypto.randomUUID() }]);
  }

  removeAsset(id: string) {
    this.assets.next(this.assets.value.filter((asset) => asset.id !== id));
  }

  updateAsset(id: string, asset: Asset) {
    this.assets.next(this.assets.value.map((a) => (a.id === id ? asset : a)));
  }

  changeAssetPrice(id: string, price: number) {
    this.assets.next(this.assets.value.map((a) => (a.id === id ? { ...a, price } : a)));
  }
}
