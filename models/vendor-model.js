const db = require('../data/db_config');
const UserModel = require('./user-model');

class VendorModel extends UserModel {
    /* Owner side of Website:
    Owners have accounts and add products to Patron side of App.
    */

    // getVendors() 

    // getVendorByID(id)

    // addVendor(data)

    // updateVendor(is, data)

    // deleteVendor(id)
}

module.exports = new VendorModel();