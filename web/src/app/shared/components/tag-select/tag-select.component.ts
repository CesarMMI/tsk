import { OverlayModule } from '@angular/cdk/overlay';
import {
	Component,
	HostListener,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { IconDirective } from '../../directives/icon.directive';
import { ControlValueAccessorBase } from '../../utils/control-value-accessor/control-value-accessor-base';
import { controlValueAccessorFactory } from '../../utils/control-value-accessor/control-value-accessor-factory';
import { TagsState } from '../../data-access/states/tag.state';
import { TagsListComponent } from '../tags-list/tags-list.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FocusTrapDirective } from '../../directives/focus-trap.directive';
import { first } from 'rxjs';

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
				class="rounded border border-neutral-700 bg-neutral-800 text-neutral-50 drop-shadow"
			>
				<tsk-tags-list
					[tags]="tags()"
					(selectedChange)="onInput($event.id); opened = false"
				/>
				@if (!editing) {
					<div
						class="flex cursor-pointer items-center gap-1 rounded px-2 py-1 pr-3 text-center text-sm text-neutral-500 hover:bg-neutral-700"
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
							class="bg-neutral-800 px-2 pb-1 placeholder:text-neutral-500"
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
		title: ['', Validators.required],
	});

	public get tagName() {
		return this.tags().find((tag) => tag.id === this.value)?.title;
	}

	public onSubmit() {
		if (this.form.invalid) return;

		this._tagsState
			.addTag({ title: this.form.value.title! })
			.pipe(first())
			.subscribe((res) => {
				if (!res.error && res.loaded) {
					this.form.reset();
					this.editing = false;
				}
			});
	}
}
