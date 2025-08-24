import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PortfolioAssetWithAssetInfo,
} from '../../services/portfolio/portfolio';

@Component({
  selector: 'app-holding-card',
  imports: [CommonModule],
  templateUrl: './holding-card.html',
  styleUrl: './holding-card.sass'
})
export class HoldingCard {
  @Input() holding!: PortfolioAssetWithAssetInfo;
}
