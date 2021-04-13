const router = require("express").Router()
const vendor_db = require('../models/vendor-model')


/* Get Vendor routes */
router.get('/', async (req, res, next) => {
  try {
    const vendors = await vendor_db.getAllVendors()

    if(!vendors.length) res.status(404).json('No vendors found')
      res.status(200).json({...vendors})
  } catch(error) {
    throw error
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const vendor = await vendor_db.getVendorByID(req.params.id)

    if(!vendor.id) return res.status(404).json('No vendor found')
      res.status(200).json(vendor)
  } catch(error) {
    throw error
  }
})

/* Edit Vendor routes */
router.put('/:id', async (req, res, next) => {
  try {
    const changes = req.body;
    const updatedVendor = await vendor_db.updateVendor(req.params.id, changes);
    
    res.status(200).json(updatedVendor)
  } catch (error) {
    throw error
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await vendor_db.deleteVendor(req.params.id);
    // req.session.destroy();
    return res
      // .clearCookie('token')
      .json({ message: 'Vendor account deleted successfully.' });
  } catch (error) {
    throw error
  }
})

module.exports = router;