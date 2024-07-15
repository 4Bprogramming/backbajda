import { Sequelize, Model, DataTypes } from "sequelize"
import {sequelize} from "../database/db.js"
import DBIMAGE from "./DBIMAGE.js";

class Project extends Model {}

Project.init(
    {
      id: {
              type: DataTypes.INTEGER,
              // defaultValue: DataTypes.UUIDV4,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            place: {
              type: DataTypes.TEXT,
            },
            title: {
              type: DataTypes.STRING,
            },
            area: {
              type: DataTypes.INTEGER,
            },
            rooms: {
              type: DataTypes.INTEGER,
            },
            year: {
              type: DataTypes.INTEGER,
            },
            description: {
              type: DataTypes.TEXT,
            },
    },
    {
        sequelize,
        modelName: "Project",
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
    Project.associate = models => {
      Project.hasMany(models.DBIMAGE);
    }
);

export default  Project;

// import { DataTypes } from "sequelize";
// import { sequelize } from "../database/db.js";

// export const Project = sequelize.define(
//   "project",
//   "image",
//   {
//     projectId: {
//       type: DataTypes.INTEGER,
//       // defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     place: {
//       type: DataTypes.TEXT,
//     },
//     title: {
//       type: DataTypes.STRING,
//     },
//     area: {
//       type: DataTypes.INTEGER,
//     },
//     rooms: {
//       type: DataTypes.INTEGER,
//     },
//     year: {
//       type: DataTypes.INTEGER,
//     },
//     description: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );
