import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { delayInterceptor } from './core/interceptors/delay.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		importProvidersFrom([MatNativeDateModule, MatDialogModule]),
		provideHttpClient(withInterceptors([delayInterceptor])),
	],
};
