const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const user_db = require('../models/user-model')
const vendor_db = require('../models/vendor-model')
const patron_db = require('../models/patron-model')
const httpError = require("http-errors")

router.post('/register', async (req, res, next) => {
	try {
        // grab from request
        const { user_type } = req.query;

        // depending on user type check if info user exists with similar info, throw error for duplication
        if (user_type === 'patron') {
            const userName = await patron_db.getByUsername(req.body.username, user_type);
            const userEmail = await patron_db.getUserByEmail(req.body.email, user_type);
            const userPhone = await patron_db.getUserByPhone(req.body.phone, user_type);
       
            if (userName) return res.status(409).json('There is an account with this username already');
            if (userEmail) return res.status(409).json('There is an account account with this email already');
            if (userPhone) return res.status(409).json('There is an account account with this number already');    
        }
        if (user_type === 'vendor') {
            const userName = await vendor_db.getByUsername(req.body.username, user_type);
            const userEmail = await vendor_db.getUserByEmail(req.body.email, user_type);
            const userPhone = await vendor_db.getUserByPhone(req.body.phone, user_type);
       
            if (userName) return res.status(409).json('There is an account with this username already');
            if (userEmail) return res.status(409).json('There is an account with this email already');
            if (userPhone) return res.status(409).json('There is an account with this number already'); 
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 14);

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
        const { username, password } = req.body
		const user = await patron_db.getByUsername(username)
        const passwordValid = await bcrypt.compare(password, user.password)

        if (!user) {return res.status(401).json({ message: "Incorrect username or user doesnt exist and must be created" })}	
		if (!passwordValid) {return res.status(401).json({ message: "Invalid password" })}

        const token = jwt.sign(user, process.env.JWT_SECERET)

        res.status(200).cookie("token",token).json({message:`welcome ${user.username}`, token:token})
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