import { Router } from 'express';
const router = Router();

// Placeholder messages routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all messages' });
});

export default router;
