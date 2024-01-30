import nodemailer from 'nodemailer'
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.KEY
    }
})

transporter.verify().then(console.log).catch(console.error);

export const sendContactForm = (req, res) => {
    sendToRequester(req.body, res);
    sendToCustomerService(req.body);
    res.status(200).json({ success: `Email was send with the information on the contact form. You will receive a update on your email ${req.body.email}`}).send()
}

const sendToRequester =  async (payloadForm, res) => {
    await transporter.sendMail({
        from: 'Inetum - Realdolmen', 
        to: payloadForm.email,
        subject: `${payloadForm.nom}, Thank you for filling in our contact form -  Inetum - Realdolmen`,
        text: "Hello world?",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission Received</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                h1 {
                    color: #333;
                }
        
                p {
                    color: #555;
                }
        
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #888;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h1>Contact Form Submission Received</h1>
                <p>Dear ${payloadForm.nom},</p>
                <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>
                <p>We appreciate your interest and look forward to assisting you.</p>
                <div class="footer">
                    <p>Best regards,<br>Inetum - Realdolmen</p>
                </div>
            </div>
        </body>
        </html>`
    }, (error) => {
        if(error) {
            res.status(error.status).send(error.message);
        }
    })
}

const sendToCustomerService = async (payloadForm, res) => {
    let value, tr = '';
    for (value in payloadForm) {
        tr += '<tr><td>' + value + '</td><td>' + payloadForm[value] + '<td></tr>';
    }
    await transporter.sendMail({
        from: `${payloadForm.prenom} ${payloadForm.nom}`, 
        to: process.env.EMAIL,
        subject: `Contact form filled in by ${payloadForm.prenom} ${payloadForm.nom}`,
        text: "Hello world?",
        html:  `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin-top: 20px;
                }
        
                table, th, td {
                    border: 1px solid #ddd;
                }
        
                th, td {
                    padding: 12px;
                    text-align: left;
                }
        
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Contact Form Submission</h2>
            <table>
                ${tr}
            </table>
        </body>
        </html>
        `
    }, (error) => {
        if(error) {
            res.status(error.status).send(error.message);
        }
    })
}