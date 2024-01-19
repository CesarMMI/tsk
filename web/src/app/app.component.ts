import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './features/sidenav/sidenav.component';

@Component({
  selector: 'tsk-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  template: `
    <main>
      <div class="sidenav">
        <tsk-sidenav></tsk-sidenav>
      </div>
      <div class="outlet">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>
  `,
  styles: `
    main {
      width: 100vw;
      height: 100vh;

      display: grid;
      grid-template-columns: 1fr 4fr;
    }

    .sidenav {
      border-right: 1px solid var(--color-border)
    }

    .outlet {
      overflow-y: auto;
    }
    
    .container {
      margin: 0 auto;
      width: min(80%, 960px);
    }
  `,
})
export class AppComponent {}
