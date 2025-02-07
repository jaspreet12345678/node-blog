import { Request, Response } from "express";
import User from "../../models/user";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      console.log(users,"usersssssssssssssss");
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
}
