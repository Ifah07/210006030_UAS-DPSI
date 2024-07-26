// product.js
const { DataTypes } = require('sequelize');
const Product = require('./product');

module.exports = (sequelize) => {

const Product = sequelize.define('Product', {
    id_produk: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_produk: {
        type: DataTypes.STRING,
        allowNull: false
    },
    harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kategori: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ulasan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_pengguna: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pengguna,
            key: 'id_pengguna'
        }
    }
}, 
{
    timestamps: false
});

// Definisikan relasi antara Product dan Pengguna
Product.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Pengguna.hasMany(Product, { foreignKey: 'id_pengguna' });

return Product;
};