import { Injectable } from '@angular/core';
import { CrudService } from '../../../core/services/crud.service';
import { Tag } from '../../types/models/tag';

@Injectable({
	providedIn: 'root',
})
export class TagService extends CrudService<Tag> {
	override _baseUrl = 'http://localhost:3000/tags';
}
