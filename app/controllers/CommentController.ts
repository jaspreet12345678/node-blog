import { Request, Response } from "express";
import Comment from "../../models/comment";

export class CommentController {
  // **Create Comment**
  static async createComment(req: Request, res: Response) {
    const { content } = req.body;
    const postId = req.params.postId;
    const userId = (req as any).user.id; // Get user ID from JWT
    console.log(userId,"usersssssssssssssssssssssss");
    try {
      const comment = await Comment.create({ content, postId, userId });
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating comment" });
    }
  }

  // **Get Comments for a Post**
  static async getCommentsForPost(req: Request, res: Response) {
    const postId = req.params.postId;
    try {
      const comments = await Comment.findAll({
        where: { postId },
        include: ["User"], // Include user details
        order: [["createdAt", "ASC"]], // Oldest comments first
      });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching comments" });
    }
  }

  // **Delete Comment**
  static async deleteComment(req: Request, res: Response) {
    const commentId = req.params.commentId;
    try {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      await comment.destroy();
      res.json({ message: "Comment deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting comment" });
    }
  }
}
