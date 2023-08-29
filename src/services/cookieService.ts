import Cookies from 'js-cookie';

export class CookieService {

    constructor() {

    }
    setCookie(key: string, data: any, domain: string = 'dev-omnichannel.v.group'){
        try {
            Cookies.set(key, data, { expires: 365, path: '/'});
        } catch (error) {
            console.log('error', error)
        }
    }

    getCookie(key: string) {
        const data = Cookies.get(key);
        return data ? JSON.parse(data) : null;
    }

    deleteAllCookies() {
        const cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}