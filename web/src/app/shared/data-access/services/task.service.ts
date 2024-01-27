import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Task } from '../../types/models/task';

@Injectable({
	providedIn: 'root',
})
export class TaskService extends CrudService<Task> {
	override _baseUrl = 'http://localhost:3000/tasks';
}
