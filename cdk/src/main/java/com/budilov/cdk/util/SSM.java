package com.budilov.cdk.util;

import org.jetbrains.annotations.NotNull;
import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.ParameterType;
import software.amazon.awssdk.services.ssm.model.PutParameterRequest;
import software.amazon.awssdk.services.ssm.model.PutParameterResponse;

public class SSM {

    static private final SsmClient client = SsmClient.builder().build();

    static public void addParameter(@NotNull String name, @NotNull String value) {
        PutParameterRequest request = PutParameterRequest.builder()
                .name(name)
                .value(value)
                .type(ParameterType.STRING)
                .build();
        try {
            PutParameterResponse response = client.putParameter(request);

        } catch (Exception e) {

        }

    }
}
