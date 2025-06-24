import AuthModel from '../models/authModel.js';

class AuthService {
    /**
     * 用户登录
     * @param {Object} loginData - 登录数据
     */
    static async login(loginData) {
        return await AuthModel.login(loginData);
    }
}

export default AuthService;