import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tsk-checkbox',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Input() value: boolean = false;
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();

  onClick() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
  }
}
