const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Email configuration
const emailAddress = process.argv[2]; // Inbound messages are sent to this address.
if (!emailAddress) {
    console.error('Please provide an email address as a command line argument.');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', JSON.stringify(req.body, null, 2));

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: emailAddress,
        subject: 'Webhook Data -- ' + new Date().toLocaleString(),
        text: JSON.stringify(req.body, null, 2)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Webhook received and email sent');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Webhook listener running on port ${PORT}`);
});
