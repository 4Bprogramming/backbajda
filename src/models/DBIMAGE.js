import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import Project from "./Project.js";

class DBIMAGE extends Model {}

DBIMAGE.init(
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
    // projectId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "project", // 'projects' refers to table name
    //     key: "projectId", // 'id' refers to column name in projects table
        
    //   },
    // },
    main: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "DBIMAGE",
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
  DBIMAGE.associate = models => {
    DBIMAGE.belongsTo(models.Project);
  }
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
