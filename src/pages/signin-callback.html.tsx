import React, { useEffect } from 'react';
import { userManager } from '@/config/oidcConfig';
import { useRouter } from 'next/router';

const CallbackPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    userManager.signinRedirectCallback().then(() => {
        router.push('/home');
      });
    }, []);
    

  return <div>Processing OIDC callback...</div>;
};

export default CallbackPage;
