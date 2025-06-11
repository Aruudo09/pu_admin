const response = require("../../utils/response");
const umrahPackageService = require("../../services/umrahPackage.service");

class UmrahPackageController {
  async getAllUmrahPackages(req, res) {
    try {
      const umrahPackages = await umrahPackageService.getAllUmrahPackages();
      return response.success(res, 'All Umrah packages fetched', umrahPackages);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async getUmrahPackageById(req, res) {
    try {
      const umrahPackage = await umrahPackageService.getUmrahPackageById(req.params.id);
      return response.success(res, 'Umrah package fetched', umrahPackage);
    } catch (error) {
      return response.notFound(res, error.message);
    }
  }

  async createUmrahPackage(req, res) {
    try {
      const umrahPackage = await umrahPackageService.createUmrahPackage(req.body);
      return response.success(res, 'Umrah package created', umrahPackage);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async updateUmrahPackage(req, res) {
    try {
      const updatedUmrahPackage = await umrahPackageService.updateUmrahPackage(req.params.id, req.body);
      return response.success(res, 'Umrah package updated', updatedUmrahPackage);
    } catch (error) {
      return response.error(res, error.message);
    }
  }

  async deleteUmrahPackage(req, res) {
    try {
      await umrahPackageService.deleteUmrahPackage(req.params.id);
      return response.success(res, 'Umrah package deleted');
    } catch (error) {
      return response.error(res, error.message);
    }
  }
}

module.exports = new UmrahPackageController();