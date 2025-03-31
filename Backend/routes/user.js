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
        const {nickName} = req.query;

        const existingUser = await db.User.findFirst({
            where: {
                nickName
            }
        });

        const nickNameExist = existingUser?.nickName === nickName;
        return res.status(200).json({
            nickNameExist
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "유저 생성 실패" });
    }
});

router.put('/:email', async (req, res) => {
    try {
        const data = req.body;
        const {email} = req.params;
        const updatedUer = await db.User.update({
            where: {
                email
            },
            data
        });
        res.status(200).json(updatedUer);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "유저 정보 수정 실패"});
    }
});

router.get(`/:nickName`, async (req, res) => {
    try {
        const {nickName} = req.params;
        const user = await db.User.findUnique({
            where: {
                nickName
            }
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "유저 정보 조회 실패" });
    }
});

module.exports = router;