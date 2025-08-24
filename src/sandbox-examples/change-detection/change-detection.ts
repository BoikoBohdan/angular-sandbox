import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ZoneChild } from './zone-child/zone-child';
import { OnPushChild } from './on-push-child/on-push-child';

@Component({
  selector: 'app-re-render-tree-parent',
  imports: [ZoneChild, OnPushChild],
  templateUrl: './change-detection.html',
  styleUrl: './change-detection.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetection {
  totalCount = 0;
  listSimpleComponents = [
    { displayComponentName: 'Component1'},
    { displayComponentName: 'Component2'},
  ];
  listComponentsWithChangeDetection = [
    { displayComponentName: 'Component3'},
    { displayComponentName: 'Component4'},
  ];

  ngDoCheck() {
    console.log('Parent checked');
  }

  onTotalCountIncrement() {
    this.totalCount++;
    this.listComponentsWithChangeDetection[1].displayComponentName = `Mutated Component ${Math.floor(Math.random() * 100)}`;
    this.listSimpleComponents[1].displayComponentName = `Mutated Component ${Math.floor(Math.random() * 100)}`;
  }
}
