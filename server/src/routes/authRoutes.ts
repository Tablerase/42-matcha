import express, { Router } from 'express';
import { createUser, authenticateUser } from '@views/authViews';

const router: Router = express.Router();

// Authentication routes
router.post('/register', createUser);
router.post('/login', authenticateUser);

// TODO: Implement these routes
// router.post('/logout', authenticateToken, logoutUser);
// router.post('/forgot-password', validateEmail, forgotPassword);
// router.post('/refresh-token', validateRefreshToken, refreshToken);

export default router;