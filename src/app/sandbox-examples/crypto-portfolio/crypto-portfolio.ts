import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioOverview } from './components/portfolio-overview/portfolio-overview';
import { HoldingCard } from './components/holding-card/holding-card';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Portfolio } from './services/portfolio/portfolio';
import { AvailableAssets } from './components/available-assets/available-assets';

@Component({
  selector: 'app-crypto-portfolio',
  imports: [
    CommonModule,
    PortfolioOverview,
    HoldingCard,
    TransactionItem,
    AvailableAssets,
  ],
  templateUrl: './crypto-portfolio.html',
  styleUrl: './crypto-portfolio.sass',
})
export class CryptoPortfolio {
  private portfolio = inject(Portfolio);
  portfolioAssets$ = this.portfolio.getPortfolioAssets();
  recentTransactions$ = this.portfolio.getPortfolioHistory();
}
