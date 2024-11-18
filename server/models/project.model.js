import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.model.js";

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Project.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Project, { foreignKey: "userId" });

export default Project;
