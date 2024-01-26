import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
	standalone: true,
	selector: 'button[tskButton]',
	host: {
		class: 'tsk-button rounded transition-colors px-4 py-2',
		'[class]': 'classes',
	},
})
export class ButtonDirective {
	@Input() disabled: boolean = false;

	@Input() color: 'text' | 'primary' = 'text';
	@Input() appearance: 'plain' | 'flat' = 'plain';

	get classes() {
		return `${this.colorsClasses} ${this.disabledClasses}`;
	}

	get colorsClasses() {
		switch (`${this.appearance}-${this.color}`) {
			default:
			case 'plain-text':
				return 'text-neutral-50 hover:bg-neutral-800 active:bg-neutral-700';
			case 'plain-primary':
				return 'text-violet-400 hover:bg-neutral-800 hover:text-violet-300 active:text-violet-200';
			case 'flat-text':
				return 'bg-neutral-950 text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800';
			case 'flat-primary':
				return 'bg-violet-500 text-neutral-50 hover:bg-violet-400 active:bg-violet-300';
		}
	}

	get disabledClasses() {
		return this.disabled ? 'opacity-50 pointer-events-none' : '';
	}
}
