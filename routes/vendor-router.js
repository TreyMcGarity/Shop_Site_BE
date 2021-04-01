const router = require("express").Router()
const vendor_db = require('../models/vendor-model')


/* Create Vendor route */
router.post('/', async (req, res, next) => {
  try {

  } catch(err) {
    throw err
  }
})

/* Get Vendor routes */
router.get('/', async (req, res, next) => {
  try {
    const vendors = await vendor_db.getAllVendors()

    if(!vendors.length) res.status(404).json('No vendors found')
      res.status(200).json({...vendors})
  } catch(err) {
    throw err
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.id
    const vendor = await vendor_db.getVendorByID(id)

    if(!vendor.id) return res.status(404).json('No items found')
      res.status(200).json(vendor)
  } catch(err) {
    throw err
  }
})

/* Edit Vendor routes */
router.put('/:id', async (req, res, next) => {
  try {
    const changes = req.body;
    
    res.json(await vendor_db.updateVendor(req.params.id, changes));
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await vendor_db.deleteVendor(req.params.id);
    req.session.destroy();
    return res
      .clearCookie('token')
      .json({ message: 'Vendor account deleted successfully.' });
  } catch (error) {
    next(error);
  }
})

module.exports = router;