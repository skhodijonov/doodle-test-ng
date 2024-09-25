import {ApplicationConfig, importProvidersFrom, InjectionToken, provideZoneChangeDetection} from '@angular/core';
import {APP_ROUTES} from './app.routes';
import {IDataConfig} from './core/interfaces/data-config.interface';
import {LocalStorageService} from './core/services/data.service';


export const DATA_CONFIG = new InjectionToken<IDataConfig>('data.config');
const dataConfig: IDataConfig = {
  key: 'userData',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    importProvidersFrom(APP_ROUTES),
    LocalStorageService,
    {provide: DATA_CONFIG, useValue: dataConfig}
  ]
};
