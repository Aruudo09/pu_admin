'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('article_tags', [
      // Artikel 1 → Tips Umrah Pertama Kali
      { article_id: 1, tag_id: 1 }, // umrah
      { article_id: 1, tag_id: 3 }, // tips-travel

      // Artikel 2 → Berita Umrah
      { article_id: 2, tag_id: 1 }, // umrah
      { article_id: 2, tag_id: 2 }, // haji

      // Artikel 3 → Doa Mustajab
      { article_id: 3, tag_id: 1 }, // umrah
      { article_id: 3, tag_id: 4 }, // doa
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('article_tags', null, {});
  }
};
