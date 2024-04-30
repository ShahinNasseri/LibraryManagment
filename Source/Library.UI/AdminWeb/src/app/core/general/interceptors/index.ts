import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
// import { SanctumInterceptor } from './sanctum-interceptor';
import { BaseUrlInterceptor } from './base-url-interceptor';
import { SettingsInterceptor } from './settings-interceptor';
import { TokenInterceptor } from './token-interceptor';
import { LoggingInterceptor } from './logging-interceptor';

export * from './http-error-handler.interceptor';
// export * from './sanctum-interceptor';
export * from './base-url-interceptor';
export * from './settings-interceptor';
export * from './token-interceptor';
export * from './logging-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: SettingsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
