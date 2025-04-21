const { Model } = require("sequelize");
const { Gallery, GalleryCategory } = require("../../models");

class GalleryRepository {
    async getAllGallery() {
        return await Gallery.findAll();
    }

    async getPaginatedGalleries({ start, length, search, order, columns }) {
        const where = search
          ? {
              [Op.or]: [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
              ]
            }
          : {};
      
        const sort = order && order.length > 0
          ? [[columns[order[0].column].data, order[0].dir]]
          : [['created_at', 'DESC']];
      
        const result = await Gallery.findAndCountAll({
          where,
          order: sort,
          offset: start,
          limit: length
        });
      
        return result;
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