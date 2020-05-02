package com.budilov.cdk;

import com.budilov.cdk.cognito.CognitoLambdaStack;
import com.budilov.cdk.cognito.CognitoStack;
import com.budilov.cdk.ddb.DDBUserTableStack;
import com.budilov.cdk.web.SPAStack;
import software.amazon.awscdk.core.App;

public class BudilovApp {

    public static void main(final String[] args) throws Exception {
        App app = new App();

        // DynamoDB Stack
        new DDBUserTableStack(app, "BudilovUsersDDBTable");

        // Cognito
        CognitoLambdaStack cognitoLambdaStack = new CognitoLambdaStack(app, "BudilovCognitoLambdaStack");
        CognitoStack cognitoStack = new CognitoStack(app, "BudilovCognitoStack");
        cognitoStack.addDependency(cognitoLambdaStack);

        // SPA
        new SPAStack(app, "SPAStack");
        app.synth();
    }
}