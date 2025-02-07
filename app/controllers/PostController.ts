import { Request, Response } from 'express';
import Post from '../../models/post';

export class PostController {
  // **Create Post**
  static async createPost(req: Request, res: Response) {
    console.log("jaspreet inside post");
    const { title, content } = req.body;
    const userId = (req as any).user.id;

    try {
      const post = await Post.create({ title, content, userId });
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating post' });
    }
  }

  // **Get All Posts**
  static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await Post.findAll({
        include: ['User'], // Include user details
        order: [['createdAt', 'DESC']], // Latest posts first
      });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
  }

  // **Get a Single Post**
  static async getPostById(req: Request, res: Response) {
    const postId = req.params.id;
    try {
      const post = await Post.findByPk(postId, { include: ['User'] });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching post' });
    }
  }

  // **Update Post**
  static async updatePost(req: Request, res: Response) {
    const postId = req.params.id;
    const { title, content } = req.body;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      post.title = title || post.title;
      post.content = content || post.content;
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating post' });
    }
  }

  // **Delete Post**
  static async deletePost(req: Request, res: Response) {
    const postId = req.params.id;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await post.destroy();
      res.json({ message: 'Post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  }
}
