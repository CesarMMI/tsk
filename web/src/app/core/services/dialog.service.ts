import { DOCUMENT } from '@angular/common';
import {
  EventEmitter,
  Injectable,
  Type,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DialogConfig } from '../types/dialog-config';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _opened = signal(false);
  private _config = signal<DialogConfig>({});
  private _component = signal<Type<any> | null>(null);

  config = computed(() => this._config());
  component = computed(() => this._component());

  toggleEvent = new EventEmitter<boolean>();

  constructor() {
    effect(() => this.toggleEvent.emit(this._opened()));
  }

  open(component: Type<any>, config?: DialogConfig) {
    if (this._opened()) return;

    this._component.set(component);
    if (config) this._config.set(config);
    this._opened.set(true);
  }

  close(result?: any) {
    if (!this._opened()) return;

    this._opened.set(false);
    this._config.set({});
    this._component.set(null);
  }
}
