import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TagsState } from '../../../shared/data-access/states/tag.state';
import { Tag } from '../../../shared/types/models/tag';
import { first } from 'rxjs';

@Component({
	selector: 'tsk-tag-edit',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogClose,
	],
	templateUrl: './tag-edit.component.html',
	styleUrl: './tag-edit.component.scss',
})
export class TagEditComponent implements OnInit {
	private _tagsState = inject(TagsState);

	private _formBuilder = inject(FormBuilder);

	private _dialogRef = inject(DialogRef<TagEditComponent>);
	private _dialogData = inject<Tag | null>(DIALOG_DATA);

	form = this._formBuilder.group({
		id: [''],
		name: ['', Validators.required],
		color: [
			'',
			[
				Validators.required,
				Validators.pattern(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
			],
		],
	});

	ngOnInit(): void {
		if (this._dialogData) {
			this.form.setValue({
				id: this._dialogData.id,
				name: this._dialogData.name,
				color: this._dialogData.color.replace('#', ''),
			});
		}
	}

	onSubmit() {
		const tag = {
			id: this.form.value.id ?? '',
			name: this.form.value.name ?? undefined,
			color: this.form.value.color ? `#${this.form.value.color}` : undefined,
		};
		const action = tag.id ? 'editTag' : 'addTag';

		this._tagsState[action](tag)
			.pipe(first())
			.subscribe((value) => {
				if (value.loaded && !value.error) this._dialogRef.close();
			});
	}
}
