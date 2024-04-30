import { base64, capitalize, currentTimestamp, timeLeft } from './helpers';
import { Token } from './interface';

export abstract class BaseToken {
  constructor(protected attributes: Token) {}

  get accessToken(): string {
    return this.attributes.accessToken;
  }

  get refreshToken(): string | void {
    return this.attributes.refreshToken;
  }

  get tokenType(): string {
    return this.attributes.tokenType ?? 'bearer';
  }

  get exp(): number | void {
    return this.attributes.exp;
  }

  valid(): boolean {
    return this.hasAccessToken() && !this.isExpired();
  }

  getBearerToken(): string {
    return this.accessToken
      ? [capitalize(this.tokenType), this.accessToken].join(' ').trim()
      : '';
  }

  needRefresh(): boolean {
    return this.exp !== undefined && this.exp >= 0;
  }

  getRefreshTime(): number {
    return timeLeft((this.exp ?? 0) - 5);
  }

  private hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  private isExpired(): boolean {
    return this.exp !== undefined && this.exp - currentTimestamp() <= 0;
  }
}

export class SimpleToken extends BaseToken {}

export class JwtToken extends SimpleToken {
  private _payload?: { exp?: number | void };

  static is(accessToken: string): boolean {
    try {
      const [_header] = accessToken.split('.');
      const header = JSON.parse(base64.decode(_header));

      return header.typ.toUpperCase().includes('JWT');
    } catch (e) {
      return false;
    }
  }

  get exp(): number | void {
    return this.payload?.exp;
  }

  private get payload(): { exp?: number | void } {
    if (!this.accessToken) {
      return {};
    }

    if (this._payload) {
      return this._payload;
    }

    const [, payload] = this.accessToken.split('.');

    // this comme
    // const data = JSON.parse(base64.decode(payload));
    // if (!data.exp) {
    //   data.exp = this.attributes.exp;
    // }
    this._payload = {exp: this.attributes.exp};

    return this._payload;
  }
}
