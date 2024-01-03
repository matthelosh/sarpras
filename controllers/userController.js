const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listUsers = async(req, res) => {
    try {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const users = await prisma.user.findMany({
                    where: {
                        NOT: {
                            username: authData.user.username
                        }
                    }
                });
                res.status(200).json({users, authData});
            }
        });
    } catch(err) {
        console.log(err);
        res.json(err.message)
    }
};

const createUser =  async(req,res) => {
    const newUser = req.body;
    bcrypt.hash(newUser.password, 10).then(async (hash) => {
        await prisma.user.create({
            data: {
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                password: hash,
            }
        });
    }).then(user => {
        res.status(200).json({
            message: "User dibuat dengan sukses",
            user
        });
    }).catch(error => {
        res.status(400).json({
            message: "Gagal membuat user",
            error: error.message
        });
    });;

};

module.exports = { listUsers, createUser };