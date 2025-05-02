'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('gallery_categories', [
      {
        name: 'Umrah',
        slug: 'umrah',
        created_at: new Date()
      },
      {
        name: 'Haji',
        slug: 'haji',
        created_at: new Date()
      },
      {
        name: 'Umrah plus tour',
        slug: 'umrah-plus-tour',
        created_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('gallery_categories', null, {});
  }
};
