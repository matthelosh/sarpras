const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const login = async(req,res) => {
    try {
    const {username, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    })
    bcrypt.compare(password, user.password)
        .then((result) => {
            result ? jwt.sign({user:user}, process.env.SECRET_KEY, (err,token) => {
                user.token = token
                res.json({user})
            }) : res.status(401).json({ message: "Login gagal. Data Anda tidak valid."})
        })
    } catch (error) {
        res.status(400).json({message: "Ada kesalahan teknis.", error: error.message});
    }
}


module.exports = { login }