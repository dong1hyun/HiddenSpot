const express = require("express");
const db = require("../util/db");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, nickName, interests } = req.body;
        const newUser = await db.User.create({
            data: {
                email,
                nickName,
                interests
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "유저 생성 실패" });
    }
});

router.get('/check', async (req, res) => {
    try {
        const {email, nickName} = req.query;

        const existingUser = await db.User.findFirst({
            where: {
                OR: [{ email }, { nickName }]
            }
        });

        const emailExist = existingUser?.email === email;
        const nickNameExist = existingUser?.nickName === nickName;
        return res.status(200).json({
            emailExist,
            nickNameExist
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "유저 생성 실패" });
    }
});

module.exports = router;