const db = require('../data/db_config');
const UserModel = require('./user-model');

class PatronModel extends UserModel {
    /* Shopper's side of the Website:
    Patron's have accounts to save and purcahse items from website. 
    */
   
    // getPatrons() 

    // getPatronByID(id)

    // addPatron(data)

    // updatePatron(id, data)

    // deletePatron(id)
}

module.exports = new PatronModel();