import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	Output,
	inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { FocusTrapDirective } from '../../../../shared/directives/focus-trap.directive';
import { Tag } from '../../../../shared/types/models/tag';
import { Task } from '../../../../shared/types/models/task';
import { DeadlineSelectComponent } from '../deadline-select/deadline-select.component';
import { TagSelectComponent } from '../tag-select/tag-select.component';

@Component({
	selector: 'tsk-task-form',
	standalone: true,
	imports: [
		CommonModule,
		FocusTrapDirective,
		ReactiveFormsModule,
		DeadlineSelectComponent,
		TagSelectComponent,
	],
	template: `
		<form class="grid" [formGroup]="form" (submit)="onSubmit()">
			<!-- Title -->
			<input
				tskFocusTrap
				type="text"
				class="bg-neutral-950 p-2 font-bold placeholder:text-neutral-500"
				placeholder="New task..."
				formControlName="title"
			/>
			@if (showFullForm$ | async) {
				<!-- Description -->
				<textarea
					cols="1"
					class="bg-neutral-950 p-2 placeholder:text-neutral-500"
					placeholder="Description"
					formControlName="description"
				></textarea>
				<!-- Actions -->
				<div class="mt-2 flex items-center justify-end gap-2">
					<!-- Deadline -->
					<tsk-deadline-select formControlName="deadline" />
					<!-- Tag -->
					<tsk-tag-select formControlName="tagId" />

					<span class="flex-1"></span>
					<!-- Submit -->
					<button
						type="submit"
						class="rounded bg-transparent px-2 py-1 transition-colors hover:bg-neutral-800"
					>
						Submit
					</button>
				</div>
			}
		</form>
	`,
})
export class TaskFormComponent {
	private _formBuilder = inject(FormBuilder);

	@Input()
	public set task(task: Partial<Task>) {
		if (task.id)
			this.form.setValue({
				id: task.id,
				title: task.title!,
				description: task.description ?? '',
				deadline: task.deadline ?? null,
				tagId: task.tag?.id ?? null,
			});
		else this.form.reset();
	}

	@Input() tags: Tag[] = [];

	@Output()
	public submitEvent = new EventEmitter<Partial<Task>>();

	@Output()
	public addTag = new EventEmitter<string>();

	public form = this._formBuilder.group({
		id: [''],
		title: ['', Validators.required],
		description: [''],
		deadline: [''],
		tagId: [''],
	});

	public showFullForm$ = this.form.get('title')!.valueChanges.pipe(
		startWith(this.form.get('title')?.value),
		map((value) => !!value),
	);

	@HostListener('keydown.escape')
	onEscape() {
		this.form.reset();
	}

	@HostListener('keydown.control.enter', ['$event'])
	onControlSubmit(e: KeyboardEvent) {
		e.preventDefault();
		this.onSubmit();
	}

	onSubmit() {
		const task = {
			id: this.form.value.id ?? undefined,
			title: this.form.value.title ?? undefined,
			description: this.form.value.description ?? undefined,
			deadline: this.form.value.deadline ?? undefined,
			tagId: this.form.value.tagId ?? undefined,
		};
		if (!task || !task.title) return;
		this.submitEvent.emit(task);
	}
}
