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
    await queryInterface.bulkInsert('galleries', [
      {
        title: 'Umrah',
        image_url: 'images/galeri/galeri1.png',
        description: 'Beautiful landscapes and wildlife',
        category_id: 13,
        created_at: new Date()
      },
      {
        title: 'Umrah plus turki',
        image_url: 'images/galeri/galeri2.png',
        description: 'Stunning architecture and cityscapes',
        category_id: 15,
        created_at: new Date()
      },
      {
        title: 'Haji',
        image_url: 'images/galeri/galeri3.png',
        description: 'Innovative technology and gadgets',
        category_id: 14,
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
    await queryInterface.bulkDelete('galleries', null, {});
  }
};
