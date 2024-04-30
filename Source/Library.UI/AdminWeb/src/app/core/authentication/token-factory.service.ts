import { Injectable } from '@angular/core';
import { Token } from './interface';
import { SimpleToken, JwtToken, BaseToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenFactory {
  create(attributes: Token): BaseToken | undefined {
    if (!attributes.accessToken) {
      return undefined;
    }

    if (JwtToken.is(attributes.accessToken)) {
      return new JwtToken(attributes);
    }

    return new SimpleToken(attributes);
  }
}
