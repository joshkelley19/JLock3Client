export namespace JLockConstants {

    export namespace Generator {
        export const URL = 'http://www.passwordrandom.com/query?command=password&scheme="+scheme+"&format=json&count=1';
        export const FORMAT = '&format=json&count=';
        export const MIN = 8;
        export const MAX = 24;
    }

    export namespace Scheme {
        export const LETTER = 'R';
        export const UPPERCASE = 'L';
        export const LOWERCASE = 'l';
        export const NUMBER = 'N';
        export const ANYSYMBOL = '!';
        export const SYMBOL = '#';//!@#$.+
    }

    export namespace Client {
        export const id = 'josh';
        export const secret = 'joshsecret';
    }

    // local url
    export const HOSTURL = 'http://localhost:8080';

    // cloudfoundry dev
    // export const HOSTURL = 'https://jlock3.cfapps.io';
}
