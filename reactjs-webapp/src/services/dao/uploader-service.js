import {Logger} from "@aws-amplify/core";
import {config} from "../constants";
import {AuthService} from "../../screens/auth/service/auth-service";

const logger = new Logger("UploadService");

export class UploadService {

    getUploads = async (offset, limit) => {

        let queryParams = "";
        let response = null;

        if (offset)
            queryParams = "?offset=" + offset;
        // if (limit)
        //     queryParams = "limit=" + limit;
        let endpoint = config.uploaderService + "/uploads"

        logger.debug("getUploads() URL: " + endpoint);
        let idJwtToken = await AuthService.getIdTokenOfCurrentUser();
        if (idJwtToken)
            return await fetch(endpoint, {
                crossDomain: true,
                headers: {
                    'Authorization': "Bearer " + idJwtToken,
                },
                mode: "cors"
            }).then(response =>
                response.json())
                .then(json => {
                    logger.debug('got uploads', JSON.stringify(json)) // access json.body here
                    return json;
                }).catch(function (ex) {
                    logger.error("Couldn't get files", ex)
                })
        logger.debug("Final response: " + JSON.stringify(response));
        return response;
    }

    uploadFile = async (file, type) => {
        if (type === null)
            type = "alttext";

        logger.debug("type: " + type);

        logger.debug("enter uploadFile")
        let formData = new FormData();
        formData.append('file', file);

        let response = null;

        let endpoint = config.uploaderService + "/" + type + "/upload"

        let idJwtToken = await AuthService.getIdTokenOfCurrentUser();
        if (idJwtToken)
            try {
                let rawResponse = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': "Bearer " + idJwtToken,
                        "Content-Length": file.size
                    },
                    body: formData
                }).then(response => response.json())
                    .then(json => {
                        logger.debug('parsed json: ' + JSON.stringify(json)) // access json.body here
                        response = json;
                    });
                // logger.debug("rawResponse : " + JSON.stringify(rawResponse));

                // if (rawResponse)
                //     response = rawResponse.json();

            } catch (e) {
                logger.error("couldn't upload: " + e);
            }
        else {
            response = {"error": true, "errorMessage": "You're not authenticated"};
        }

        logger.debug("response : " + JSON.stringify(response));
        return response;
    }

}
