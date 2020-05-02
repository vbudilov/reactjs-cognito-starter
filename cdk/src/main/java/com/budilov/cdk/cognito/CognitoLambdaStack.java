package com.budilov.cdk.cognito;

import com.budilov.cdk.util.Properties;
import org.jetbrains.annotations.NotNull;
import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.Stack;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.iam.CompositePrincipal;
import software.amazon.awscdk.services.iam.ManagedPolicy;
import software.amazon.awscdk.services.iam.Role;
import software.amazon.awscdk.services.iam.ServicePrincipal;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.FunctionProps;
import software.amazon.awscdk.services.lambda.Runtime;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

/**
 * @author Vladimir Budilov
 * <p>
 * Simple way to create a Cognito User Pool with Lambda triggers
 */
public class CognitoLambdaStack extends Stack {
    static Function copyUserToDynamoDBLambda;
    static Function autoConfirmFunction;

    public CognitoLambdaStack(final Construct scope, final String id) throws IOException {
        this(scope, id, null);
    }

    public CognitoLambdaStack(final Construct scope, final String id, final StackProps props) throws IOException {
        super(scope, id, props);

        // Copy users to DDB
        Role ddbAccess = Role.Builder.create(this, "SecretWitCognitoToDDB")
                .assumedBy(
                        new CompositePrincipal(
                                ServicePrincipal.Builder.create("lambda").build()
                        )
                )
                .managedPolicies(List.of(ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess"),
                        ManagedPolicy.fromAwsManagedPolicyName("CloudWatchLogsFullAccess")))
                .roleName("SecretWitCognitoToDynamoDBRole")
                .build();

        copyUserToDynamoDBLambda = new Function(this, "copyUserToDynamoDBLambda", FunctionProps.builder()
                .runtime(Runtime.NODEJS_12_X)
                .functionName("SecretWitCognitoToDynamoDBLambda")
                .role(ddbAccess)
                .handler("index.handler")
                .code(Code.fromInline(getLambdaFunctionFromFile("cognitoToDynamoDBLambda")))
                .environment(Map.of("TABLE_NAME", Properties.DDB_USERS_TABLE,
                        "REGION", Properties.REGION,
                        "PARTITION_ID", Properties.DDB_USERS_TABLE_PARTITION_ID,
                        "SORT_KEY", Properties.DDB_USERS_TABLE_SORT_KEY))
                .build());

        // Auto-confirm users
        Role cognitoAccess = Role.Builder.create(this, "SecretWitCognitoUpdate")
                .assumedBy(
                        new CompositePrincipal(
                                ServicePrincipal.Builder.create("lambda").build()
                        )
                )
                .managedPolicies(List.of(ManagedPolicy.fromAwsManagedPolicyName("AmazonCognitoPowerUser")))
                .roleName("SecretWitCognitoUpdateRole")
                .build();


        autoConfirmFunction = new Function(this, "autoConfirmFunction", FunctionProps.builder()
                .runtime(Runtime.NODEJS_12_X)
                .functionName("SecretWitCognitoAutoConfirmUser")
                .role(cognitoAccess)
                .handler("index.confirm")
                .code(Code.fromInline(getLambdaFunctionFromFile("cognitoAutoConfirmUser")))
                .build());

    }


    private String getLambdaFunctionFromFile(@NotNull String fileName) throws IOException {

        File file = new File(
                getClass().getClassLoader().getResource(fileName + ".js").getFile()
        );

        return new String(Files.readAllBytes(file.toPath()));
    }
}
