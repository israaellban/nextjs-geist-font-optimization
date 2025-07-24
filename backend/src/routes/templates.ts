import { Router } from 'express';
const router = Router();

// Placeholder templates routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all templates' });
});

export default router;
