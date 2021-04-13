const router = require("express").Router()
const product_db = require('../models/product-model')


/* Create Product route */
router.post('/', async (req, res, next) => {
  try {
    const product = {...req.body}
    if (!product.name) res.status(201).json(`creation success, but name found. product id: ${product.id}`)
    await product_db.addProduct(product)
    return res.json('item listed!')
} catch(error) {
    throw error
}
})

/* Get Product routes */
router.get('/', async (req, res, next) => {
  try {
    const products = await product_db.getAllProducts()

    if(!products.length) res.status(404).json('No items found')
      res.status(200).json({...products})
  } catch(error) {
    throw error
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await product_db.getProductByID(req.params.id)

    if(!product.id) res.status(404).json('No item found')
      res.status(200).json(product)
  } catch(error) {
    throw error
  }
})

/* Edit Product routes */
router.put('/:id', async (req, res, next) => {
  try {
    const changes = {...req.body}
    const updatedProduct = await product_db.updateProduct(req.params.id, changes)
    
    res.status(200).json(updatedProduct)
  } catch (error) {
    throw error;
  }
})

 router.delete('/:id', async (req, res, next) => {
    try {
      await product_db.deleteProduct(req.params.id);
      return res
      .json({ message: 'Product was deleted' });
  } catch (error) {
    throw error;
  }
})

module.exports = router;