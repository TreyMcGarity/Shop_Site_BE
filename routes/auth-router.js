const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const user_db = require('../models/user-model');
const vendor_db = require('../models/vendor-model')
const patron_db = require('../models/patron-model')
const httpError = require("http-errors");

router.post('/register', async (req, res, next) => {
	try {
        // grab from request
        const { user_type } = req.query;

        // db variable has a scope issue due to if statement
        if (user_type === 'patron') {
            db = patron_db
        }
        if (user_type === 'vendor') {
            db = vendor_db
        }
        // const type_db = `${user_type}_db`; // not reccognizing the actual db call

        const userName = await type_db.getByUsername(req.body.username, user_type);
        const userEmail = await type_db.getUserByEmail(req.body.email, user_type);
        const userPhone = await type_db.getUserByPhone(req.body.phone, user_type);
        const hashedPassword = await bcrypt.hash(req.body.password, 14);


        console.log( "\n body:", req.body )
        // check if data is tied to account already
        if (userName) return res.status(409).json('There is an account with this username already');
        if (userEmail) return res.status(409).json('There is an account with this email already');
        if (userPhone) return res.status(409).json('There is an account with this number already');
        
        // depending on user_type add to that database
        switch (user_type) {
            case 'patron':
                await patron_db.addPatron({
                    ...req.body,
                    password: hashedPassword
                });
                return res.json('success');
            case 'vendor':
                await vendor_db.addVendor({
                    ...req.body,
                    password: hashedPassword
                });
                return res.json('success');
            default:
                throw new httpError(400, "invalid attribute(s) cannot process request")
        }
	} catch(err) {
		next(err)
	}
})

router.post('/login', async (req, res, next) => {
	try {
        // grab from request
		const { username, password } = req.body
		const user = await patron_db.findBy({ username }).first()
        const passwordValid = await bcrypt.compare(password, user.password)
        const token = patron_db.generateToken(user);
        // check if input valid
		if (!user) {
			return res.status(401).json({ message: "User doesnt exsist yet, please register user" })
		}	
		if (!passwordValid) {
			return res.status(401).json({ message: "Invalid password" })
		}
		res.status(200)
            .json({ message: `Welcome ${user.username}`, token })
	} catch(err) {
		next(err)
	}
})

router.post('/logout', async (req, res, next) => {
	try {
		req.session.destroy();
		return res.json("Logged out successfully.");
	} catch (error) {
		next(error);
	}
})

router.get('/verify_session', (req, res) => res.status(200).json('Verified'));

module.exports = router;