import {Logger} from "@aws-amplify/core";
import {Auth} from "aws-amplify";

const log = new Logger("HttpService");

export class HttpService {

    constructor(chatUrl) {
        this.url = chatUrl;
    }

    /**
     * Returns the user if he's logged in, returns null if he's not.
     *
     *
     * @returns {Promise<string>}
     */
    getIdTokenOfCurrentUser = async () => {
        let session = await Auth.currentSession();

        if (session) {
            let token = await session.getIdToken().getJwtToken()
            log.debug("token: " + token)
            return token;
        } else
            return null;
    }

    makeCall = async (endpoint, method, queryParameterMap, headersMapParam, body, addAuthToken) => {

        let response = null;
        let headersMap = {};

        if (headersMapParam)
            headersMap = headersMapParam;

        headersMap["Content-Type"] = "application/json";

        // Add auth token if needed
        if (addAuthToken) {
            log.debug("addAuthToken: " + addAuthToken);

            let session = await Auth.currentSession();

            let jwtToken = session.getIdToken().getJwtToken();

            log.debug("jwtToken: " + jwtToken);
            headersMap["authorization"] = jwtToken;
        }

        let queryString = "";

        if (queryParameterMap) {
            queryString = "?";

            for (let key in queryParameterMap) {
                if (queryString !== "?")
                    queryString = queryString + "&"
                queryString = queryString + key + "=" + queryParameterMap[key];
            }
        }

        log.debug("headersMap: " + JSON.stringify(headersMap))
        let requestData = {
            method: method,
            headers: headersMap
        };

        if (body)
            requestData['body'] = body;

        try {
            response = (await fetch(endpoint + queryString, requestData)).json();

            log.debug("Response: " + JSON.stringify(response));
        } catch (e) {
            log.error("couldn't fetch: " + e);
        }

        return response;

    }

}
