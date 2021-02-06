const db = require('../data/db_config');
const { getUserById } = require('./user-model');
const UserModel = require('./user-model');

class PatronModel extends UserModel {
    /* Shopper's side of the Website:
    Patron's have accounts to save and purcahse items from website. 
    */
   
    async getPatrons() {
        try {
            return await this.getAllUsersByType('patron');
        } catch (error) {
            throw error;
        }
    } 

    async getPatronByID(id) {
        try {
            const patron = await getUserById(id, 'patron')
            .then(() => {
                return patron
            })
        } catch (error) {
            throw error;
        }
    }

    async addPatron(data) {
        try {
            await db('patron').insert({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email.toLowerCase(),
                phone: data.phone,
                dob: data.dob,
                password: data.password,
                gender: data.gender
            })
        } catch (error) {
            throw error;
        }
    }

    async updatePatron(id, updatedData) {
        try{
            await db('patron')
                   .where({id: id})
                   .update(updatedData)
                   .then(data => data);
            return await this.getUserById(id);
    } catch(err){
            throw err;
        }
    }

    async deletePatron(id){
        try{
            return await db('patron')
                         .where({id})
                         .del();
        } catch(err){
            throw(err);
        }
    }
}

module.exports = new PatronModel();