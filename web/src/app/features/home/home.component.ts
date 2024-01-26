import { DialogService } from './../../core/services/dialog.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { TasksListComponent } from '../../shared/components/tasks-list/tasks-list.component';
import { TagsState } from '../../shared/data-access/states/tag.state';
import { TasksState } from '../../shared/data-access/states/task.state';
import { TaskEditComponent } from '../task-edit/task-edit.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, HeaderComponent, TasksListComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	private _tasksState = inject(TasksState);

	dialogService = inject(DialogService);
	tasks = this._tasksState.tasks;

	onAdd() {
		this.dialogService.open(TaskEditComponent, {
			width: 'min(600px, 90vw)',
		});
	}
}
