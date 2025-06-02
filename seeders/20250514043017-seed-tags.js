'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [
      {
        name: 'umrah',
        slug: 'umrah',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'haji',
        slug: 'haji',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'tips-travel',
        slug: 'tips-travel',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'doa',
        slug: 'doa',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
