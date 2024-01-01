import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tsk-tag-view',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class TagViewComponent {}
