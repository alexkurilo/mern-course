const {Router} = require('express');
const config = require("config");
const shortId = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post(
    '/generate',
    auth,
    async (request, response) => {
        console.log('generate');
        try {
            const baseUrl = config.get('baseUrl');

            const {from} = request.body;

            const code = shortId.generate();

            const existing = await Link.findOne({ from });
            if (existing) {
                return response.json({ link: existing });
            }

            const to = `${baseUrl}/t/${code}`;

            const link = new Link({
                code,
                from,
                to,
                owner: request.user.userId,
            });

            await link.save();

            response.status(201).json({
                message: `Link is created.`,
                link,
            });
        } catch (e) {
            response.status(500).json({message: `Something went wrong when creating link, try it again.`});
        }
    }
);

router.get(
    '/',
    auth,
    async (request, response) => {
    try {
        const links = await Link.find({ owner: request.user.userId });
        response.json(links);

    } catch (e) {
        response.status(500).json({message: `Something went wrong when request links, try it again.`});
    }
});

router.get(
    '/:id',
    auth,
    async (request, response) => {
    try {
        const link = await Link.findById(request.params.id);
        response.json(link);
    } catch (e) {
        response.status(500).json({message: `Something went wrong when request this link, try it again.`});
    }
});

module.exports = router;