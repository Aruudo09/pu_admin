const { GalleryCategory } = require("../../models");

class GalleryCategoryRepository {
    async getAllGalleryCategory() {
        return await GalleryCategory.findAll();
    }

    async getGalleryCategoryById(id) {
        return await GalleryCategory.findByPk(id);
    }

    async createGalleryCategory(galleryCategoryData) {
        return await GalleryCategory.create(galleryCategoryData);
    }

    async updateGalleryCategory(id, galleryCategoryData) {
        return await GalleryCategory.update(galleryCategoryData, { where : {id} });
    }

    async deleteGalleryCategory(id) {
        return await GalleryCategory.destroy({ where : {id} });
    }
}

module.exports = new GalleryCategoryRepository();