const express = require('express');
const packageHotelController = require('../../../controllers/api/hotels/packageHotel.controller');
const { injectUser } = require('../../../middleware');
const router = express.Router();

router.get("/", packageHotelController.getAllPackageHotels);
router.get("/:id", packageHotelController.getPackageHotelById);
router.post("/", injectUser, packageHotelController.createPackageHotel);
router.put("/:id", injectUser, packageHotelController.updatePackageHotel);
router.delete("/:id", injectUser, packageHotelController.deletePackageHotel);

module.exports = router;