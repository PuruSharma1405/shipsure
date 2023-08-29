import { Log, User, UserManager } from 'oidc-client';
import * as qs from 'qs';
import { setLocalStorage } from './localstorageService';
import oidcConfig from '@/config/oidcConfig';

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
  private userManager: any;

  constructor() {
      if (typeof window !== 'undefined') {
        this.userManager = new UserManager(oidcConfig);
        Log.logger = console;
        Log.level = Log.INFO;
      }
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

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  private getCurrentTimePlus30Minutes(minutes: number): number {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + minutes * 60 * 1000);
    return futureTime.getTime();
  }

  public signinRedirectCallback(currentUrl: string) {
    return new Promise((resolve, reject) => {
      this.userManager.signinRedirectCallback(currentUrl).then((users: any) => {
        console.log('@@authservice user', users)
        resolve(true);
    }).catch((error: Error)  => {
      console.log('@@@error', error);
    });
    })
  }

  public loginAuthorization(email: string = 'suraj.wadekar@pitechniques.com') {
    return new Promise<TokenData>((resolve, reject) => {
      const body = {
        client_id: btoa('277AFC1D-AF71-4D58-BF11-A9F4FEFAD187'),
        client_secret: btoa('E66B022B-954B-4BCA-B108-E517D00BC4D4'),
        grant_type: 'password',
        userName: btoa(email),
        password: btoa('omniauth'),
      };
      const data = qs.stringify(body);

      fetch('https://dev-msts.v.group/omnijwttoken', {
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
            setLocalStorage('token', JSON.stringify(tokenData));
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
        client_id: btoa('277AFC1D-AF71-4D58-BF11-A9F4FEFAD187'),
        client_secret: btoa('E66B022B-954B-4BCA-B108-E517D00BC4D4'),
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      };
      const data = qs.stringify(body);

      fetch('https://dev-msts.v.group/omnijwttoken', {
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
            setLocalStorage('token', JSON.stringify(tokenData));
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
