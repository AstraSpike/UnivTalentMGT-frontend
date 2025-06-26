import express from 'express';
const router = express.Router();
import AuthService from '../services/authService.js';

/**
 * 用户登录
 * @route POST /users/login
 */
router.post('/users/login', async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
/**
 * 用户注册
 * @route POST /users/register
 */
router.post('/users/register', async (req, res) => {
    try {
        const result = await AuthService.register(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
/**
 * 忘记密码
 * @route POST /auth/reset-password
 */
router.post('/auth/reset-password', async (req, res) => {
    try {
        const result = await AuthService.resetPassword(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
/**
 * 忘记密码
 * @route POST /auth/send-reset-code
 */
router.post('/auth/send-reset-code', async (req, res) => {
    try {
        const result = await AuthService.sendResetPasswordCode(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
export default router;