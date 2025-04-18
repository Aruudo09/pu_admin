const express = require("express");
const galleryController = require("../../../controllers/api/galleries/gallery.controller");

const router = express.Router();

// router.get("/", galleryController.getAllGallery);

// Ambil semua gallery (bisa berdasarkan kategori jika ada query ?category=)
router.get("/", galleryController.getGalleryByCategory);

router.get("/:id", galleryController.getGalleryById);
router.post("/", galleryController.createGallery);
router.put("/:id", galleryController.updateGallery);
router.delete("/:id", galleryController.deleteGallery);

module.exports = router;
