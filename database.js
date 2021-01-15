const { Sequelize } = require('sequelize');


module.exports  = new Sequelize('School_DB', "sa", "Muzammil", {
  host: 'localhost',
  dialect:  'mssql',
  pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
  },
  dialectOptions: {
    options: { encrypt: false }
  }
});

