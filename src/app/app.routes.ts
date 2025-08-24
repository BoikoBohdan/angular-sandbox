import { Routes } from '@angular/router';
import { Home } from './sandbox-examples/simple-home-page/home';
import { ChangeDetection } from './sandbox-examples/change-detection/change-detection';
import { SignalVsRxjs } from './sandbox-examples/signals-vs-rxjs/signals-vs-rxjs';
import { CryptoPortfolio } from './sandbox-examples/crypto-portfolio/crypto-portfolio';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'change-detection',
    component: ChangeDetection,
  },
  {
    path: 'signal-rxjs',
    component: SignalVsRxjs,
  },
  {
    path: 'crypto-portfolio',
    component: CryptoPortfolio,
  },
];
