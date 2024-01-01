import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map, switchMap } from 'rxjs';
import { Tag } from '../../types/models/tag';
import { TagState } from '../states/tag.state';

@Injectable({
  providedIn: 'root',
})
export class TagFacade {
  constructor(private _tagState: TagState) {
    this._tagState.refresh();
  }

  private _sortTags = (a: Tag, b: Tag) => {
    return a.updatedAt !== b.updatedAt
      ? a.updatedAt > b.updatedAt
        ? 1
        : -1
      : 0;
  };

  getTag$(obs: Observable<string>) {
    return obs.pipe(
      takeUntilDestroyed(),
      switchMap((tagId) =>
        this._tagState.value$.pipe(
          map((tags) => tags ?? []),
          map((tags) => tags?.find((tag) => tag.id === tagId))
        )
      )
    );
  }

  getTags$() {
    return this._tagState.value$.pipe(
      takeUntilDestroyed(),
      map((tags) => tags ?? []),
      map((tags) => tags?.sort(this._sortTags))
    );
  }
}
