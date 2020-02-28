const {Router} = require('express');
const config = require("config");
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

const router = Router();
const SALT = config.get('salt');

//prefix /api/auth
router.post(
    '/register',
    [
        check('email', 'Invalid e-mail...').isEmail(),
        check('password', 'Invalid password, minimum password length must be at least 6 characters')
            .isLength({ min: 6 })
    ],
    async (request, response) => {  //route /api/auth/register
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(462).json({
                errors: errors.array(),
                message: 'Incorrect data during registration.'
            });
        }

        const {email, password} = request.body;
        const candidate = await User.findOne({
            email: email
        });

        if (candidate) {
            return response.status(460).json({message: `Such user exists`});
        }

        const hashedPassword = await bcrypt.hash(password, SALT);
        const user = new Usere({
            email: email,
            password: hashedPassword,
            name: name
        });

        await user.save();

        response.status(201).json({message: `User ${user.name} is created.`});
    } catch (e) {
        res.status(500).json({message: `Something  went wrong when registration, try it again.`})
    }
});

router.post('/login', async (request, response) => {  //route /api/auth/login

});

module.exports = router;