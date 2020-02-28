const {Router} = require('express');
const router = Router();
//prefix /api/auth

router.post('/register', async (request, response) => {  //route /api/auth/register
    try {
        const {email, password} = request.body;
    } catch (e) {
        res.status(560).json({message: `Something  went wrong when registration, try it again.`})
    }
});

router.post('/login', async (request, response) => {  //route /api/auth/login

});

module.exports = router;