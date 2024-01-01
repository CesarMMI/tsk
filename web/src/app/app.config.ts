import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { MatDialogModule } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom([MatNativeDateModule, MatDialogModule]),
  ],
};
