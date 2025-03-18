const express = require("express");
const db = require("../util/db");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPlace = await db.Place.create({ data });
        res.status(201).json(newPlace);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "장소 추가에 실패했습니다."});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const data = req.body;
        const updatedPlace = await db.Place.update({
            where: {
                id
            },
            data
        });
        res.status(200).json(updatedPlace);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"장소정보 수정에 실패했습니다."});
    }
});

router.get('/', async (req, res) => {
    try {
        const places = await db.Place.findMany({
            orderBy: {
                created_at: 'desc',
            }
        });
        res.status(201).json(places);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "장소를 불러오는데 실패했습니다." });
    }
});

router.get('/marker', async (req, res) => {
    try {
        const { minLat, maxLat, minLng, maxLng } = req.query;
        const minLatitude = +minLat;
        const maxLatitude = +maxLat;
        const minLongitude = +minLng;
        const maxLongitude = +maxLng;
        const places = await db.Place.findMany({
            where: {
                latitude: {
                    gte: minLatitude,
                    lte: maxLatitude,
                },
                longitude: {
                    gte: minLongitude,
                    lte: maxLongitude,
                },
            },
        });
        res.status(201).json(places);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "마커를 불러오는데 실패했습니다." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const place = await db.Place.findUnique({
            where: {
                id
            }
        });
        res.status(200).json(place);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "세부정보를 불러오는데 실패했습니다." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const response = await db.Place.delete({
            where: {
                id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "장소 삭제에 실패했습니다."});
    }
});

module.exports = router;