import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, first, iif, map, of, switchMap } from 'rxjs';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TagService } from '../../../../shared/data-access/services/tag.service';
import { Tag } from '../../../../shared/types/models/tag';
import { TagFormComponent } from '../../components/tag-form/tag-form.component';

@Component({
  selector: 'tsk-tag-view-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TagFormComponent],
  templateUrl: './tag-view-detail.component.html',
  styleUrls: [
    './tag-view-detail.component.scss',
    './../../../../shared/styles/card.scss',
  ],
})
export class TagViewDetailComponent {
  private _tagService = inject(TagService);
  private _activatedRoute = inject(ActivatedRoute);
  public router = inject(Router);

  public task$: Observable<Partial<Tag>> = this._activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
    switchMap((id) =>
      iif(() => id === null, of({}), this._tagService.readById(id ?? ''))
    )
  );

  onSubmit(tag: Partial<Tag>) {
    let req: Observable<Tag>;
    if (tag.id) req = this._tagService.update(tag.id, tag);
    else req = this._tagService.create(tag);

    req.pipe(first()).subscribe(() => this.router.navigate(['..']));
  }
}
