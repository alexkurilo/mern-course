const {Router} = require('express');
const config = require("config");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/UserModel');

const router = Router();
const SALT = config.get('salt');
const JWT_SECRET = config.get('jwtSecret');

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
            // console.log(request.body);
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

            const user = new User({
                email: email,
                password: hashedPassword,
            });

            await user.save();

            response.status(201).json({message: `User is created.`});
        } catch (e) {
            response.status(500).json({message: `Something went wrong when registration, try it again.`});
        }
    }
);

router.post(
    '/login',
    [
        check('email', 'Enter valid email')
            .normalizeEmail()
            .isEmail(),
        check('password', 'Enter valid password')
            .exists()
    ],
    async (request, response) => {  //route /api/auth/login
        try {
            const {email, password} = request.body;
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(463).json({
                    errors: errors.array(),
                    message: 'Invalid login data.'
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return request.status(464).json({ message: `User with such not found.`});
            }
            const isMatch = await bcrypt.compare(password, user.password);// сравниваю password введенный юзером и хешированный в БД

            if (!isMatch) {
                return response.status(465).json({ message: `Invalid password, try again.`});
            }

            const token = jwt.sign(
                { userId: user.id },
                JWT_SECRET,
                { expiresIn: '1h'}
            );

            response.json({
                token,
                userId: user.id,
                email,
            });

        } catch (e) {
            response.status(500).json({message: `Something went wrong when login, try again.`});
        }
    }
);

module.exports = router;