import { DatePipe, NgClass } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	Output,
	computed,
	signal,
} from '@angular/core';
import { IconDirective } from '../../directives/icon.directive';
import { DateUtils } from '../../utils/date.utils';

@Component({
	standalone: true,
	imports: [DatePipe, NgClass, IconDirective],
	selector: 'tsk-calendar',
	template: `
		<div>
			<header class="flex items-center p-2 gap-2">
				<!-- Curr month/year -->
				<span class="text-xl">{{ currDate() | date: 'MMMM YYYY' }}</span>
				<span class="flex-1"></span>
				<!-- Prev month -->
				<div
					tskIcon
					class="block aspect-square cursor-pointer rounded-full text-center text-sm leading-4 hover:bg-neutral-700"
					(clickEvent)="onMonthChange(-1)"
				>
					chevron_left
				</div>
				<!-- Next month -->
				<div
					tskIcon
					class="block aspect-square cursor-pointer rounded-full text-center text-sm leading-4 hover:bg-neutral-700"
					(clickEvent)="onMonthChange(1)"
				>
					chevron_right
				</div>
			</header>
			<div class="grid gap-1 p-2">
				<!-- Days of the week -->
				<ul class="grid	grid-cols-7 justify-items-center text-sm text-neutral-500">
					<li>Su</li>
					<li>Mo</li>
					<li>Tu</li>
					<li>We</li>
					<li>Th</li>
					<li>Fr</li>
					<li>Sa</li>
				</ul>
				<!-- Days of the month -->
				<ul class="grid grid-cols-7 justify-items-center gap-1">
					@for (day of days(); track $index) {
						<li [ngClass]="day.classes" (click)="onDateChange(day.date)">
							{{ day.date | date: 'dd' }}
						</li>
					}
				</ul>
			</div>
		</div>
	`,
})
export class CalendarComponent {
	private _selectedDate = signal<Date | null>(null);

	@Output() dateChange = new EventEmitter<string | null>();
	@Input() set date(value: string | null) {
		const date = value ? new Date(value) : null;
		this._selectedDate.set(date);
		if (date) this.currDate.set(date);
	}

	private _defaultClasses = [
		'p-1',
		'rounded-full',
		'text-center',
		'aspect-square',
		'cursor-pointer',
		'hover:bg-neutral-700',
	];

	private _pushDate = (
		target: { date: Date; classes: string[] }[],
		date: { year?: number; month?: number; day: number },
		classes: string[],
	) =>
		target.push({
			classes: [...this._defaultClasses, ...classes],
			date: new Date(
				date.year ?? this.currDate().getUTCFullYear(),
				date.month ?? this.currDate().getUTCMonth(),
				date.day,
			),
		});

	private _prevMonthDays = computed(() => {
		const days: { date: Date; classes: string[] }[] = [];
		const firstDayWeekCurrMoth = new Date(
			this.currDate().getUTCFullYear(),
			this.currDate().getUTCMonth(),
			1,
		).getUTCDay();

		for (let i = 0; i < firstDayWeekCurrMoth; i++)
			this._pushDate(days, { day: i - firstDayWeekCurrMoth + 1 }, [
				'text-neutral-500',
			]);

		return days;
	});

	private _currMonthDays = computed(() => {
		const days: { date: Date; classes: string[] }[] = [];
		const lastDayCurrMoth = new Date(
			this.currDate().getUTCFullYear(),
			this.currDate().getUTCMonth() + 1,
			0,
		).getUTCDate();

		for (let i = 1; i < lastDayCurrMoth + 1; i++)
			this._pushDate(days, { day: i }, []);

		return days;
	});

	private _nextMonthDays = computed(() => {
		const days: { date: Date; classes: string[] }[] = [];
		const lastDayWeekCurrMoth = new Date(
			this.currDate().getUTCFullYear(),
			this.currDate().getUTCMonth() + 1,
			0,
		).getUTCDay();

		for (let i = lastDayWeekCurrMoth; i < 6; i++)
			this._pushDate(
				days,
				{
					day: i - lastDayWeekCurrMoth + 1,
					month: this.currDate().getUTCMonth() + 1,
				},
				['text-neutral-500'],
			);

		return days;
	});

	public onMonthChange(value: number) {
		this.currDate.set(
			new Date(
				this.currDate().getUTCFullYear(),
				this.currDate().getUTCMonth() + value,
				1,
			),
		);
	}

	public onDateChange(date: Date) {
		let d: Date | null = date;
		if (DateUtils.compareDatesWoutTime(date, this._selectedDate() ?? undefined))
			d = null;

		this._selectedDate.set(d);
		this.dateChange.emit(d ? d.toISOString() : d);
	}

	public currDate = signal(new Date());

	public days = computed(() =>
		[
			...this._prevMonthDays(),
			...this._currMonthDays(),
			...this._nextMonthDays(),
		].map((date) => {
			if (
				!DateUtils.compareDatesWoutTime(
					date.date,
					this._selectedDate() ?? undefined,
				)
			)
				return date;
			return { ...date, classes: [...date.classes, 'bg-neutral-700'] };
		}),
	);
}
