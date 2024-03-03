const express = require('express');
const sendMail = require('../services/mailService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MailTemplate = require('../templates/mailTemplate');
const router = express.Router();
const User = require('../models/user');

const userValidationRules = require('../validations/userValidation');
const validateUser = require('../middleware/validateUser');

require('dotenv').config();

router.post('/register', userValidationRules(), validateUser, async (req, res) => {
    try {
        const { username, password, firstname, lastname, email } = req.body;
        const user = new User({ username, password, firstname, lastname, email });
        await user.save();

        const template = new MailTemplate(firstname, lastname, password);
        sendMail(email, 'Hoşgeldiniz', null, template.getTemplate('register'));

        res.status(201).send({
            message: 'Pervin derse geç geldi',
            content: user,
            status: 200
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message,
            content: err
        });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({
                message: 'Kullanıcı adı veya şifre hatalı',
                content: null
            });
        }

        const tokenOptions = {
            expiresIn: '20d', // s saniye, m dakika, h saat, d gün
            // notBefore: '15s', // 15 saniye sonra başlar
            // audience: 'http://localhost:3000', // token hangi sunucuda kullanılacak
            // issuer: 'http://localhost:5001', // token kimin tarafından veriliyor
            // jwtid: 'CodeAcademyTokenId', // token id
            // subject: 'nodejs dersleri için üretilen token, pervinden icaze almadan servisler çalışmaz', // token hangi konuda
            // algorithm: 'HS256' // token hangi algoritmayla şifrelenecek 
        }

        const token = jwt.sign({
            userId: user._id  //,
            // role: 'admin',
            // manager: 'pervin',
            // movzu: 'node.js',
            // date: 'eski date',
            // group:'RADFE203' 
        }, process.env.SECRET_KEY, tokenOptions);
        res.status(200).send({
            message: 'Giriş başarılı',
            content: { token }
        });
    }
    catch (err) {
        res.status(400).send({
            message: err.message,
            content: err
        });
    }
});
module.exports = router;