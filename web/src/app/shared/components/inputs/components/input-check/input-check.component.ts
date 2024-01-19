import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TskIconComponent } from 'tsk-web-library';

@Component({
  selector: 'tsk-input-check',
  standalone: true,
  imports: [CommonModule, TskIconComponent],
  templateUrl: './input-check.component.html',
  styleUrl: './input-check.component.scss',
})
export class InputCheckComponent {
  @Input({ required: true }) value!: boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  @Input() disabled: boolean = false;
}
