import express from "express";
import cors from 'cors';
import OpenAI from "openai";
import 'dotenv/config';
import config from '../config.js';
import functions from 'firebase-functions';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { sendContactForm } from "./controllers/forms/forms.js";
const firebaseConfig = {
  apiKey: "AIzaSyDZ5oN9Z1gXa3H_a1iVXrWzJgzBAe_qaL8",
  authDomain: "email-server-aem.firebaseapp.com",
  projectId: "email-server-aem",
  storageBucket: "email-server-aem.appspot.com",
  messagingSenderId: "1012220487058",
  appId: "1:1012220487058:web:1e30c7eebce14fe503cd4b",
  measurementId: "G-MQJ1EHSX92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const openai = new OpenAI({apiKey: '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'});
const server = express()

server.use(cors());
server.use(express.json());
const port = 3000;

server.get('/', (req, res) => {
    console.log('teas');
    res.send('Welcome to my server');
}) 

server.get('/test', (req, res) => {
    res.send('test');
})

server.post('/contact-form', sendContactForm)

server.get('/get-comment', async (req, res) => {
    console.log(req.query);
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: 'Geef mij een lijst van 10 ' + req.query.type + 'met ' + req.query.ingredients + ' in JSON format' }],
        model: "gpt-3.5-turbo",
      });
      res.send(JSON.parse(completion.choices[0].message.content)).status(200);
})



server.listen(config.port, () => {
    console.log(`Server is running on port ${config.hostUrl}`);
})

exports.api = functions.https.onRequest(server);