import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

export class StateManager<T> {
  private _value$: BehaviorSubject<T | null>;

  constructor(private initialValue?: T) {
    this._value$ = new BehaviorSubject<T | null>(this.initialValue ?? null);
  }

  get value() {
    return this._value$.value;
  }

  get value$() {
    return this._value$.asObservable();
  }

  get valueSig() {
    return toSignal(this.value$);
  }

  public setValue(value: T) {
    this._value$.next(value);
  }

  public clearValue() {
    this._value$.next(null);
  }

  public resetValue() {
    this._value$.next(this.initialValue ?? null);
  }
}
