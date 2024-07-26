const { Sequelize } = require('sequelize');

// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('2100016030-dpsi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Mengimpor model dan menyertakan sequelize serta DataTypes
const Product = require('./product')(sequelize);
const Pengguna = require('./pengguna')(sequelize);
const Pesanan = require('./pesanan')(sequelize);
const metodePembayaran = require('./metodePembayaran')(sequelize);
const Ulasan = require('./ulasan')(sequelize);
const User = require('./user')(sequelize);

// Define associations
Product.belongsTo(Pengguna, { foreignKey: 'id_product', as: 'product' });
Product.belongsTo(Pengguna, { foreignKey: 'id_pengguna', as: 'pengguna' });

Pengguna.belongsTo(Pesanan, { foreignKey: 'id', as: 'complaint' });
Pengguna.belongsTo(Pesanan, { foreignKey: 'complaintId', as: 'complaint' });


// Sinkronkan model dengan database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

// Ekspor instance Sequelize dan model-model yang sudah disinkronkan
module.exports = {
  sequelize,
  metodePembayaran,
  Pengguna,
  Pesanan,
  Product,
  Ulasan,
  User 
};
