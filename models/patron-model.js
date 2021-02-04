const db = require('../data/db_config');
const { getUserById } = require('./user-model');
const UserModel = require('./user-model');

class PatronModel extends UserModel {
    /* Shopper's side of the Website:
    Patron's have accounts to save and purcahse items from website. 
    */
   
    async getPatrons() {
        try {
            const patron = await db('patron')
                .where('patron', patron)
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
            return await db
            .then(() => {
                return data
            }) 
        } catch (error) {
            throw error;
        }
    }

    async updatePatron(id, data) {
        try {
            const patron = await getUserById(id, 'patron')
            .then(() => {
                return patron
            })
        } catch (error) {
            throw error;
        }
    }

    // deletePatron(id)
}

module.exports = new PatronModel();