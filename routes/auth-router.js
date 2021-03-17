const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const vendor_db = require('../models/vendor-model')
const patron_db = require('../models/patron-model')
const httpError = require("http-errors");

router.post('/register', async (req, res, next) => {
	try {
        // grab from request
        const { user_type } = req.query;
        const userEmail = await patron_db.getUserByEmail(req.body.email, user_type);
        const userPhone = await patron_db.getUserByPhone(req.body.phone, user_type);
        const hashedPassword = await bcrypt.hash(req.body.password, 14);
        
        // check if data is tied to account already
        if (userEmail) return res.status(409).json('There is an account with this email already');
        if (userPhone) return res.status(409).json('There is an account with this number already');
        
        // depending on user_type add to that database
        switch (user_type) {
            case 'client':
                await patron_db.addPatron({
                    ...req.body,
                    password: hashedPassword
                })
            case 'vendor':
                await vendor_db.addVendor({
                    ...req.body,
                    password: hashedPassword
                })
                return res,json('success');
            default:
                throw new httpError(400, "invalid user_type attribute cannot process request")
        }
	} catch(err) {
		next(err)
	}
})

router.post('/login', async (req, res, next) => {
	try {
        // grab from request
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
        const passwordValid = await bcrypt.compare(password, user.password)
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        // check if input valid
		if (!user) {
			return res.status(401).json({ message: "Invalid user" })
		}	
		if (!passwordValid) {
			return res.status(401).json({ message: "Invalid password" })
		}
		res.status(200).cookie("token", token)
            .json({ message: `Welcome ${user.username}`, token: token })
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

module.exports = router;