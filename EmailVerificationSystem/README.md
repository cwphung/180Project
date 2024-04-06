# Email Verification System

An Email Verification System for Web Games is a security feature that ensures all player accounts are linked to a valid, owner-verified email address. This system helps prevent fake account creation and enhances overall game security. 

## Getting Started

1. Install 'dotenv'

Open your terminal or command prompt, navigate to EmailVerificationSystem project and run the following command to install dotenv:

`npm install dotenv`


'dotenv' is a zero-dependency module that loads environment variables from a '.env' file into 'process.env'.

2. Create a new .env file 

under EmailVerificationSystem file, create a new .env file with the following: 


`EMAIL=YOUR_EMAIL_ADDRESS`

`EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD`

`MONGODB_URI=YOUR_MONGODB_URI`


### Prerequisites

1. Set Up SMTP in Gmail Using an App Password

    a. Enable 2-Step Verification:\n
   
        * Visit your Google Account settings at https://myaccount.google.com/.
        * Sign in to the Gmail account you want to use for SMTP.
        * Navigate to “Security” in the left sidebar.
        * Under “Signing in to Google,” find and enable 2-step verification. Follow the on-screen instructions to set it up with your phone number or an authenticator app.

    b. Generate an App Password:\n
   
        * After enabling 2-step verification, proceed to generate an app-specific password:
        * In the “Security” section, click on “App passwords” or search it for the top search bar and click on it.
        * Provide a custom name for the app, like “SMTP for My Email Client.”
        * Click the “Create” button to create a unique 16-character app-specific password.

Username: Your Gmail email address is used as the SMTP username.
Password: An app-specific password generated from your Google Account settings is used as the SMTP password. 

source: https://saurabh-nakoti.medium.com/how-to-set-up-smtp-in-gmail-using-an-app-password-96adffa164b3

2. Set up MongoDB with your account

    a. Sign up your own account in MongoDB: https://www.mongodb.com
   
    b. Select your plan in MongoDB
   
    c. Create a new project named 'USERINFO' in MongoDB
   
    d. Create a Database named 'userInfra' in MongoDB
   
    e. Create a Collection named 'users' in MongoDB
   
    f. Install your driver
        Run the following on the command line:
        
        `npm install mongodb`
   
    g. Add your connection string into your application code

