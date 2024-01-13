import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { first } from 'rxjs';
import { TagsState } from '../../../shared/data-access/states/tag.state';
import { TasksState } from '../../../shared/data-access/states/task.state';
import { WriteTask } from '../../../shared/types/api/write-task';
import { Task } from '../../../shared/types/models/task';

@Component({
	selector: 'tsk-task-edit',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatDatepickerModule,
		MatIconModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogClose,
	],
	templateUrl: './task-edit.component.html',
	styleUrl: './task-edit.component.scss',
})
export class TaskEditComponent implements OnInit {
	private _tagsState = inject(TagsState);
	private _tasksState = inject(TasksState);

	private _formBuilder = inject(FormBuilder);

	private _dialogRef = inject(DialogRef<TaskEditComponent>);
	private _dialogData = inject<Task | null>(DIALOG_DATA);

	tags = this._tagsState.tags;

	form = this._formBuilder.group({
		id: [''],
		title: ['', Validators.required],
		description: [''],
		deadline: [''],
		tagId: [''],
	});

	ngOnInit(): void {
		if (this._dialogData) {
			this.form.setValue({
				id: this._dialogData.id,
				title: this._dialogData.title,
				description: this._dialogData.description ?? '',
				deadline: (this._dialogData.deadline as any) ?? '',
				tagId: this._dialogData.tag?.id ?? '',
			});
		}
	}

	onSubmit() {
		const task = {
			id: this.form.value.id ?? '',
			title: this.form.value.title ?? undefined,
			description: this.form.value.description ?? undefined,
			deadline: this.form.value.deadline
				? new Date(this.form.value.deadline)
				: undefined,
			tagId: this.form.value.tagId ?? undefined,
		} as WriteTask;
		const action = task.id ? 'editTask' : 'addTask';

		this._tasksState[action](task)
			.pipe(first())
			.subscribe((value) => {
				if (value.loaded && !value.error) this._dialogRef.close();
			});
	}
}
