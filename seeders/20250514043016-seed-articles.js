'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('articles', [
      {
        title: 'Tips Umrah Pertama Kali',
        slug: 'tips-umrah-pertama-kali',
        content: 'Berikut adalah tips menjalani ibadah umrah pertama kali...',
        thumbnail_url: 'https://example.com/img/umrah1.jpg',
        category_id: 2, // Tips Ibadah
        author_id: 1,   // Sesuaikan dengan user.id kamu
        is_published: true,
        published_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Berita Terbaru Keberangkatan Umrah',
        slug: 'berita-terbaru-keberangkatan-umrah',
        content: 'Pemerintah Arab Saudi mengumumkan update keberangkatan umrah...',
        thumbnail_url: 'https://example.com/img/umrah2.jpg',
        category_id: 1, // Berita Umrah
        author_id: 1,
        is_published: true,
        published_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Doa Mustajab Saat Umrah',
        slug: 'doa-mustajab-saat-umrah',
        content: 'Berikut beberapa doa mustajab yang bisa dibaca saat thawaf dan sai...',
        thumbnail_url: 'https://example.com/img/umrah3.jpg',
        category_id: 2,
        author_id: 1,
        is_published: true,
        published_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
