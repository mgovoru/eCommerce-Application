import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class MyTokenCache implements TokenCache {
  private myCaсhe: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  set(newCache: TokenStore): void {
    this.myCaсhe = newCache;
  }

  get(): TokenStore {
    return this.myCaсhe;
  }
}
