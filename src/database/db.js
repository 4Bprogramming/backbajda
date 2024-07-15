import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();


const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

export const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bbajda`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialect: "mysql"
});
