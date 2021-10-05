const db = require('../data/db_config');

class ProductModel {
    async getAllProducts() {
        try {
          return await db('product').select(
            'id',
            'name',
            'category',
            'details',
            'cost',
            'stock',
            'product_pic_id'
          );
        } catch (error) {
          throw error;
        }
    }

    async getProductsByCategory(category) {
        try {
            return await db('product')
            .where('category', category)
            .select(
                'id',
                'name',
                'category',
                'details',
                'cost',
                'stock',
                'product_pic_id'
            );

        } catch (error) {
            throw error;
        }
    }

    async getProductByID(id) {
        try {
            const product = await db('product')
                .where({id: id})
                .first()
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProductByName(name) {
        try {
            const product = await db('product')
                .where({name: name})
                .first()
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(data) {
        try {
            await db('product').insert({
                name: data.name,
                category: data.category,
                details: data.details,
                cost: data.cost,
                stock: data.stock,
                product_pic_id: data.product_pic_id
            })
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, updatedData) {
        try{
            await db('product')
                .where({id: id})
                .update(updatedData)
                .then(data => data);
    } catch(error){
            throw error;
        }
    }

    async deleteProduct(id){
        try{
            return await db('product')
                        .where({id: id})
                        .del();
        } catch(error){
            throw error;
        }
    }
}

module.exports = new ProductModel();