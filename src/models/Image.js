import { Model, DataTypes } from "sequelize"
import {sequelize} from "../database/db.js"
import Project from "./Project.js";

class Image extends Model {}

Image.init(
    {
      id: {
              type: DataTypes.INTEGER,
              // defaultValue: DataTypes.UUIDV4,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            url: {
                    type: DataTypes.STRING,
                  },
                  projectId: {
                    type: DataTypes.INTEGER,
                    references: {
                      model: "projects", // 'projects' refers to table name
                      key: "projectId", // 'id' refers to column name in projects table
                      autoIncrement: true,
                    },
                  },
                  main: {
                    type: DataTypes.BOOLEAN,
                  },
    },
    {
        sequelize,
        modelName: "Image",
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
    Image.associate = models => {
      Image.belongsTo(models.Project);
    }
);

export default  Image;










// export const Image = sequelize.define("image",
//   "image",
//   {
//     id: {
//       primaryKey: true,
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV1,
//       allowNull: false,
//     },
//     url: {
//       type: DataTypes.STRING,
//     },
//     projectId: {
//       type: DataTypes.UUID,
//       references: {
//         model: "projects", // 'projects' refers to table name
//         key: "id", // 'id' refers to column name in projects table
//       },
//     },
//     main: {
//       type: DataTypes.BOOLEAN,
//     },
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );

Project.hasMany(Image, { foreignKey: 'projectId' });
Image.belongsTo(Project, { foreignKey: 'projectId' });