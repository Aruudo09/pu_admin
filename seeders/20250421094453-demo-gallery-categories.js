'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('gallery_categories', [
      {
        name: 'Nature',
        slug: 'nature',
        created_at: new Date()
      },
      {
        name: 'Technology',
        slug: 'technology',
        created_at: new Date()
      },
      {
        name: 'Art',
        slug: 'art',
        created_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('gallery_categories', null, {});
  }
};
