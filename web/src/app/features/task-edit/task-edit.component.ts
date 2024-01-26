import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { DialogService } from '../../core/services/dialog.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { TagsState } from '../../shared/data-access/states/tag.state';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { FocusTrapDirective } from '../../shared/directives/focus-trap.directive';
import { FormFieldComponent } from '../../shared/inputs/components/form-field/form-field.component';
import { InputTextModule } from '../../shared/inputs/input-text.module';
import { Task } from '../../shared/types/models/task';
import { TasksState } from '../../shared/data-access/states/task.state';
import { InputSelectModule } from '../../shared/inputs/input-select.module';

@Component({
	selector: 'tsk-task-edit',
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		ReactiveFormsModule,
		IconComponent,
		FormFieldComponent,
		ButtonDirective,
		FocusTrapDirective,
		InputTextModule,
		InputSelectModule,
	],
	template: `
		<tsk-header [title]="data ? 'Edit Task' + data.title : 'Add Task'" />
		<form class="grid gap-2" [formGroup]="form" (ngSubmit)="submit()">
			<!-- Title -->
			<tsk-form-field>
				<span label>Title</span>
				<input tskInputText tskFocusTrap formControlName="title" />
			</tsk-form-field>
			<!-- Color -->
			<tsk-form-field>
				<span label>Tag</span>
				<tsk-select
					formControlName="tagId"
					[options]="tags()"
					valueProp="id"
					labelProp="name"
				>
					<ng-template tskOption let-item>
						<div class="flex items-center gap-2 p-2 text-base hover:bg-neutral-900">
							<tsk-icon [ngStyle]="{ color: item.color }">circle</tsk-icon>
							<span>{{ item.name }}</span>
						</div>
					</ng-template>
				</tsk-select>
				<tsk-icon tskInputInset="start" class="px-2 py-1 text-lg">circle</tsk-icon>
			</tsk-form-field>
			<!-- Description -->
			<tsk-form-field>
				<span label>Description</span>
				<textarea tskInputText formControlName="description"></textarea>
			</tsk-form-field>

			<div class="mt-2 flex justify-end">
				<!-- Cancel	 -->
				<button
					tskButton
					type="button"
					color="text"
					appearance="plain"
					(click)="dialogService.close()"
				>
					Cancel
				</button>
				<!-- Submit -->
				<button
					tskButton
					type="submit"
					color="primary"
					appearance="flat"
					[disabled]="form.invalid"
				>
					Submit
				</button>
			</div>
		</form>
	`,
})
export class TaskEditComponent implements OnInit {
	@Input() data?: Task;

	private _formBuilder = inject(FormBuilder);

	tagsState = inject(TagsState);
	tasksState = inject(TasksState);

	dialogService = inject(DialogService);

	tags = this.tagsState.tags;

	form = this._formBuilder.group({
		id: [''],
		title: ['', Validators.required],
		description: [''],
		deadline: [''],
		tagId: [''],
	});

	ngOnInit(): void {
		if (this.data)
			this.form.patchValue({
				id: this.data.id,
				title: this.data.title,
				description: this.data.description ?? '',
			});
	}

	submit() {
		// const tag = {
		// 	id: this.form.value.id!,
		// 	name: this.form.value.name!,
		// 	color: '#' + this.form.value.color,
		// };
		// const action = tag.id ? 'editTag' : 'addTag';
		// this.tagsState[action](tag)
		// 	.pipe(first())
		// 	.subscribe((res) =>
		// 		!res.error && res.loaded ? this.dialogService.close() : null,
		// 	);
	}
}
