const {Router} = require('express');
const Link = require('../models/LinkModel');

const router = Router();

router.get('/:code', async (request, response) => {
    try {
        const link = await Link.findOne({ code: request.params.code });

        if (link) {
            link.clicks ++;
            link.save();

            return response.redirect(link.from);
        }

        response.status(404).json('Link is undefined.');
    } catch (e) {
        response.status(500).json({message: `Something went wrong when redirect, try it again.`});
    }
});

module.exports = router;