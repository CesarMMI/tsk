import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'tsk-badge',
	standalone: true,
	template: `{{ text }}`,
	host: {
		class: 'tsk-badge text-xs px-2 rounded',
		'[style.color]': 'textColor',
		'[style.background-color]': 'backgroundColor',
	},
})
export class BadgeComponent {
	@Input({ required: true }) text: string = '';
	@Input() color: string = '#fafafa';

	get backgroundColor() {
		if (this.color.length !== 7 && this.color.length !== 4) {
			return '#fafafa';
		} else if (this.color.replace('#', '').length === 6) {
			return this.color;
		} else {
			return `#${this.color[1]}${this.color[1]}${this.color[2]}${this.color[2]}${this.color[3]}${this.color[3]}`;
		}
	}

	get textColor() {
		if (!this.rgb) return '#000000';
		return this.rgb.r * 0.299 + this.rgb.g * 0.587 + this.rgb.b * 0.114 > 120
			? '#000000'
			: '#ffffff';
	}

	get rgb() {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
			this.backgroundColor,
		);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				}
			: null;
	}
}
