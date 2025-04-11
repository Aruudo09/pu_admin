const GalleryCategoryRepository = require("../../repositories/galleries/galleryCategory.repository");

class GalleryCategory {
    async getAllGalleryCategory() {
        const galleryCategory = await GalleryCategoryRepository.getAllGalleryCategory();
        if (galleryCategory.length === 0) {
            throw new Error("No gallery Category found");
        }
        return galleryCategory;
    }

    async getGalleryCategoryById(id) {
        const galleryCategory = await GalleryCategoryRepository.getGalleryCategoryById(id);
        if (!galleryCategory) {
            throw new Error("Gallery Category not found");
        }
        return galleryCategory;
    }

    async createGalleryCategory(galleryData) {
        const requiredFields = ["name", "slug"];
        if (!requiredFields.every(field => galleryData[field])) {
            throw new Error("Semua field wajib diisi");
        }
        return await GalleryCategoryRepository.createGalleryCategory(galleryData);
    }

    async updateGalleryCategory(id, galleryData) {
        const galleryCategory = await GalleryCategoryRepository.getGalleryCategoryById(id);
        if (!galleryCategory) {
            throw new Error("Gallery Category not found");
        }
        return await GalleryCategoryRepository.updateGalleryCategory(id, galleryData);
    }

    async deleteGalleryCategory(id) {
        const galleryCategory = await GalleryCategoryRepository.getGalleryCategoryById(id);
        if (!galleryCategory) {
            throw new Error("Gallery Category not found");
        }
        return await GalleryCategoryRepository.deleteGalleryCategory(id);
    }
}

module.exports = new GalleryCategory();