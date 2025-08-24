import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { Component, computed, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-signals-vs-rxjs',
  imports: [AsyncPipe],
  templateUrl: './signals-vs-rxjs.html',
  styleUrl: './signals-vs-rxjs.sass',
})
export class SignalVsRxjs {
  countValue1 = signal(2);
  countValue2 = signal(3);

  powerResultSignal = computed(() => {
    const base = this.countValue1();
    const exponent = this.countValue2();
    console.log('signal:', 'base', base, 'exponent', exponent);
    return Math.pow(base, exponent);
  });

  countValueRxjs1 = new BehaviorSubject(2);
  countValueRxjs2 = new BehaviorSubject(3);

  powerResultRxjs$ = combineLatest([
    this.countValueRxjs1.asObservable(),
    this.countValueRxjs2.asObservable()
  ]).pipe(
    tap(([base, exponent]) => console.log('rxjs:', 'base', base, 'exponent', exponent)),
    map(([base, exponent]) => Math.pow(base, exponent))
  );


  onCountValue1Increment() {
    this.countValue1.set(this.countValue1() + 1);
  }

  onCountValue1Decrement() {
    this.countValue1.set(Math.max(0, this.countValue1() - 1));
  }

  onCountValue2Increment() {
    this.countValue2.set(this.countValue2() + 1);
  }

  onCountValue2Decrement() {
    this.countValue2.set(Math.max(0, this.countValue2() - 1));
  }

  onBothValuesIncrement() {
    this.countValue1.set(this.countValue1() + 1);
    this.countValue2.set(this.countValue2() + 1);
  }

  // RxJS methods
  onCountValueRxjs1Increment() {
    this.countValueRxjs1.next(this.countValueRxjs1.value + 1);
  }

  onCountValueRxjs1Decrement() {
    this.countValueRxjs1.next(Math.max(0, this.countValueRxjs1.value - 1));
  }

  onCountValueRxjs2Increment() {
    this.countValueRxjs2.next(this.countValueRxjs2.value + 1);
  }

  onCountValueRxjs2Decrement() {
    this.countValueRxjs2.next(Math.max(0, this.countValueRxjs2.value - 1));
  }

  onBothValuesRxjsIncrement() {
    this.countValueRxjs1.next(this.countValueRxjs1.value + 1);
    this.countValueRxjs2.next(this.countValueRxjs2.value + 1);
  }
}
