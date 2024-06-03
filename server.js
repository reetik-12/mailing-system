const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // For loading environment variables

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,       // Use environment variables for security
        pass: process.env.EMAIL_PASS   // Use environment variables for security
    }
});

app.post('/send-emails', (req, res) => {
    const { subject, message, emails } = req.body;

    if (subject && message && emails && Array.isArray(emails) && emails.length > 0) {
        const mailOptions = {
            from: process.env.EMAIL,
            to: emails,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending emails: ' + error.message });
            }
            res.json({ message: 'Emails sent successfully!' });
        });
    } else {
        res.status(400).json({ message: 'Please provide subject, message, and valid emails.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
