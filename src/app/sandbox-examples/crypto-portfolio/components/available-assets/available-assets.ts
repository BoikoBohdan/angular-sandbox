import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetInfo, AssetList } from '../../services/asset-list/asset-list';
import { Portfolio } from '../../services/portfolio/portfolio';

@Component({
  selector: 'app-available-assets',
  imports: [CommonModule],
  templateUrl: './available-assets.html',
  styleUrl: './available-assets.sass',
})
export class AvailableAssets {
  private assetList = inject(AssetList);
  private portfolio = inject(Portfolio);
  availableAssets$ = this.assetList.getAssets();

  // Track quantity for each asset
  quantities: { [symbol: string]: number } = {};

  getQuantity(symbol: string): number {
    return this.quantities[symbol] || 1;
  }

  incrementQuantity(symbol: string) {
    this.quantities[symbol] = (this.quantities[symbol] || 1) + 1;
  }

  decrementQuantity(symbol: string) {
    const current = this.quantities[symbol] || 1;
    this.quantities[symbol] = Math.max(1, current - 1);
  }

  updateQuantity(symbol: string, value: string) {
    const numValue = parseInt(value, 10);
    this.quantities[symbol] = Math.max(1, numValue || 1);
  }

  onBuyAsset(asset: AssetInfo) {
    const quantity = this.getQuantity(asset.symbol);
    this.portfolio.buyPortfolioAsset({
      assetId: asset.id,
      amount: quantity,
      action: 'buy',
    });
  }

  onSellAsset(asset: AssetInfo) {
    const quantity = this.getQuantity(asset.symbol);
    this.portfolio.sellPortfolioAsset({
      assetId: asset.id,
      amount: quantity,
      action: 'sell',
    });
  }
}
