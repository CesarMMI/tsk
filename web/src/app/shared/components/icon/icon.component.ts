import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'tsk-icon',
  standalone: true,
  template: '<ng-content></ng-content>',
  host: { class: 'tsk-icon text-base material-symbols-rounded' },
})
export class IconComponent {}
