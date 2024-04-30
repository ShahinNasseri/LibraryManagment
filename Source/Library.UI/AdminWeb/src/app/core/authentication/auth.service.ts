import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, iif, map, merge, of, share, switchMap, tap } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { User } from './interface';
import { TokenService } from './token.service';

import {AuthService as AuthApiService, LoginRequest, RegisterRequest} from '@core/api/auth/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  private readonly tokenService = inject(TokenService);

  private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  register(request: RegisterRequest){
    return this.authApiService.register(request).pipe(
      tap(response => {
        this.tokenService.set(response.data![0]);
      }),
      map(() => this.check())
    );
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }

  login(request: LoginRequest) {
    return this.authApiService.login(request).pipe(
      tap(response => {
        this.tokenService.set(response.data![0]);
      }),
      map(() => this.check())
    );
  }

  refresh() {
    return this.authApiService
      .refreshToken(filterObject({ refreshToken: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(undefined)),
        tap(response => this.tokenService.set(response!.data![0])),
        map(() => this.check())
      );
  }

  logout() {
    return this.authApiService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.authApiService.getMenu(), of([]));
  }

  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }
    return this.authApiService.getUserData().pipe(tap((reponse: any) => {
      const user: User = {
        email: reponse.data![0].username,
        id: reponse.data![0].id,
        name: reponse.data![0].fullName
      };
      this.user$.next(user);
    }));
  }
}
