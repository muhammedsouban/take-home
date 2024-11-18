import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Project from "./project.model.js";

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Todo.belongsTo(Project, { foreignKey: "projectId" });
Project.hasMany(Todo, { as: "todos", foreignKey: "projectId" });

export default Todo;
