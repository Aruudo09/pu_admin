const UmrahPackageRepository = require('../repositories/umrahPackage.repository');

class UmrahPackageService {
  async getAllUmrahPackages() {
    const umrahPackages = await UmrahPackageRepository.getAllPackages();
    return umrahPackages || [];
  }

  async getUmrahPackageById(id) {
    try {
      const umrahPackage = await UmrahPackageRepository.getPackageById(id);
      return umrahPackage || [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUmrahPackage(umrahPackageData) {
    try {
      const requiredFields = ["name", "travel_agency_id", "package_type", "price", "duration_days", "description"];
      
      if (!requiredFields.every(field => umrahPackageData[field])) {
        throw new Error("Semua field wajib diisi"); // Validasi input
      }

      return await UmrahPackageRepository.createPackage(umrahPackageData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUmrahPackage(id, umrahPackageData) {
    try {
      const umrahPackage = await UmrahPackageRepository.getPackageById(id);
      if (!umrahPackage) {
        throw new Error("Umrah package not found");
      }
      await UmrahPackageRepository.updatePackage(id, umrahPackageData);
      return { message: "Umrah package updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUmrahPackage(id) {
    try {
      const umrahPackage = await UmrahPackageRepository.getPackageById(id);
      if (!umrahPackage) {
        throw new Error("Umrah package not found");
      }
      await UmrahPackageRepository.deletePackage(id);
      return { message: "Umrah package deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UmrahPackageService();