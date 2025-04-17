const galleryService = require("../../../services/galleries/gallery.service");
const response = require("../../../utils/response");

class GalleryController {
  async getAllGallery(req, res) {
    try {
      const gallery = await galleryService.getAllGallery();
      return response.success(res, "All gallery fetched", gallery);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getGalleryById(req, res) {
    try {
      const gallery = await galleryService.getGalleryById(req.params.id);
      return response.success(res, "Gallery fetched", gallery);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async getGalleryByCategory(req, res) {
    try {
      const slug = req.query.category;
  
      const galleries = await galleryService.getGalleryByCategory(slug);
      return response.success(res, "Gallery fetched", galleries);
    } catch (error) {
      return response.error(res, error.message);
    }
  }
  

  async createGallery(req, res) {
    try {
      const gallery = await galleryService.createGallery(req.body);
      return response.created(res, "Gallery created", gallery);
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async updateGallery(req, res) {
    try {
      await galleryService.updateGallery(req.params.id, req.body);
      return response.success(res, "Gallery updated successfully");
    } catch (error) {
      return response.error(res, error.message, 400);
    }
  }

  async deleteGallery(req, res) {
    try {
      await galleryService.deleteGallery(req.params.id);
      return response.success(res, "Gallery deleted successfully");
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }
}

module.exports = new GalleryController();