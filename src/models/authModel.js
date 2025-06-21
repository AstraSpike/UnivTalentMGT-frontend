import axios from 'axios';

class AuthModel {
    /**
     * 用户登录
     * @param {Object} loginData - 登录数据
     */
    static async login(loginData) {
        try {
            // 调用后端接口进行登录验证
            const response = await axios.post('/api/login', loginData);
            return response.data;
        } catch (error) {
            console.error('登录失败:', error);
            throw new Error('登录失败，请检查用户名和密码');
        }
    }
}

export default AuthModel;