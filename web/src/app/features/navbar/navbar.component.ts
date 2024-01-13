import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TagEditComponent } from '../tag/tag-edit/tag-edit.component';
import { TagsState } from '../../shared/data-access/states/tag.state';
import { Tag } from '../../shared/types/models/tag';

@Component({
	selector: 'tsk-navbar',
	standalone: true,
	imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
	templateUrl: './navbar.component.html',
	styleUrls: [
		'./../../shared/styles/list.scss',
		'./../../shared/styles/header.scss',
		'./navbar.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
	private _dialog = inject(MatDialog);

	public tagsState = inject(TagsState);

	public tags = this.tagsState.tags;
	public loaded = this.tagsState.loaded;

	onCreate() {
		this._dialog.open(TagEditComponent, {
			width: 'min(90vw, 400px)',
		});
	}

	onEdit(tag: Tag) {
		this._dialog.open(TagEditComponent, {
			width: 'min(90vw, 400px)',
			data: tag,
		});
	}

	onDelete(id: string) {
		this.tagsState.deleteTag(id);
	}
}
