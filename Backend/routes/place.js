const express = require("express");
const db = require("../util/db");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPlace = await db.Place.create({data});
        res.status(201).json(newPlace);
    } catch(error) {
        console.error(error);
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const places = await db.Place.findMany();
        console.log(places)
        res.status(201).json(places);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "장소를 불러오는데 실패했습니다."});
    }
});

module.exports = router;