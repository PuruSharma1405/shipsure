import React, { useEffect, useState } from 'react';
import { userManager } from '@/config/oidcConfig';
import AuthService from '@/services/authService';
import { CookieService } from '@/services/cookieService';

const CallbackPage = () => {
  const authService = new AuthService();
  const cookieService = new CookieService();
  const [email, setEmail] = useState('');
  

  useEffect(() => {
    userManager.signinSilentCallback().then(() => {
      getUserData();
    }).catch((error: Error) => {
      console.log(error);
    });
  }, []);

  const getUserData = async () => {
    const userData = await authService.getUser();
    if(userData && userData.access_token && userData.profile && userData.profile.email){
      setEmail(userData.profile.email)
      setUserDataToCookies(userData);
    }
  }

  const setUserDataToCookies = (user: any) => {
    const cookieStoreData = {
      access_token: user?.access_token,
      expires_at: user?.expires_at,
      id_token: user?.id_token,
      refresh_token: user?.refresh_token,
      session_state: user?.session_state,
      token_type: user?.token_type,
      state: user?.state,
      scope: user?.scope,
      profile: user?.profile,
    }
    for (const [key, value] of Object.entries(cookieStoreData)) {
      if(value) {
        cookieService.setCookie(key, JSON.stringify(value));
      }
    }
  }

  useEffect(() => {
    if(email) {
      getMSTSToken(email)
    }
  }, [email]);

  const getMSTSToken = async (email: string) => {
    await authService.loginAuthorization(email);
  }
    

  return <div>Processing OIDC callback...</div>;
};

export default CallbackPage;
