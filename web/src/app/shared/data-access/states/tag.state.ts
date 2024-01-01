import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { StateManager } from '../../../core/classes/state-manager';
import { Tag } from '../../types/models/tag';
import { TagService } from '../services/tag.service';

@Injectable({
  providedIn: 'root',
})
export class TagState extends StateManager<Tag[]> {
  constructor(private _tagService: TagService) {
    super();
  }

  public refresh(params?: { [key: string]: any }) {
    this._tagService
      .readAll()
      .pipe(first())
      .subscribe((res) => this.setValue(res));
  }
}
