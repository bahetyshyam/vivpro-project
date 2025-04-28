import { Router } from 'express';
import healthRouter from './health';

const router = Router();

// Health routes
router.use('/health', healthRouter);

// Add more routes here as needed
// router.use('/users', userRouter);
// router.use('/collections', collectionRouter);

export default router;