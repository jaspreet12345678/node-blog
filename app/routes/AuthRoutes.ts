import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// Register Route
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    AuthController.register(req, res)
      .catch(next);
  }
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    AuthController.login(req, res)
      .catch(next);
  }
);

export default router;