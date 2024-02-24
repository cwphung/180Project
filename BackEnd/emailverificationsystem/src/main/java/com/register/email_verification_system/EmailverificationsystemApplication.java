package com.register.email_verification_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import javax.mail.MessagingException;

import com.register.security_code_provider.*; 

@SpringBootApplication
public class EmailverificationsystemApplication {

    @Autowired
    private EmailSenderService senderService;
    public static void main(String[] args) {
        SpringApplication.run(EmailverificationsystemApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void triggerMail() throws MessagingException {
        String verificationCode = CodeGenerator.generateRandomCode(6); // Generate a 6 character long code

        String emailBody = "Your verification code is: " + verificationCode;

        senderService.sendSimpleEmail(
            "",
            "Verification Code from Group7",
            emailBody 
        );
    }
}
