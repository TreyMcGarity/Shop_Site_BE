const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const user_db = require('../models/user-model')
const patron_db = require('../models/patron-model')
const vendor_db = require('../models/vendor-model')
const product_db = require('../models/product-model')

/* Get Patron routes */
router.get('/', async (req, res, next) => {
    try {
        const patrons = await patron_db.getAllPatrons()
        if(!patrons.length) res.status(404).json('No patrons found')
        res.status(200).json({...patrons})
    } catch(err) {
        throw err
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.id
        const patron = await patron_db.getpatronByID(id)
        if(!patron.id) return res.status(404).json('No item found')
        res.status(200).json(patron)
    } catch(err) {
        throw err
    }
})

/* Edit Patron routes */
router.put('/:id', async (req, res, next) => {
    try {
      const changes = req.body;
      res.json(await coachDB.updateCoachByID(req.params.id, changes));
    } catch (error) {
      throw err
    }
  })

  router.delete('/:id', async (req, res, next) => {
    try {
      await coachDB.deleteCoach(req.params.id);
      req.session.destroy();
      return res
        .clearCookie('token')
        .json({ message: 'Coach Account was deleted. Logged out Successfully.' });
    } catch (error) {
      throw err
    }
  })

module.exports = router;