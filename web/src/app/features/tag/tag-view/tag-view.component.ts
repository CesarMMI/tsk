import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs';
import { TaskListComponent } from '../../../shared/components/task-list/task-list.component';
import { TasksStateToggleComponent } from '../../../shared/components/tasks-state-toggle/tasks-state-toggle.component';
import { TasksState } from '../../../shared/data-access/states/task.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TagsState } from '../../../shared/data-access/states/tag.state';

@Component({
	selector: 'tsk-tag-view',
	standalone: true,
	imports: [CommonModule, TaskListComponent, TasksStateToggleComponent],
	templateUrl: './tag-view.component.html',
	styleUrls: [
		'./../../../shared/styles/header.scss',
		'./tag-view.component.scss',
	],
})
export class TagViewComponent {
	private _tagsState = inject(TagsState);
	private _tasksState = inject(TasksState);
	private _activatedRoute = inject(ActivatedRoute);

	private _tagId = signal<string>('');
	public tag = computed(() => ({
		...this._tagsState.tags().find((tag) => tag.id === this._tagId()),
		tasks: this._tasksState
			.tasks()
			.filter((task) => task.tag?.id === this._tagId()),
	}));

	constructor() {
		this._activatedRoute.paramMap
			.pipe(
				takeUntilDestroyed(),
				map((paramMap) => paramMap.get('tagId')),
				filter((tagId) => !!tagId)
			)
			.subscribe((tagId) => this._tagId.set(tagId!));
	}
}
