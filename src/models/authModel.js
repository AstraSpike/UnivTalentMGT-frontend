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
/**
     * 用户注册
     * @param {Object} registerData - 注册数据，包含username和password
     * @returns {Promise<Object>} - 返回注册响应数据
     */
static async register(registerData) {
    try {
        console.log('发送注册请求，数据:', registerData);
        // 发送注册请求并直接返回响应数据
        const data = await service.post('/users/register', registerData);
        console.log('注册成功，返回数据:', data);
        return data;
    } catch (error) {
        console.error('注册失败，错误:', error);
        throw error;
    }
}
static async sendResetPasswordCode(email) {
    try {
      console.log('发送密码重置验证码，邮箱:', email);
      const data = await api.post('/auth/send-reset-code', { email });
      console.log('验证码发送成功，返回数据:', data);
      return data;
    } catch (error) {
      console.error('验证码发送失败，错误:', error);
      throw error;
    }
  }
  static async verifyResetPasswordCode(email, code) {
    try {
      console.log('验证密码重置码，邮箱:', email);
      const data = await api.post('/auth/verify-reset-code', { email, code });
      console.log('验证码验证成功，返回数据:', data);
      return data;
    } catch (error) {
      console.error('验证码验证失败，错误:', error);
      throw error;
    }
  }
  static async resetPassword(email, code, newPassword) {
    try {
      console.log('重置密码，邮箱:', email);
      const data = await api.post('/auth/reset-password', { email, code, newPassword });
      console.log('密码重置成功，返回数据:', data);
      return data;
    } catch (error) {
      console.error('密码重置失败，错误:', error);
      throw error;
    }
  }

}
export default AuthModel;