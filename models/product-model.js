const db = require('../data/db_config');

class ProductModel {
    async getAllProducts() {
        try {
          return await db('product').select(
            'id',
            'name',
            'cost',
            'stock',
            'details',
            'product_pic_id'
          );
        } catch (error) {
          throw error;
        }
    }

    async getProductByID(id) {
        try {
            const product = await db('product')
                .where('id', id)
                .first()
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProductByName(name) {
        try {
            const product = await db('product')
                .where('name', name)
                .first()
            return product;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductModel;