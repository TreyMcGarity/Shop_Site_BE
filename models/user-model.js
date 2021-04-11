const db = require('../data/db_config')
const jwt = require('jsonwebtoken');

class UserModel {
    /* General methods for all user types.
    Gets by different account info and possibly social sites
    */
   
    // userType aids in specifing with database to access

    async findBy(filter, userType = 'patron') {
      return db(userType).where(filter);
    }

    async getByUsername(username, userType = 'patron') {
      try {
        const user = await db(userType)
          .where('username', username).first();
        return user;
      } catch (error) {
        throw error;
      }
    }

    async getUserByEmail(email, userType = 'patron') {
        try {
          const user = await db(userType)
            .where('email', email.toLowerCase()).first();
          return user;
        } catch (error) {
          throw error;
        }
      }
    
      async getUserByPhone(number, userType = 'patron') {
        try {
          const user = await db(userType)
            .where('phone', number).first();
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
    
    async getAllUsersByType(user_type) {
      try {
        return await db(user_type).select(
          'id',
          'first_name',
          'last_name',
          'username',
          'password',
          'email',
          'phone',
          'dob',
          'gender',
          'user_type',
          'created_at'
        );
      } catch (error) {
        throw error;
      }
    }
}

module.exports = UserModel;