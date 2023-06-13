const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DEV_DB_URL);

async function checkConnect(req, res, next) {
  try {
    await sequelize.authenticate();
    console.log('БАЗА ПОДКЛЮЧЕНА!');
    next();
  } catch (error) {
    console.log('БАЗА НЕ ПОДКЛЮЧЕНА ==>', error);
    res.send(error);
  }
}

module.exports = checkConnect;
