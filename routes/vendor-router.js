const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const user_db = require('../models/user-model')
const patron_db = require('../models/patron-model')
const vendor_db = require('../models/vendor-model')
const product_db = require('../models/product-model')

router.use('/vendors', vendor_db);

/* Create Product route */
// router.get('/', async (req, res, next) => {
//     try {

//     } catch(err) {
//         throw err
//     }
// })

/* Get Product routes */
router.get('/', async (req, res, next) => {
    try {
        const vendors = await vendor_db.getAllvendors()
        if(!vendors.length) res.status(404).json('No items found')
        res.status(200).json(vendors)
    } catch(err) {
        throw err
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.id
        const product = await product_db.getProductByID(id)
        if(!product.id) return res.status(404).json('No item found')
        res.status(200).json(product)
    } catch(err) {
        throw err
    }
})

/* Edit Product routes */
// router.put('/:id', async (req, res, next) => {
//     try {
//       const changes = req.body;
//       res.json(await coachDB.updateCoachByID(req.params.id, changes));
//     } catch (error) {
//       next(error);
//     }
//   })

//   router.delete('/:id', async (req, res, next) => {
//     try {
//       await coachDB.deleteCoach(req.params.id);
//       req.session.destroy();
//       return res
//         .clearCookie('token')
//         .json({ message: 'Coach Account was deleted. Logged out Successfully.' });
//     } catch (error) {
//       next(error);
//     }
//   })