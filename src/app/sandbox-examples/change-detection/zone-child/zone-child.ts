import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-zone-child',
  imports: [],
  templateUrl: './zone-child.html',
})
export class ZoneChild {
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
