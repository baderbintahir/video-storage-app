const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'postgres',
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected");
  } catch (err) {
    console.error("PostgreSQL connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
