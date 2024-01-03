const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./../middleware/verify");
const { listUsers, createUser } = require('./../controllers/userController');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', (req,res) => {
    res.send("Selamat Datang di Sistem Sarpras SD Negeri 1 Bedalisodo");
});

router.get('/users', verifyToken, listUsers);

router.post('/users', verifyToken, createUser);

module.exports = router;
