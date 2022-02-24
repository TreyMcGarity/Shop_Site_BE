const db = require('../data/db_config')
const jwt = require('jsonwebtoken');

class UserModel {
    /* General methods for all user types.
    Gets by different account info and possibly social sites
    */
   
    // user_type aids in specifing with database to access

    async getByUsername(username, user_type) {
      try {
        const user = await db(user_type)
          .where('username', username)
          .first();
        return user;
      } catch (error) {
        throw error;
      }
    }

    async getUserByEmail(email, user_type) {
        try {
          const user = await db(user_type)
            .where('email', email.toLowerCase())
            .first();
          return user;
        } catch (error) {
          throw error;
        }
      }
    
      async getUserByPhone(number, user_type) {
        try {
          const user = await db(user_type)
            .where('phone', number)
            .first();
          return user;
        } catch (error) {
          throw error;
        }
      }
    
      async getUserById(id, user_type) {
        try {
          if (user_type === 'patron') {
            return await db
              .select('*')
              .from('patron')
              .where('patron.id', id)
              .then((data) => {
                info = data;
                return data;
              })
          }
          return await db(user_type)
            .where({ id })
            .first();
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

      /* Generate a Token */
    }
}

module.exports = UserModel;