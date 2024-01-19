import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TskIconComponent } from 'tsk-web-library';

@Component({
  standalone: true,
  selector: 'tsk-calendar',
  imports: [CommonModule, TskIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  host: { class: 'tsk-calendar' },
})
export class CalendarComponent {}
