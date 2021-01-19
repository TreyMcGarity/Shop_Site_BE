const db = require('../data/db_config')

class UserModel {
    /* General methods for all user types.
    Gets by different account info and possibly social sites
    */
   
    // userType aids in specifing with database to access

    async getUserByEmail(email, userType = 'patron') {
        try {
          const user = await db(userType)
            .where('email', email.toLowerCase())
            .first();
          return user;
        } catch (error) {
          throw error;
        }
      }
    
      async getUserByPhone(number, userType = 'patron') {
        try {
          const user = await db(userType).where('phone', number).first();
          return user;
        } catch (error) {
          throw error;
        }
      }
    
      async getUserById(id, userType = 'patron') {
        try {
          if (userType === 'patron') {
            return await db
              .select('*')
              .from('patron')
              .where('patron.id', id)
              .then((data) => {
                info = data;
                return data;
              })
          }
          return await db(userType).where({ id }).first();
        } catch (error) {
          throw error;
        }
    }
}

module.exports = new UserModel()