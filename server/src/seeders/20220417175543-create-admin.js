'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          uuid: uuidv4(),
          name: 'Sagar Padiya',
          username: 'sagarpadiya',
          email: 'sagarpadiya7000@gmail.com',
          password: 'Sagar#123',
          confirmed: true,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
