import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogService } from './core/services/dialog.service';
import { SidenavComponent } from './features/sidenav/sidenav.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tsk-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('dialogRef') dialogRef?: ElementRef<HTMLDialogElement>;
  dialogService = inject(DialogService);

  constructor() {
    this.dialogService.toggleEvent
      .pipe(takeUntilDestroyed())
      .subscribe((opened) => {
        if (!this.dialogRef) return;
        const dialog = this.dialogRef.nativeElement;

        if (dialog.open && !opened) dialog.close();
        if (!dialog.open && opened) dialog.showModal();
      });
  }

  @HostListener('keydown.escape', ['$event'])
  onkeyDown(event: KeyboardEvent) {
    if (event.target === this.dialogRef?.nativeElement)
      this.dialogService.close();
  }
}
