'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('article_categories', [
      {
        name: 'Berita Umrah',
        slug: 'berita-umrah',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tips Ibadah',
        slug: 'tips-ibadah',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Travel Umrah',
        slug: 'travel-umrah',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('article_categories', null, {});
  }
};
