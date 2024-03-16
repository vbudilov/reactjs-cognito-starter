import {Logger} from "@aws-amplify/core";

const logger = new Logger("LocalStorage");

export class LocalStorage {


    static removeStorage(key) {
        try {
            localStorage.removeItem(key);
            localStorage.removeItem(key + '_expiresIn');
        } catch (e) {
            console.log('removeStorage: Error removing key [' + key + '] from localStorage: ' + JSON.stringify(e));
            return false;
        }
        return true;
    }

    /*  getItem: retrieves a key from localStorage previously set with setItem().
        params:
            key <string> : localStorage key
        returns:
            <string> : value of localStorage key
            null : in case of expired key or failure
     */
    static getItem(key) {

        var now = Date.now();  //epoch time, lets deal only with integer
        // set expiration for storage
        var expiresIn = localStorage.getItem(key + '_expiresIn');
        if (expiresIn === undefined || expiresIn === null) {
            logger.debug("Couldn't find " + key)

            expiresIn = 0;
        }

        if (expiresIn < now) {// Expired
            LocalStorage.removeStorage(key);
            logger.debug(key + " expired")
            return null;
        } else {
            logger.debug("Searching for " + key)

            try {
                let value = localStorage.getItem(key);
                return value;
            } catch (e) {
                console.log('getItem: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
                return null;
            }
        }
    }

    /*  setItem: writes a key into localStorage setting a expire time
        params:
            key <string>     : localStorage key
            value <string>   : localStorage value
            expires <number> : number of seconds from now to expire the key
        returns:
            <boolean> : telling if operation succeeded
     */
    static setItem(key, value, expires) {

        if (expires === undefined || expires === null) {
            expires = (24 * 60 * 60);  // default: seconds for 1 day
        } else {
            expires = Math.abs(expires); //make sure it's positive
        }

        var now = Date.now();  //millisecs since epoch time, lets deal only with integer
        var schedule = now + expires * 1000;
        try {
            localStorage.setItem(key, value);
            localStorage.setItem(key + '_expiresIn', schedule);
        } catch (e) {
            console.log('setItem: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e));
            return false;
        }
        return true;
    }

    /*  setItem: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
    static setObject(key, value, expires) {

        LocalStorage.setItem(key, JSON.stringify(value), expires);
    }

    static getObject(key) {
        let object = LocalStorage.getItem(key);

        if (object)
            return JSON.parse(object);
        else
            return null;
    }
}
