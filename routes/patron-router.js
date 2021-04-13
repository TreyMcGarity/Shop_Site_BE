const router = require("express").Router()
const patron_db = require('../models/patron-model')


/* Get Patron routes */
router.get('/', async (req, res, next) => {
    try {
        const patrons = await patron_db.getAllPatrons()

        if(!patrons.length) res.status(404).json('No patrons found')
          res.status(200).json({...patrons})
    } catch(error) {
        throw error
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const patron = await patron_db.getPatronByID(req.params.id)

        if(!patron.id) return res.status(404).json('No patron found')
          res.status(200).json(patron)
    } catch(error) {
        throw error
    }
})

/* Edit Patron routes */
router.put('/:id', async (req, res, next) => {
    try {
      const changes = req.body;

      res.json(await patron_db.updatePatron(req.params.id, changes));
    } catch (error) {
      throw error
    }
  })

  router.delete('/:id', async (req, res, next) => {
    try {
      await patron_db.deletePatron(req.params.id);
      // req.session.destroy();
      return res
        // .clearCookie('token')
        .json({ message: 'Vendor account deleted successfully.' });
    } catch (error) {
      throw error
    }
  })

module.exports = router;