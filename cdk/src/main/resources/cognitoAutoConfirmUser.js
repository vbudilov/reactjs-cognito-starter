'use strict';

module.exports.confirm = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    const modifiedEvent = event;

    // check that we're acting on the right trigger
    if (event.triggerSource === "PreSignUp_SignUp") {

        // auto confirm the user
        modifiedEvent.response.autoConfirmUser = true;

        // Set the email as verified if it is in the request
        modifiedEvent.response.autoVerifyEmail = true;

        callback(null, modifiedEvent);
        return
    }

    // Throw an error if invoked from the wrong trigger
    callback(`Misconfigured Cognito Trigger ${event.triggerSource}`)
};