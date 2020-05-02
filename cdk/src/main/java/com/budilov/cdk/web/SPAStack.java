package com.budilov.cdk.web;

import software.amazon.awscdk.core.Construct;
import software.amazon.awscdk.core.RemovalPolicy;
import software.amazon.awscdk.core.Stack;
import software.amazon.awscdk.core.StackProps;
import software.amazon.awscdk.services.certificatemanager.Certificate;
import software.amazon.awscdk.services.certificatemanager.CertificateProps;
import software.amazon.awscdk.services.cloudfront.*;
import software.amazon.awscdk.services.s3.Bucket;
import software.amazon.awscdk.services.s3.CorsRule;
import software.amazon.awscdk.services.s3.HttpMethods;

import java.io.IOException;
import java.util.List;

/**
 * Stack that creates IAM roles for EKS Pods
 */
public class SPAStack extends Stack {

    public SPAStack(final Construct scope, final String id) throws IOException {
        this(scope, id, null);
    }

    public SPAStack(final Construct scope, final String id, final StackProps props) throws IOException {
        super(scope, id, props);

        Certificate certificate = new Certificate(this, "SecretWitCertificate", new CertificateProps.Builder()
                .domainName("secretwit.com")
                .subjectAlternativeNames(List.of("*.secretwit.com")).build());

        Bucket websiteBucket = Bucket.Builder.create(this, "SecretWitBucket")
                .bucketName("secretwit.website")
                .publicReadAccess(true)
                .websiteIndexDocument("index.html")
                .websiteErrorDocument("index.html")
                .cors(List.of(CorsRule.builder()
                        .allowedMethods(List.of(HttpMethods.GET, HttpMethods.HEAD))
                        .allowedOrigins(List.of("*.secretwit.com", "www.secretwit.com"))
                        .build()))
                .removalPolicy(RemovalPolicy.DESTROY)
                .build();

        CloudFrontWebDistribution distribution = new CloudFrontWebDistribution(this, "SecretWitCloudFront",
                new CloudFrontWebDistributionProps.Builder()
                        .originConfigs(List.of(new SourceConfiguration.Builder()
                                .s3OriginSource(new S3OriginConfig.Builder()
                                        .s3BucketSource(websiteBucket)
                                        .build())
                                .behaviors(List.of(new Behavior.Builder()
                                        .isDefaultBehavior(true)
                                        .cachedMethods(CloudFrontAllowedCachedMethods.GET_HEAD)
                                        .allowedMethods(CloudFrontAllowedMethods.ALL)
                                        .build()))
                                .build()))
                        .defaultRootObject("index.html")
                        .errorConfigurations(List.of(CfnDistribution.CustomErrorResponseProperty.builder()
                                .errorCode(403)
                                .responsePagePath("/index.html")
                                .responseCode(200)
                                .build()))
                        .enableIpV6(true)
                        .viewerProtocolPolicy(ViewerProtocolPolicy.REDIRECT_TO_HTTPS)
                        .viewerCertificate(ViewerCertificate.fromAcmCertificate(certificate, ViewerCertificateOptions.builder()
                                .aliases(List.of("secretwit.com", "*.secretwit.com"))
                                .securityPolicy(SecurityPolicyProtocol.TLS_V1)// default
                                .sslMethod(SSLMethod.SNI).build()))
                        .build());

    }

}
