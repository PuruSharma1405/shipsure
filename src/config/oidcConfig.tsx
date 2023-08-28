import { UserManager } from 'oidc-client';

const oidcConfig = {
    authority: process.env.NEXT_PUBLIC_STS_AUTHORITY,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/signin-callback.html',
    post_logout_redirect_uri: 'http://localhost:3000'+ '/silent-renew.html',
    response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
    scope: process.env.NEXT_PUBLIC_CLIENT_SCOPE
};

const userManager = new UserManager(oidcConfig);

export default userManager;
