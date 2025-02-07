import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = Router();

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     authMiddleware(req, res, () => {
//         UserController.getAllUsers(req, res).catch(next);
//     });
// });

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    UserController.getAllUsers(req, res).catch(next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    UserController.createUser(req, res).catch(next);
});

export default router;