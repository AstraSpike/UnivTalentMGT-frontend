import AuthModel from '../models/authModel.js';
import axios from 'axios';
class AuthService {
    /**
     * 用户登录
     * @param {Object} loginData - 登录数据
     */
    static async login(loginData) {
        return await AuthModel.login(loginData);
        return axios.post('/api/login', loginData); // 调用后端接口进行登录验证
    }
}
const authService = {
    // 用户登录
    login(loginData) {
      return axios.post('/api/login', loginData);
    }
  };
export default authService;AuthService;    