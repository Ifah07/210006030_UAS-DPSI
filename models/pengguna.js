const { DataTypes } = require('sequelize');
const Pengguna = require('./pengguna');


module.exports = (sequelize) => {

const Pengguna = sequelize.define('Pengguna', {
    id_pengguna: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, // Ubah dari DECIMAL ke STRING
        allowNull: false,
        unique: true // Menambahkan unique constraint untuk email
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    riwayatPesanan: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false // Menetapkan opsi timestamps di luar definisi kolom
});

return Pengguna;
};