import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ColorUtils } from '../../services/utils/color.utils';

@Component({
  standalone: true,
  selector: 'tsk-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '{{ text }}',
  styles: `
    :host {
      padding: 2px 8px;
      
      font-size: 10px;
      font-weight: 600;
      
      border: 1px solid;
      border-radius: 8px;
    }
  `,
  host: {
    class: 'tsk-badge',
    '[style.color]': 'accentColor',
    '[style.border-color]': 'accentColor',
    '[style.background-color]': 'backgroundColor',
  },
})
export class TskBadgeComponent implements OnInit {
  private _colorUtils = inject(ColorUtils);
  private _colors = ['#757575', '#fafafa'];

  @Input({ required: true })
  public text: string = '';

  @Input({})
  public color: string = '#fafafa';

  get backgroundColor() {
    return this._colors[1];
  }

  get accentColor() {
    return this._colors[0];
  }

  ngOnInit() {
    this._colors = this._colorUtils.getShades(this.color, 2, {
      min: 33,
      max: 66,
    });
  }
}
