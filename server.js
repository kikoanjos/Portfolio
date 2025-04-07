require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o motor de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'view')));
app.use(cors());
app.use(bodyParser.json());

// Rota principal
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para envio de email
app.post('/send-email', async (req, res) => {
    const { firstname, lastname, email, phone, service, message } = req.body;

    if (!firstname || !lastname || !email || !phone || !service || !message) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    // Configurar transporte de email
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou outro serviço SMTP
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Configurar email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'rodrigoanjos10@gmail.com',
        subject: `Novo contato de ${firstname} ${lastname}`,
        text: `Nome: ${firstname} ${lastname}\nEmail: ${email}\nTelefone: ${phone}\nServiço: ${service}\nMensagem:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar email.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`App disponível em http://localhost:${PORT}`);
});