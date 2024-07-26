const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

const Ulasan = sequelize.define('Ulasan', {
    id_ulasan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: { // Perbaiki nama kolom dari 'ratting' menjadi 'rating'
        type: DataTypes.FLOAT, // Ubah tipe data dari DATE ke FLOAT untuk rating
        allowNull: false
    },
    isi_ulasan: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

return TransaksiPenjualan;
  };