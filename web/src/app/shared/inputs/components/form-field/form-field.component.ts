import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	Component,
	ContentChild,
	ContentChildren,
	QueryList,
} from '@angular/core';
import { InputInsetDirective } from '../../directives/input-inset.directive';
import { InputTextDirective } from '../../directives/input-text.directive';
import { SelectComponent } from '../select/select.component';

@Component({
	selector: 'tsk-form-field',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="relative grid w-full gap-1">
			<div [class]="'pl-1 text-xs tracking-wider ' + labelColor">
				<ng-content select="[label]"></ng-content>
			</div>

			@if (this.getInset('start')) {
				<div class="absolute bottom-0 left-0 z-10">
					<ng-content select="[tskInputInset=start]"></ng-content>
				</div>
			}

			<ng-content select="[tskInputText], tsk-select"></ng-content>

			@if (this.getInset('end')) {
				<div class="absolute bottom-0 right-0 z-10">
					<ng-content select="[tskInputInset=end]"></ng-content>
				</div>
			}
		</div>
	`,
	host: {
		class: 'tsk-form-field w-full',
	},
})
export class FormFieldComponent implements AfterViewInit {
	@ContentChild(SelectComponent) inputSelect?: SelectComponent;
	@ContentChild(InputTextDirective) inputText?: InputTextDirective;

	@ContentChildren(InputInsetDirective) insets?: QueryList<InputInsetDirective>;

	get labelColor() {
		if (!this.input) return;
		return this.input?.hasError ? 'text-red-600' : 'text-neutral-500';
	}

	get input() {
		if (this.inputText) return this.inputText;
		if (this.inputSelect) return this.inputSelect;
		return;
	}

	get inputEl() {
		if (this.inputText)
			return this.inputText.elementRef.nativeElement as HTMLElement;

		if (this.inputSelect)
			return this.inputSelect.selectContainer?.nativeElement as HTMLElement;

		return;
	}

	ngAfterViewInit(): void {
		if (this.inputEl) {
			const startInset = this.getInset('start');
			const endInset = this.getInset('end');

			if (startInset)
				this.inputEl.style.paddingLeft = `${startInset.offsetWidth}px`;

			if (endInset)
				this.inputEl.style.paddingRight = `${endInset.offsetWidth}px`;
		}
	}

	getInset(position: 'start' | 'end') {
		const inset = this.insets?.find((inset) => inset.tskInputInset === position);
		if (!inset) return;
		return inset.elementRef.nativeElement as HTMLElement;
	}
}
