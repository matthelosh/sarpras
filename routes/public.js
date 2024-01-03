const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { login } = require('./../controllers/auth');

const prisma = new PrismaClient();

router.get('/', (req,res) => {
    res.send("Selamat Datang di Sistem Sarpras SD Negeri 1 Bedalisodo");
});

router.get('/users', async(req, res) => {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
});

router.post('/login', login);



module.exports = router;
