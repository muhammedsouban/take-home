import Project from "../models/project.model.js";
import Todo from "../models/todo.model.js";

const getProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({
      where: { id },
      include: {
        model: Todo,
        as: "todos",
      },
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Project Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

const addProject = async (req, res, next) => {
  const { name, userId } = req.body;
  try {
    if (!name || !userId) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const project = await Project.create({ name, userId });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    const [updated, [updatedProjects]] = await Project.update(
      { name },
      {
        where: { id },
        returning: true,
      }
    );

    if (updated) {
      res.status(200).json({
        message: "Project Name Updated Successfully",
        project: updatedProjects,
      });
    } else {
      res.status(404).json({ error: "Project Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Todo.destroy({
      where: { projectId: id },
    });

    const deletedCount = await Project.destroy({
      where: { id },
    });

    if (deletedCount > 0) {
      res.status(200).json({ message: "Project Deleted Successfully" });
    } else {
      res.status(404).json({ error: "Project Not Found" });
    }
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      res.status(400);
      throw new Error("User Id Not Found");
    }

    const projects = await Project.findAll({
      where: { userId },
      include: {
        model: Todo,
        as: "todos",
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const downloadProjectMarkdown = async (req, res, next) => {
  try {
    const { title, completedTodos, totalTodos, pendingTodos } = req.body;

    const generateTaskListMarkdown = (tasks) => {
      return tasks
        .map((task) => `- ${task?.completed ? "[x]" : "[ ]"} ${task.title}`)
        .join("\n");
    };

    const markdownContent = `
# ${title}

## Summary:
${completedTodos?.length} / ${totalTodos} tasks completed.

## Pending Tasks
${generateTaskListMarkdown(pendingTodos)}

## Completed Tasks
${generateTaskListMarkdown(completedTodos)}
`;

    res.setHeader("Content-Type", "text/markdown");
    res.setHeader("Content-Disposition", `attachment; filename="${title}.md"`);
    res.status(200).send(markdownContent);
  } catch (error) {
    next(error);
  }
};

export {
  addProject,
  getAllProjects,
  getProject,
  deleteProject,
  updateProject,
  downloadProjectMarkdown,
};
