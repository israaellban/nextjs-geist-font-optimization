import { Router } from 'express';
const router = Router();

// Placeholder conversations routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all conversations' });
});

export default router;
