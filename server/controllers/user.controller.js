import generateToken from "../utils/jwt.js";
import User from "../models/user.model.js";

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }

    if (user.password === password) {
      res.status(200).json({
        id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(404).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const registerNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ username: name, email, password });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

export { authUser, registerNewUser };
