import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagsState } from '../../../../shared/data-access/states/tag.state';
import { FocusTrapDirective } from '../../../../shared/directives/focus-trap.directive';
import { IconDirective } from '../../../../shared/directives/icon.directive';
import { Tag } from '../../../../shared/types/models/tag';
import { ControlValueAccessorBase } from '../../../../shared/utils/control-value-accessor/control-value-accessor-base';
import { controlValueAccessorFactory } from '../../../../shared/utils/control-value-accessor/control-value-accessor-factory';
import { TagsListComponent } from '../tags-list/tags-list.component';

@Component({
	standalone: true,
	selector: 'tsk-tag-select',
	providers: [controlValueAccessorFactory(TagSelectComponent)],
	imports: [
		OverlayModule,
		IconDirective,
		TagsListComponent,
		ReactiveFormsModule,
		FocusTrapDirective,
	],
	template: `
		<div
			#btn
			class="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-sm hover:bg-neutral-800"
			(click)="opened = !opened"
			cdkOverlayOrigin
		>
			<span tskIcon class="text-sm">sell</span>
			@if (value) {
				<span>{{ tagName }}</span>
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
				<tsk-tags-list
					[tags]="tags()"
					[selectedId]="value"
					(selectedChange)="onInput($event?.id ?? null); opened = false"
					(editEvent)="onEdit($event)"
					(deleteEvent)="onDelete($event.id)"
				/>
				@if (!editing) {
					<div
						class="flex cursor-pointer items-center gap-1 rounded-b px-2 py-1 pr-3 text-center text-sm text-neutral-500 hover:bg-neutral-800"
						(click)="editing = true"
					>
						<span class="text-sm" tskIcon>add</span>
						<span>Add Tag</span>
					</div>
				} @else {
					<form [formGroup]="form" (submit)="onSubmit()">
						<input
							tskFocusTrap
							type="text"
							placeholder="Title"
							class="bg-neutral-900 px-2 pb-1 placeholder:text-neutral-500"
							formControlName="title"
						/>
					</form>
				}
			</div>
		</ng-template>
	`,
})
export class TagSelectComponent extends ControlValueAccessorBase<string> {
	private _tagsState = inject(TagsState);
	private _formBuilder = inject(FormBuilder);

	public opened = false;
	public editing = false;

	public tags = this._tagsState.tags;
	public form = this._formBuilder.group({
		id: [''],
		title: ['', Validators.required],
	});

	public get tagName() {
		return this.tags().find((tag) => tag.id === this.value)?.title;
	}

	public onEdit(tag: Tag) {
		this.form.setValue({
			id: tag.id,
			title: tag.title,
		});
		this.editing = true;
	}

	public onDelete(id: string) {
		if (id === this.value) this.onInput(null);
		this._tagsState.deleteTag(id);
	}

	public onSubmit() {
		if (this.form.invalid) return;
		const action = this.form.value.id ? 'editTag' : 'addTag';

		this._tagsState[action]({
			id: this.form.value.id!,
			title: this.form.value.title ?? undefined,
		});
		this.form.reset();
		this.editing = false;
	}
}
