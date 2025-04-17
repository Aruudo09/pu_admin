const { Model } = require("sequelize");
const { Gallery, GalleryCategory } = require("../../models");

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

    async getGalleryByCategory(slug) {
        const include = {
            model: GalleryCategory,
            as: "category"
        };

        if (slug && slug !== "all") {
            include.where = { slug };
        }

        return await Gallery.findAll({
            include,
        });
    }

    async updateGallery(id, galleryData) {
        return await Gallery.update(galleryData, {where : {id} } );
    }

    async deleteGallery(id) {
        return await Gallery.destroy({ where : {id} });
    }
}

module.exports = new GalleryRepository();