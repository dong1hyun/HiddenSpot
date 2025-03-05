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
        res.status(500).json(error);
    }
});


const data = [
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    },
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    },
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    },
    {
        title: "진짜 여기 나밖에 모름",
        ratio: '3명',
        image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA1MjVfMTMw%2FMDAxNDk1Njk3MDgwMjI0._OyCzF4hzg9au0w5-c5Wss0hnYj6io4-kVo_opd56m4g.3arIIqmsVkXRYe6PLKatbDx5zmDULSVRfZj4d0DnBuAg.JPEG.kooheyjin%2FP20150714_072145000_BF54D5E4-AE0D-4B93-BE2B-AD76DAA2FAB6.JPG&type=ff332_332"
    }
]

router.get('/', async (req, res) => {
    try {
        res.status(201).json(data);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "장소를 불러오는데 실패했습니다."});
    }
});

module.exports = router;