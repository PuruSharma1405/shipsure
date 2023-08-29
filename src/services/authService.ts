import { User } from 'oidc-client';
import * as qs from 'qs';
import { setLocalStorage } from '@/services/localstorageService';
import { CookieService } from '@/services/cookieService';
import { userManager } from '@/config/oidcConfig';
import { COMMON_CONFIG } from '@/config/common';

interface TokenData {
  access_token: string;
  id_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  profile: string;
  state: string;
  expires_in: number;
  expired: string;
  scopes: string;
}

export default class AuthService {
  private cookieService = new CookieService();
  private userManager = userManager;

  constructor() {
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public storeUser(user: User): Promise<void> {
    return this.userManager.storeUser(user);
  }

  public async logout(): Promise<void> {
    await this.cookieService.deleteAllCookies();
    return this.userManager.signoutRedirect();
  }

  private getCurrentTimePlus30Minutes(minutes: number): number {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + minutes * 60 * 1000);
    return futureTime.getTime();
  }

  public loginAuthorization(email: string) {
    return new Promise<TokenData>((resolve, reject) => {
      const body = {
        client_id: btoa(process.env.NEXT_PUBLIC_MSTS_CLIENT_ID || '277AFC1D-AF71-4D58-BF11-A9F4FEFAD187'),
        client_secret: btoa(process.env.NEXT_PUBLIC_MSTS_CLIENT_SECRET || 'E66B022B-954B-4BCA-B108-E517D00BC4D4'),
        grant_type: process.env.NEXT_PUBLIC_MSTS_GRANT_TYPE || 'password',
        userName: btoa(email),
        password: btoa(process.env.NEXT_PUBLIC_MSTS_GRANT_PASSWORD || 'omniauth'),
      };
      const data = qs.stringify(body);

      fetch(process.env.NEXT_PUBLIC_OMNI_URL || 'https://dev-msts.v.group/omnijwttoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            const tokenData: TokenData = {
              ...data,
              expireAt: this.getCurrentTimePlus30Minutes(data.expires_in),
            };
            setLocalStorage(COMMON_CONFIG.TOKEN_STORE_KEY, JSON.stringify(tokenData));
            resolve(tokenData);
          } else {
            console.error('Something went wrong');
            reject(new Error('Something went wrong'));
          }
        })
        .catch(error => {
          console.error('Error while login', error);
          reject(error);
        });
    });
  }

  public refreshAuthorizationToken(refreshToken: string) {
    return new Promise<TokenData>((resolve, reject) => {
      const body = {
        client_id: btoa(process.env.NEXT_PUBLIC_MSTS_CLIENT_ID || '277AFC1D-AF71-4D58-BF11-A9F4FEFAD187'),
        client_secret: btoa(process.env.NEXT_PUBLIC_MSTS_CLIENT_SECRET || 'E66B022B-954B-4BCA-B108-E517D00BC4D4'),
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      };
      const data = qs.stringify(body);

      fetch(process.env.NEXT_PUBLIC_OMNI_URL || 'https://dev-msts.v.group/omnijwttoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
        .then(response => response.json())
        .then(data => {
          console.log('response', data);
          if (data) {
            const tokenData: TokenData = {
              ...data,
              expireAt: this.getCurrentTimePlus30Minutes(data.expires_in),
            };
            setLocalStorage(COMMON_CONFIG.TOKEN_STORE_KEY, JSON.stringify(tokenData));
            resolve(tokenData);
          } else {
            console.error('Something went wrong');
            reject(new Error('Something went wrong'));
          }
        })
        .catch(error => {
          console.error('Error while login', error);
          reject(error);
        });
    });
  }
}
