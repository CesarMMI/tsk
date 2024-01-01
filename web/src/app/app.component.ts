import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { slider } from './core/animations/route-animation';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'tsk-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <main>
      <div class="sidenav">
        <tsk-navbar></tsk-navbar>
      </div>
      <div [@routeAnimations]="prepareRoute(outlet)" class="content">
        <router-outlet #outlet="outlet"></router-outlet>
      </div>
    </main>
  `,
  styles: `
    main {
      width: 100vw;
      height: 100vh;

      display: flex;
      gap: var(--padding-md);
      background-color: var(--color-base-dk);
    }

    .sidenav {
      width: min(20%, 300px);
    }

    .content {
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      width: min(80%, 960px);
    }
  `,
  animations: [slider],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
