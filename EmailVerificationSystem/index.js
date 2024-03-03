require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const generateRandomCode = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = '';
    const random = () => Math.floor(Math.random() * characters.length);

    while (code.length < length) {
        code += characters[random()];
    }

    return code;
};

app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).send('Missing required fields');
    }

    const saltRounds = 10; 
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const securityCode = generateRandomCode(6); 

        console.log(`Registering user: ${name} with email: ${email}, hashed password: ${hashedPassword}, security code: ${securityCode}`);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Welcome to Our Service",
            html: `<h1>Welcome, ${name}!</h1><p>Thank you for registering. Your security code is ${securityCode}.</p>`,
        });

        res.send({ message: 'Registration successful, email sent with security code!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('An error occurred during registration');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
