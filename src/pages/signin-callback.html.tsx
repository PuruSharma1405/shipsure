import React, { useEffect } from 'react';
import oidcConfig from '@/config/oidcConfig';
import { useRouter } from 'next/router';
import { UserManager } from 'oidc-client';

const CallbackPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    const userManager = new UserManager(oidcConfig); // You can configure this as needed
    userManager.signinRedirectCallback().then(() => {
        router.push('/home'); // Redirect to the desired route after successful authentication
      });
    }, []);
    

  return <div>Processing OIDC callback...</div>;
};

export default CallbackPage;
