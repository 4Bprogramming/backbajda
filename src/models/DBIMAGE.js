import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import Project from "./Project.js";

class DBIMAGE extends Model {}

DBIMAGE.init(
  {
    cloudinaryID: {
      type: DataTypes.STRING,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      
    },
    projectId:{
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
    },
    main: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "DBIMAGE",
    freezeTableName: true,
    timestamps: false,
  },
  // {
  // },
  // DBIMAGE.associate = models => {
  //   DBIMAGE.belongsTo(models.Project);
  // }
);

export default DBIMAGE;

// Project.hasMany(DBIMAGE, { foreignKey: 'projectId' });
// DBIMAGE.belongsTo(Project, { foreignKey: 'projectId' });

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
