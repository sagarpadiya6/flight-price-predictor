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
          password:
            '$2b$10$OThgRwy40u6X0PN.EDfHxe6CNdRMjMrBxWh0FWPJZriFZVE5c/JNS',
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
