const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

const metodePembayaran = sequelize.define('metodePembayaran', {

    id_metodePembayaran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_metode: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    detail_metode: {
        type: DataTypes.DATE,
        allowNull: false
    }

});

return metodePembayaran;
};