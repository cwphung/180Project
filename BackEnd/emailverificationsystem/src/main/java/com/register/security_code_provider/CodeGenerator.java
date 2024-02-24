package com.register.security_code_provider;

import java.util.Random;

public class CodeGenerator {
    public static String generateRandomCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder codeBuilder = new StringBuilder(length);
        Random random = new Random();

        while (codeBuilder.length() < length) {
            int index = random.nextInt(characters.length());
            char ch = characters.charAt(index);
            if (codeBuilder.indexOf(String.valueOf(ch)) == -1) {
                codeBuilder.append(ch);
            }
        }

        return codeBuilder.toString();
    }
}
