import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioHistory } from '../../services/portfolio/portfolio';


@Component({
  selector: 'app-transaction-item',
  imports: [CommonModule],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.sass'
})
export class TransactionItem {
  @Input() transaction!: PortfolioHistory;
}
