import { Router } from 'express';
const router = Router();

// Placeholder clients routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all clients' });
});

export default router;
