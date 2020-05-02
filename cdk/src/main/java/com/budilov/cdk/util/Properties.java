package com.budilov.cdk.util;

import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

public class Properties {

    // General
    public static String REGION = "us-east-1";
    public static String ACCOUNT = "000000000"; //todo

    // DynamoDB
    public static String DDB_USERS_TABLE = "SecretWitUsers";
    public static String DDB_USERS_TABLE_PARTITION_ID = "userId";
    public static String DDB_USERS_TABLE_SORT_KEY = "sortKey";

    public static String readResourceFileContents(@NotNull String fileName, Map<String, String> replacements) throws IOException {

        File file = new File(
                Properties.class.getClassLoader().getResource(fileName).getFile()
        );

        String resourceFile = new String(Files.readAllBytes(file.toPath()));

        if (replacements != null)
            for (Map.Entry<String, String> entry : replacements.entrySet()) {
                resourceFile = resourceFile.replaceAll(entry.getKey(), entry.getValue());
            }

        return resourceFile;
    }
}
