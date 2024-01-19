import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tsk-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="material-symbols-outlined">
      <ng-content></ng-content>
    </span>
  `,
  styles: `
    :host {
      height: min-content;
      display: inline-block;
    }

    .material-symbols-outlined {
      display: inherit;
      font-size: inherit;      
      line-height: inherit;
    }
  `,
  host: {
    class: 'tsk-icon'
  }
})
export class TskIconComponent {}
