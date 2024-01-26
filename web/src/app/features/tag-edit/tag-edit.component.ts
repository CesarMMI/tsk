import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { FormFieldComponent } from '../../shared/inputs/components/form-field/form-field.component';
import { InputTextModule } from '../../shared/inputs/input-text.module';
import { Tag } from '../../shared/types/models/tag';
import { DialogService } from './../../core/services/dialog.service';
import { TagsState } from './../../shared/data-access/states/tag.state';
import { FocusTrapDirective } from '../../shared/directives/focus-trap.directive';

@Component({
	selector: 'tsk-tag-edit',
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
	],
	template: `
		<tsk-header [title]="data ? 'Edit Tag ' + data.name : 'Add Tag'" />
		<form class="grid gap-2" [formGroup]="form" (ngSubmit)="submit()">
			<!-- Name -->
			<tsk-form-field>
				<span label>Name</span>
				<input tskInputText tskFocusTrap formControlName="name" />
			</tsk-form-field>
			<!-- Color -->
			<tsk-form-field>
				<span label>Color</span>
				<input tskInputText formControlName="color" />
				<span
					tskInputInset="start"
					class="inline-block px-2 py-1 text-lg text-neutral-500"
					>#</span
				>
				<tsk-icon
					tskInputInset="end"
					class="px-2 py-1 text-lg"
					[style]="'color: #' + form.get('color')?.value"
					>circle</tsk-icon
				>
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
export class TagEditComponent implements OnInit {
	@Input() data?: Tag;

	private _formBuilder = inject(FormBuilder);

	tagsState = inject(TagsState);
	dialogService = inject(DialogService);

	form = this._formBuilder.group({
		id: [''],
		name: ['', Validators.required],
		color: ['', Validators.required],
	});

	ngOnInit(): void {
		if (this.data)
			this.form.setValue({
				id: this.data.id,
				name: this.data.name,
				color: this.data.color.replace('#', ''),
			});
	}

	submit() {
		const tag = {
			id: this.form.value.id!,
			name: this.form.value.name!,
			color: '#' + this.form.value.color,
		};

		const action = tag.id ? 'editTag' : 'addTag';

		this.tagsState[action](tag)
			.pipe(first())
			.subscribe((res) =>
				!res.error && res.loaded ? this.dialogService.close() : null,
			);
	}
}
