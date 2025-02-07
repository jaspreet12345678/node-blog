import { Router, Request, Response, NextFunction } from "express";
import { PostController } from "../controllers/PostController";
import { CommentController } from "../controllers/CommentController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

// **Post Routes**
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    PostController.createPost(req, res).catch(next);
  });
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    PostController.getAllPosts(req, res).catch(next);
  });
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    PostController.getPostById(req, res).catch(next);
  });
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    PostController.updatePost(req, res).catch(next);
  });
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    PostController.deletePost(req, res).catch(next);
  });
});

// **Comment Routes**
router.post(
  "/:postId/comments",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, () => {
      CommentController.createComment(req, res).catch(next);
    });
  }
);

router.get(
  "/:postId/comments",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, () => {
      CommentController.getCommentsForPost(req, res).catch(next); // Public
    });
  }
);

router.delete(
  "/comments/:commentId",
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware(req, res, () => {
      CommentController.deleteComment(req, res).catch(next);
    });
  }
);

export default router;
