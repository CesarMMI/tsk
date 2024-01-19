import {
  EventEmitter,
  Injectable,
  Type,
  computed,
  signal,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogConfig } from '../types/dialog-config';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _configs = signal<DialogConfig | null>(null);

  public event$ = new EventEmitter<boolean>();
  public configs = computed(() => this._configs());

  open(config: DialogConfig) {
    this._configs.set(config);
    this.event$.emit(true);
  }

  close() {
    this._configs.set(null);
    this.event$.emit(false);
  }
}
