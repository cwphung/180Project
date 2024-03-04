require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const activeCodes = {}; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

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
        activeCodes[securityCode] = { email, hashedPassword, name };

        console.log(`Registering user: ${name} with email: ${email}, hashed password: ${hashedPassword}, security code: ${securityCode}`);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Verification Code",
            html: `<h1>Welcome, ${name}!</h1><p>Thank you for registering. Your security code is ${securityCode}.</p>`,
        });

        res.send({ message: 'Registration successful, email sent with security code!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('An error occurred during registration');
    }
});

app.post('/verify', async (req, res) => {
    const { code } = req.body;
    if (activeCodes[code]) {
        const userInfo = activeCodes[code];
        delete activeCodes[code]; 

        const usersCollection = client.db("userInfra").collection("users");
        await usersCollection.insertOne({
            email: userInfo.email,
            password: userInfo.hashedPassword,
            name: userInfo.name,
        });

        res.send({ verified: true });
    } else {
        res.status(400).send({ verified: false, message: 'Incorrect or expired verification code.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToMongoDB();
});
