import express from 'express';
const router = express.Router();
import UserService from '../services/userService.js';

/**
 * 获取用户信息
 * @route GET /api/user/info
 */
router.get('/info', async (req, res) => {
    try {
        const result = await UserService.getUserInfo();
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 修改用户密码
 * @route POST /api/user/changePassword
 */
router.post('/changePassword', async (req, res) => {
    try {
        const result = await UserService.changePassword(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 修改用户手机号
 * @route POST /api/user/changePhone
 */
router.post('/changePhone', async (req, res) => {
    try {
        const result = await UserService.changePhone(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;    