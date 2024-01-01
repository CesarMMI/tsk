import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TagFacade } from '../../../shared/data-access/facades/tag.facade';

@Component({
  selector: 'tsk-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './../../../shared/styles/list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private _tagFacade = inject(TagFacade);
  public tags$ = this._tagFacade.getTags$();
}
