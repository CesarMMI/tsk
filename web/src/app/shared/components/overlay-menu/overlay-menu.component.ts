import {
	Component,
	ElementRef,
	ViewChild,
	effect,
	signal,
} from '@angular/core';

@Component({
	standalone: true,
	selector: 'tsk-overlay-menu',
	template: `
		<dialog #overlayDialog [autofocus]="false">
			<ng-content></ng-content>
		</dialog>
	`,
})
export class OverlayMenuComponent {
	@ViewChild('overlayDialog')
	private _dialogEl?: ElementRef<HTMLDialogElement>;
	private _opened = signal(false);

	open() {
		if (this._opened() || !this._dialogEl) return;

		this._opened.set(true);
		this._dialogEl?.nativeElement.show();
	}

	close() {
		if (this._opened()) return;

		this._opened.set(false);
		this._dialogEl?.nativeElement.close();
	}
}
