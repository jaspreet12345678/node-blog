import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../app/routes/UserRoutes';
import authRoutes from '../app/routes/AuthRoutes';
import blogRoutes from '../app/routes/BlogRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', blogRoutes);

export default app;