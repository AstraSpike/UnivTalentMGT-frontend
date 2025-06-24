import axios from 'axios';
import service from '../service/request';

class AuthModel {
    /**
     * 用户登录
     * @param {Object} loginData - 登录数据，包含username和password
     * @returns {Promise<Object>} - 返回登录响应数据，包含token和用户信息
     */
    static async login(loginData) {
        try {
            console.log('发送登录请求，数据:', loginData);
            // 发送登录请求并直接返回响应数据
            const data = await service.post('/users/login', loginData);
            console.log('登录成功，返回数据:', data);
            return data;
        } catch (error) {
            console.error('登录失败，错误:', error);
            throw error;
        }
    }
}

export default AuthModel;
