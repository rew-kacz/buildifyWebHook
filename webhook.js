const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', JSON.stringify(req.body, null, 2));
    res.status(200).send('Webhook received');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Webhook listener running on port ${PORT}`);
});
