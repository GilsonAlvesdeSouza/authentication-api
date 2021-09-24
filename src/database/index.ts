import {Sequelize} from "sequelize";
const dbConfig =  require("../config/database");
import Users from "../models/Users";
// const Users = require("../models/Users");

const connection = new Sequelize(dbConfig);

Users.init(connection);

module.exports = connection;

