const express = require("express");
const db = require("../util/db");
const { pageListLimit } = require("../lib/const");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPlace = await db.Place.create({ data });
        res.status(201).json(newPlace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "장소 추가에 실패했습니다." });
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
        res.status(500).json({ error: "장소 정보 수정에 실패했습니다." });
    }
});

router.get('/', async (req, res) => {
    try {
        const { page, tags } = req.query;
        const selectedTags = tags ? tags.split(",") : [];
        const places = await db.Place.findMany({
            where: selectedTags.length > 0 ? {
                tags: {
                    hasSome: selectedTags
                }
            } : {},
            skip: (page - 1) * pageListLimit,
            take: pageListLimit,
            orderBy: {
                created_at: 'desc',
            },
            include: {
                likedBy: true,
                user: {
                    select: {
                        nickName: true
                    }
                }
            }
        });

        const newPlaces = places.map((place) => {
            const likeCount = place.likedBy.length;
            delete place.likedBy;
            return ({
                ...place,
                likeCount
            });
        });

        res.status(200).json(newPlaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "장소를 불러오는데 실패했습니다." });
    }
});

router.get('/recommendation', async (req, res) => {
    try {
        const places = await db.place.findMany({
            include: {
                _count: {
                    select: { likedBy: true }
                }
            },
            orderBy: {
                likedBy: {
                    _count: 'desc'
                }
            },
            take: 10
        });
        res.status(200).json(places);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "마커를 불러오는데 실패했습니다." });
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
        res.status(200).json(places);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "마커를 불러오는데 실패했습니다." });
    }
});

router.get("/favorite", async (req, res) => {
    try {
        const { userEmail, page } = req.query;
        const response = await db.Favorite.findMany({
            where: { userEmail },
            skip: (page - 1) * pageListLimit,
            take: pageListLimit,
            include: {
                place: {
                    include: {
                        likedBy: true,
                        user: {
                            select: {
                                nickName: true
                            }
                        }
                    }
                }
            },
        });
        const favoritePlaces = response.map((favorite) => favorite.place);
        const newPlaces = favoritePlaces.map((place) => {
            const likeCount = place.likedBy.length;
            delete place.likedBy;
            return ({
                ...place,
                likeCount
            });
        });
        res.status(200).json(newPlaces);
    } catch (error) {
        console.error(error);
    }
});

router.get("/myPosts", async (req, res) => {
    try {
        const { nickName, page } = req.query;
        const response = await db.Place.findMany({
            where: {
                user: {
                    nickName
                }
            },
            skip: (page - 1) * pageListLimit,
            take: pageListLimit,
            include: {
                likedBy: true,
                user: {
                    select: {
                        nickName: true
                    }
                }
            }
        });

        const places = response.map((place) => {
            const likeCount = place.likedBy.length;
            delete place.likedBy;
            return ({
                ...place,
                likeCount
            });
        });
        res.status(200).json(places);
    } catch (error) {
        console.error(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const userEmail = req.query.email;
        const place = await db.Place.findUnique({
            where: {
                id
            },
            include: {
                favoritedBy: true,
                likedBy: true,
                user: {
                    select: {
                        nickName: true,
                        profileImageUrl: true,
                    }
                }
            }
        });

        const isFavorited = place?.favoritedBy.some(fav => fav.userEmail === userEmail);
        const isLiked = place?.likedBy.some(like => like.userEmail === userEmail);

        const favoriteCount = place.favoritedBy.length || 0;
        const likeCount = place.likedBy.length || 0;

        delete place.favoritedBy;
        delete place.likedBy;
        res.status(200).json({
            ...place,
            isFavorited,
            isLiked,
            favoriteCount,
            likeCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "세부정보를 불러오는데 실패했습니다." });
    }
});

router.delete(`/favorite`, async (req, res) => {
    try {
        const { userEmail, placeId } = req.query;
        const response = await db.Favorite.delete({
            where: {
                userEmail_placeId: {
                    userEmail: userEmail,
                    placeId: Number(placeId),
                },
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "즐겨찾기 삭제에 실패했습니다." });
    }
});

router.delete(`/like`, async (req, res) => {
    try {
        const { userEmail, placeId } = req.query;
        const response = await db.Like.delete({
            where: {
                userEmail_placeId: {
                    userEmail: userEmail,
                    placeId: Number(placeId),
                },
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "좋아요 삭제에 실패했습니다." });
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
        res.status(500).json({ error: "장소 삭제에 실패했습니다." });
    }
});

router.post(`/favorite`, async (req, res) => {
    try {
        const { userEmail, placeId } = req.body;
        const response = await db.Favorite.create({
            data: {
                userEmail,
                placeId
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "즐겨찾기에 실패했습니다." });
    }
});

router.post(`/like`, async (req, res) => {
    try {
        const { userEmail, placeId } = req.body;
        const response = await db.Like.create({
            data: {
                userEmail,
                placeId
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "즐겨찾기에 실패했습니다." });
    }
});

module.exports = router;