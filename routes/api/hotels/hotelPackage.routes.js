const express = require('express');
const hotelPackageController = require('../../../controllers/api/hotels/hotelPackage.controller');
const { injectUser } = require('../../../middleware');
const router = express.Router();

router.get("/", hotelPackageController.getAllHotelPackages);
router.get("/datatables", injectUser, hotelPackageController.getAllHotelPackageDatatables);
router.get("/:id", hotelPackageController.getHotelPackageById);
router.post("/", injectUser, hotelPackageController.createHotelPackage);
router.put("/:id", injectUser, hotelPackageController.updateHotelPackage);
router.delete("/:id", injectUser, hotelPackageController.deleteHotelPackage);

module.exports = router;