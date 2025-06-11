module.exports = (sequelize, DataTypes) => {
    const PackageFacility = sequelize.define('PackageFacility', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        package_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        facility_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'package_facilities',
        timestamps: false
    });

    PackageFacility.associate = (models) => {
        PackageFacility.belongsTo(models.UmrahPackage, { foreignKey: 'package_id' });
        PackageFacility.belongsTo(models.Facility, { foreignKey: 'facility_id' });
    }

    return PackageFacility;
}