import React, { useEffect } from 'react';
import { UserManager } from 'oidc-client';
import { useRouter } from 'next/router';

const CallbackPage = () => {
  const router = useRouter();
  const settings = {
    authority: process.env.NEXT_PUBLIC_STS_AUTHORITY,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/signin-callback.html',
    post_logout_redirect_uri: 'http://localhost:3000' + '/silent-renew.html',
    response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
    scope: process.env.NEXT_PUBLIC_CLIENT_SCOPE,
  };
  let userManager: any;
  // try {
    if (typeof window !== 'undefined') {
      userManager = new UserManager(settings); // You can configure this as needed
    }
  // } catch (error) {
  //   console.log('@@@error', error);
  // }

  useEffect(() => {
    userManager.signinRedirectCallback().then(() => {
      router.push('/home'); // Redirect to the desired route after successful authentication
    });
  }, []);

  return <div>Processing OIDC callback...</div>;
};

export default CallbackPage;
