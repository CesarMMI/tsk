import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
	ViewChild,
	computed,
	inject,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../components/icon/icon.component';
import { OverlayMenuComponent } from '../../../components/overlay-menu/overlay-menu.component';
import { OptionDirective } from '../../directives/option.directive';
import { ControlValueAccessorBase } from '../../utils/control-value-accessor-base';
import { controlValueAccessorFactory } from '../../utils/control-value-accessor-factory';

@Component({
	standalone: true,
	selector: 'tsk-select',
	imports: [CommonModule, IconComponent, FormsModule, OverlayMenuComponent],
	providers: [controlValueAccessorFactory(SelectComponent)],
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
	host: {
		class: 'tsk-input tsk-input-select block w-full relative',
	},
})
export class SelectComponent
	extends ControlValueAccessorBase<any>
	implements AfterViewInit
{
	@ViewChild('checkboxFocus') checkboxFocus?: ElementRef<HTMLInputElement>;
	@ViewChild('selectContainer') selectContainer?: ElementRef<HTMLDivElement>;
	@ContentChild(OptionDirective) customOption?: OptionDirective;

	@ViewChild(OverlayMenuComponent) overlayMenu?: OverlayMenuComponent;

	@Input() options: any[] = [];
	@Input() labelProp: string = 'label';
	@Input() valueProp: string = 'value';

	elementRef = inject(ElementRef);

	opened = signal(false);
	focused = signal(false);

	currValue = signal(this.value);
	currLabel = computed(() => {
		let opt = this.options.find(
			(opt) => opt[this.valueProp] === this.currValue(),
		);
		if (!opt) return '';
		return opt[this.labelProp];
	});

	get hasError() {
		if (!this.elementRef) return;

		const el = this.elementRef.nativeElement as HTMLInputElement;
		return (
			el.classList.contains('ng-touched') && el.classList.contains('ng-invalid')
		);
	}

	ngAfterViewInit() {
		this.currValue.set(this.value);
	}

	onOpenedChange(opened: boolean) {
		this.opened.set(opened);
		if (opened) this.overlayMenu?.open();
		else this.overlayMenu?.close();
	}

	onFocus(focused: boolean) {
		if (focused) {
			if (!this.touched) this.markAsTouched();
			this.focused.set(true);
			return;
		}

		setTimeout(() => {
			this.focused.set(false);
			this.onOpenedChange(false);
		}, 200);
	}

	onValueChange(event: any) {
		this.onInput(event);
		this.onOpenedChange(false);
		this.currValue.set(event);
	}
}
