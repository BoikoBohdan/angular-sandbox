import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Portfolio } from '../../services/portfolio/portfolio';

interface PortfolioData {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  assetsCount: number;
  bestPerformer: string;
  worstPerformer: string;
}

@Component({
  selector: 'app-portfolio-overview',
  imports: [CommonModule, ],
  templateUrl: './portfolio-overview.html',
  styleUrl: './portfolio-overview.sass'
})
export class PortfolioOverview {
  private portfolio = inject(Portfolio);
  portfolioTotal$ = this.portfolio.getPortfolioTotal();

  @Input() data: PortfolioData = {
    totalValue: 45250.75,
    dailyChange: 1250.30,
    dailyChangePercent: 2.84,
    assetsCount: 4,
    bestPerformer: 'ADA +5.2%',
    worstPerformer: 'ETH -1.5%'
  };
}
