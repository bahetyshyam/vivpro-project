import { Router } from 'express';

const router = Router();


router.get('/', (req, res) => {
  const response = {
    success: true,
    message: 'API is healthy',
    data: { 
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  };
  res.json(response);
});

export default router;