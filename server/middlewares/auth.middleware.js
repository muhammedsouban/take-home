import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticateUser = async (req, res, next) => {
  let token;
  try {
    if (
      req?.headers?.authorization &&
      req?.headers?.authorization.startsWith("Bearer")
    ) {
      token = req?.headers?.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      req.user = await User.findByPk(decoded.id)
      
      next();
    } else {
      throw new Error("Not Authorized, no token");
    }
  } catch (error) {
    res.status(401).json({ error: error.message || "Unauthorized" });
    
  }
};

export { authenticateUser };