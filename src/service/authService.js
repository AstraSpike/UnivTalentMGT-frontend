import AuthModel from '../models/authModel.js';

class AuthService {
    /**
     * 用户登录
     * @param {Object} loginData - 登录数据
     */
    static async login(loginData) {
        return await AuthModel.login(loginData);
    }
  /**
     * 用户注册
     * @param {Object} registerData - 注册数据
     */
  static async register(registerData) {
    return await AuthModel.register(registerData);
}
}
export default AuthService;