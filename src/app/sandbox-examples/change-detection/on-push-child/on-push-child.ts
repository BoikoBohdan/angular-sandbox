import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-on-push-child',
  imports: [],
  templateUrl: './on-push-child.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushChild {
  componentData = input.required<{ displayComponentName: string }>();
  onCountChange = output<{ count: number; componentName: string }>();
  count = 0;

  ngOnInit() {
    console.log(`Component ${this.componentData().displayComponentName} initialized`);
  }

  ngDoCheck() {
    // This is called when the component is checked by the change detection
    console.log(`Component ${this.componentData().displayComponentName} checked`);
  }

  onCountIncrement() {
    this.count++;
  }

  onMouseMove() {}
}
