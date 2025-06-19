import UserModel from '../models/userModel.js';

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

export default UserService;    