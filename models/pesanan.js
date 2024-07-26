const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

const Pesanan = sequelize.define('Pesanan', {
  id_pesanan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pengguna: {
    type: DataTypes.INTEGER,
    references: {
      model: Pengguna,
      key: 'id_pengguna'
    }
  },
  tanggalPemesanan: {
    type: DataTypes.DATE,
    allowNull: false
  },
  statusPemesanan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalHarga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  daftarProduk: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  infoPembayaran: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Definisikan relasi antara Pesanan dan Pengguna
Pesanan.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Pengguna.hasMany(Pesanan, { foreignKey: 'id_pengguna' });

return Pesanan;
};