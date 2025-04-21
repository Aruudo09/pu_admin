const GalleryRepository = require("../../repositories/galleries/gallery.repository");

class Gallery {
    async getAllGallery() {
        const gallery = await GalleryRepository.getAllGallery();
        if (gallery.length === 0) {
            throw new Error("No gallery found");
        }
        return gallery;
    }

    // async getAllGallery(query) {
    //     const { draw, start, length, search, order, columns } = query;
      
    //     const { count, rows } = await GalleryRepository.getPaginatedGalleries({
    //       start: parseInt(start),
    //       length: parseInt(length),
    //       search: search?.value || '',
    //       order,
    //       columns
    //     });
      
    //     return {
    //       draw: parseInt(draw),
    //       recordsTotal: count,
    //       recordsFiltered: count,
    //       data: rows
    //     };
    //   }
      

    async getGalleryById(id) {
        const gallery = await GalleryRepository.getGalleryById(id);
        if (!gallery) {
            throw new Error("Gallery not found");
        }
        return gallery;
    }

    async getGalleryByCategory(slug) {
        const gallery = await GalleryRepository.getGalleryByCategory(slug);
        if (gallery.length === 0) {
            throw new Error("No gallery found");
        }
        return gallery;
    }

    async createGallery(galleryData) {
        const requiredFields = ["title", "image_url", "description", "category_id"];
        if (!requiredFields.every(field => galleryData[field])) {
            throw new Error("Semua field wajib diisi");
        }
        return await GalleryRepository.createGallery(galleryData);
    }

    async updateGallery(id, galleryData) {
        const gallery = await GalleryRepository.getGalleryById(id);
        if (!gallery) {
            throw new Error("Gallery not found");
        }
        return await GalleryRepository.updateGallery(id, galleryData);
    }

    async deleteGallery(id) {
        const gallery = await GalleryRepository.getGalleryById(id);
        if (!gallery) {
            throw new Error("Gallery not found");
        }
        return await GalleryRepository.deleteGallery(id);
    }
}

module.exports = new Gallery();