require("dotenv").config();
const { Sequelize, Op, DataTypes } = require("sequelize");
const { DB_LINK, PORT } = process.env;
const path = require("path");
const fs = require("fs")
const sequelize = new Sequelize(`${DB_LINK}`, {
  logging: false,
  native: false,
});

const BASENAME = path.basename(__filename);
const DIRECTORY = path.join(__dirname,'..','models')

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(DIRECTORY))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== BASENAME && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(DIRECTORY, file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Usuario, Data } = sequelize.models;

Usuario.hasOne(Data);
Data.belongsTo(Usuario);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
