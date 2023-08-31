import { Log, UserManager } from 'oidc-client';


const oidcConfig = {
    authority: process.env.NEXT_PUBLIC_STS_AUTHORITY,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    post_logout_redirect_uri: process.env.NEXT_PUBLIC_SILENT_REDIRECT_URL,
    response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
    scope: process.env.NEXT_PUBLIC_CLIENT_SCOPE
};

let userManager: any = {};
if (typeof window !== 'undefined') {
    userManager = new UserManager(oidcConfig);
    Log.logger = console;
    Log.level = Log.INFO;
}

export {
    oidcConfig,
    userManager
};
