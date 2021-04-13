const db = require('../data/db_config');
const UserModel = require('./user-model');

class VendorModel extends UserModel {
    /* Owner side of Website:
    Owners have accounts and add products to Vendor side of App.
    */

    async getAllVendors() {
        try {
            return await this.getAllUsersByType('vendor');
        } catch (error) {
            throw error;
        }
    } 

    async getVendorByID(id) {
        try {
            const product = await db('vendor')
                .where({id: id})
                .first()
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addVendor(data) {
        try {
            await db('vendor').insert({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email.toLowerCase(),
                phone: data.phone,
                dob: data.dob,
                username: data.username,
                password: data.password,
                gender: data.gender
            })
        } catch (error) {
            throw error;
        }
    }

    async updateVendor(id, updatedData) {
        try{
            await db('vendor')
                .where({id: id})
                .update(updatedData)
                .then(data => data);
    } catch(error){
            throw error;
        }
    }

    async deleteVendor(id){
        try{
            return await db('vendor')
                        .where({id})
                        .del();
        } catch(error){
            throw error;
        }
    }
}

module.exports = new VendorModel();