const express = require("express");
const db = require("../util/db");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const newUser = await db.Place.create({data});
        res.status(201).json(newUser);
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        res.status(201).json(data);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "장소를 불러오는데 실패했습니다."});
    }
});

module.exports = router;