
#### Deployment
```

mvn package && cdk synth

cdk deploy "*"

-- OR -- 

// DDB
cdk deploy "BudilovUsersDDBTable"

// Cognito
cdk deploy "BudilovCognitoLambdaStack"
cdk deploy "BudilovCognitoStack"

// CloudFront & S3
cdk deploy "SPAStack"

```

###### Useful commands

 * `mvn package`     compile and run tests
 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation
