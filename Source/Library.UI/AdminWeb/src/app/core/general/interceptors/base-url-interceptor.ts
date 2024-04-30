import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private readonly baseUrl = inject(BASE_URL, { optional: true });

  private hasScheme = (url: string) => new RegExp('^http(s)?://', 'i').test(url);
  private isAsset = (url: string) => new RegExp('^./assets/').test(url);

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.hasScheme(request.url) && !this.isAsset(request.url)) {
      return next.handle(request.clone({ url: this.prependBaseUrl(request.url) }));
    } else {
      return next.handle(request);
    }
  }

  private prependBaseUrl(url: string): string {
    return [this.baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter(val => val)
      .join('/');
  }
}
