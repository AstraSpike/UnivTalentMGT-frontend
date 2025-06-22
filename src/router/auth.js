import express from 'express';
const router = express.Router();
import AuthService from '../services/authService.js';

/**
 * 用户登录
 * @route POST /api/login
 */
router.post('/login', async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;