require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",  
        methods: ["GET", "POST"]
    }
});

const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,  
    socket: {
        host: process.env.REDIS_HOST,     
        port: process.env.REDIS_PORT      
    }
});


redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

redisClient.connect(); 

const CHAT_HISTORY_KEY = 'chatHistory';

io.on('connection', (socket) => {
    console.log('New client connected, socket id:', socket.id);

    redisClient.lRange(CHAT_HISTORY_KEY, 0, -1)
        .then(messages => {
            console.log(`Sending ${messages.length} past messages to new client`);
            messages.forEach((message) => {
                socket.emit('message', message);
            });
        })
        .catch(err => {
            console.error('Error retrieving messages from Redis:', err);
        });

    socket.on('message', (message) => {
        console.log(`Received message from ${socket.id}: ${message}`);
        socket.broadcast.emit('message', message);  
        redisClient.rPush(CHAT_HISTORY_KEY, message)
            .then(() => console.log('Message saved to Redis'))
            .catch(err => console.error('Error saving message to Redis:', err));
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected, socket id:', socket.id);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});