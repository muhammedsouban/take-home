import Todo from "../models/todo.model.js";

const addTodo = async (req, res, next) => {
  const { title, projectId, description, completed } = req.body;
  const data = {
    title,
    projectId,
    description,
    completed,
  };

  try {
    if (!title) {
      res.status(400);
      throw new Error("bad request");
    }
    const todo = await Todo.create(data);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const { title, completed, description } = req.body;

  try {
    const [updatedRows, [updatedTodo]] = await Todo.update(
      { title, completed, description },
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedRows === 0) {
      res.status(404).json({ error: "Todo Not Found" });
    } else {
      res.status(200).json({ message: "Todo Updated", todo: updatedTodo });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.destroy({ where: { id } });
    if (todo=== 1) {
      res.status(200).json({ message: "Todo Deleted Successfully" });
    } else {
      res.status(404).json({ error: "Todo Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

export { addTodo, updateTodo, deleteTodo };
