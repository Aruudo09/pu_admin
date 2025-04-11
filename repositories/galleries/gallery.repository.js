const { Gallery } = require("../../models");

class GalleryRepository {
    async getAllGallery() {
        return await Gallery.findAll();
    }

    async getGalleryById(id) {
        return await Gallery.findByPk(id);
    }

    async createGallery(galleryData) {
        return await Gallery.create(galleryData);
    }

    async updateGallery(id, galleryData) {
        return await Gallery.update(galleryData, {where : {id} } );
    }

    async deleteGallery(id) {
        return await Gallery.destroy({ where : {id} });
    }
}

module.exports = new GalleryRepository();