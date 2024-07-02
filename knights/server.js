const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files (HTML, CSS, JS)
app.use(express.static('public'));

// Email sending route
app.post('/send-email', (req, res) => {
    const { name, age, intentions, reason } = req.body;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eliascdaher@gmail.com', // Your Gmail address
            pass: 'elIas2130*'   // Your Gmail password (or App Password if 2FA is enabled)
        }
    });

    const mailOptions = {
        from: 'tteenneerr1@gmail.com',
        to: 'eliascdaher@gmail.com',      // Email address to receive submissions
        subject: 'New Knight Application',
        text: `Name: ${name}\nAge: ${age}\nIntentions: ${intentions}\nReason: ${reason}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Failed to send email:', error);
            return res.status(500).json({ message: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.json({ message: 'Application submitted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
