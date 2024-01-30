import express from "express";
import cors from 'cors';
import OpenAI from "openai";
import 'dotenv/config';
import config from '../config.js';
import { sendContactForm } from "./controllers/forms/forms.js";

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
