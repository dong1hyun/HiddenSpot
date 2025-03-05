const express = require("express");
const db = require("../util/db");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {email, nickName} = req.body;
        const newUser = await db.User.create({
            data: {
                email,
                nickName,
            },
        });
        res.status(201).json(newUser);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "유저 생성 실패"});
    }
});

module.exports = router;