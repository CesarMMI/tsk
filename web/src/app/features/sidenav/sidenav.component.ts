import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TskIconComponent } from 'tsk-web-library';
import { DialogService } from '../../core/services/dialog.service';
import { TagsState } from '../../shared/data-access/states/tag.state';
import { Tag } from '../../shared/types/models/tag';

@Component({
  selector: 'tsk-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TskIconComponent],
  templateUrl: './sidenav.component.html',
  styleUrls: [
    './../../shared/styles/header.scss',
    './../../shared/styles/list.scss',
    './sidenav.component.scss',
  ],
})
export class SidenavComponent {
  public tagsState = inject(TagsState);
  private _dialogService = inject(DialogService);

  public cor = '#fafafa';
  public tags = this.tagsState.tags;
  public loaded = this.tagsState.loaded;

  onCreate() {}

  onEdit(tag: Tag) {}

  onDelete(id: string) {
    this.tagsState.deleteTag(id);
  }
}
