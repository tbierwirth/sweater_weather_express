'use strict';
const bcrypt = require('bcrypt');
const uuidAPIKey = require('uuid-apikey');


module.exports = {
  up: (queryInterface, Sequelize) => {
    var password = bcrypt.hashSync("p@ssword", 10);
    return queryInterface.bulkInsert('Users', [{
        email: 'test@gmail.com',
        password_digest: password,
        api_key: 'KH5YFF2-7MF4N5P-G2DTVFM-JHRH89B',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
