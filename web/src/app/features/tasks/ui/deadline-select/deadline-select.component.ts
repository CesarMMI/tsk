import { OverlayModule } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarComponent } from '../../../../shared/components/calendar/calendar.component';
import { IconDirective } from '../../../../shared/directives/icon.directive';
import { ControlValueAccessorBase } from '../../../../shared/utils/control-value-accessor/control-value-accessor-base';
import { controlValueAccessorFactory } from '../../../../shared/utils/control-value-accessor/control-value-accessor-factory';

@Component({
	standalone: true,
	selector: 'tsk-deadline-select',
	providers: [controlValueAccessorFactory(DeadlineSelectComponent)],
	imports: [DatePipe, CalendarComponent, OverlayModule, IconDirective],
	template: `
		<div
			#btn
			class="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-sm hover:bg-neutral-800"
			(click)="opened = !opened"
			cdkOverlayOrigin
		>
			<span tskIcon class="text-sm">today</span>
			@if (value) {
				<span>{{ value | date }}</span>
			}
		</div>

		<ng-template
			cdkConnectedOverlay
			[cdkConnectedOverlayOrigin]="btn"
			[cdkConnectedOverlayOpen]="opened"
			(overlayOutsideClick)="opened = false"
		>
			<div
				class="rounded border border-neutral-800 bg-neutral-900 text-neutral-50"
			>
				<tsk-calendar
					[date]="value"
					(dateChange)="onInput($event); opened = false"
				/>
			</div>
		</ng-template>
	`,
})
export class DeadlineSelectComponent extends ControlValueAccessorBase<string> {
	opened = false;
}
