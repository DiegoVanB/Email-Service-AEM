import { app } from "./src";

app.post('/subscribe-form', (req, res) => {
    console.log(req.body);
    res.status(200).json({ success: `Person with name ${req.body.firstName} ${req.body.lastName} was successfully subscribed to newsletter via NodeJS`}).send()
})

app.post('/contact-form', (req, res) => {
    console.log(req.body);
    res.status(200).json({ success: `Email was send with the information on the contact form. You will receive a update on your email ${req.body.email}`}).send()
})

app.post('/test-form', (req, res) => {
    console.log(req.body);
    res.status(200).json({ success: `Person with name ${req.body.firstName} ${req.body.lastName} was successfully Tested via NodeJS`}).send()
})