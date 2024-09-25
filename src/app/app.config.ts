import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {APP_ROUTES} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    importProvidersFrom(APP_ROUTES),
  ]
};
