import React, { useEffect } from 'react';
import { UserManager } from 'oidc-client';
import { useRouter } from 'next/router';
import AuthService from '@/services/authService';

const CallbackPage = () => {
  const authService = new AuthService();

  const router = useRouter();
  const settings = {
    authority: process.env.NEXT_PUBLIC_STS_AUTHORITY,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/signin-callback.html',
    post_logout_redirect_uri: 'http://localhost:3000' + '/silent-renew.html',
    response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
    scope: process.env.NEXT_PUBLIC_CLIENT_SCOPE,
  };
  // let userManager;
  // try {
  // } catch (error) {
  //   console.log('@@@error', error);
  // }
  
  useEffect(() => {
    const userManager = new UserManager(settings); // You can configure this as needed
    userManager.signinRedirectCallback().then(() => {
        debugger
      router.push('/home'); // Redirect to the desired route after successful authentication
    });
  }, []);

  return <div>Processing OIDC callback...</div>;
};

export default CallbackPage;
