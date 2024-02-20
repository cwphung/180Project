package com.register.emailverificationsystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import javax.mail.MessagingException;

@SpringBootApplication
public class EmailverificationsystemApplication {

    @Autowired
    private EmailSenderService senderService;
    public static void main(String[] args) {
        SpringApplication.run(EmailverificationsystemApplication.class, args);
    }
    @EventListener(ApplicationReadyEvent.class)
    public void triggerMail() throws MessagingException {
        senderService.sendSimpleEmail(
            "",
            "This is email subject",
            "This is email body"
        );

    }
}