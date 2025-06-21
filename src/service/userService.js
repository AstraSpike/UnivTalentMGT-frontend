import UserModel from '../models/userModel.js';
import axios from 'axios';
class UserService {
    /**
     * 获取用户信息
     */
    static async getUserInfo() {
        return await UserModel.getUserInfo();
    }

    /**
     * 修改用户密码
     * @param {Object} passwordData - 密码数据
     */
    static async changePassword(passwordData) {
        return await UserModel.changePassword(passwordData);
    }

    /**
     * 修改用户手机号
     * @param {Object} phoneData - 手机号数据
     */
    static async changePhone(phoneData) {
        return await UserModel.changePhone(phoneData);
    }
}
const userService = {
    // 获取用户信息
    getInfo() {
      return axios.get('/api/user/info');
    },
    
    // 修改密码
    changePassword(passwordData) {
      return axios.post('/api/user/changePassword', passwordData);
    },
    
    // 修改手机号
    changePhone(phoneData) {
      return axios.post('/api/user/changePhone', phoneData);
    }
  };
  
export default UserService;userService;   