import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '@/services/authService';
import { CookieService } from '@/services/cookieService';

export default function Page() {
  const router = useRouter();
  const authService = new AuthService();
  const cookieService = new CookieService();
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    try {
      const parseData = {
        access_token: cookieService.getCookie('access_token'),
        id_token: cookieService.getCookie('id_token'),
        expires_at: cookieService.getCookie('expires_at'),
        token_type: cookieService.getCookie('token_type'),
        scope: cookieService.getCookie('scope'),
        profile: cookieService.getCookie('profile'),
        state: cookieService.getCookie('state'),
        expires_in: cookieService.getCookie('expires_in'),
        expired: cookieService.getCookie('expired'),
        scopes: cookieService.getCookie('scopes'),
        toStorageString: function () {
          const dataToStore = { ...this }; // Clone the object to prevent circular reference issues
          return JSON.stringify(dataToStore);
        },
      }
      if(parseData && parseData.access_token && parseData.id_token && parseData.id_token) {
        authService.storeUser(parseData);
        setRedirectTo('home');
      } else {
        authService.login();
      }
    } catch (error) {
      console.log('@@@error', error);
    }

  }, [])

  useEffect(() => {
    if (redirectTo) {
      router.push(`/${redirectTo}`);
    }
  }, [redirectTo]);

    return (
      <>
        <h1>Authentification callback processing...</h1>
      </>
    ) 
  }