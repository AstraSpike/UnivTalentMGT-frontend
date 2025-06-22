// 基于文档要求的JWT认证和接口基础URL
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建请求实例
const service = axios.create({
  baseURL: 'http://localhost:8080', // 修改为网关地址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 携带JWT token
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器 - 处理文档定义的状态码
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 文档状态码规范：200成功，400/404参数/资源错误，500服务器错误
    if (res.code && res.code !== 200) {
      ElMessage({
        message: res.message || '请求失败',
        type: 'error',
        duration: 3000,
      });
      // 401未授权时跳转登录（文档未明确，但常见认证场景）
      if (res.code === 401) {
        localStorage.removeItem('token');
      }
      return Promise.reject(new Error(res.message || '请求失败'));
    } else {
      return res;
    }
  },
  error => {
    const { response } = error;
    let message = '接口请求失败';
    // 适配文档状态码
    if (response) {
      if (response.status === 404) message = '资源未找到';
      else if (response.status === 500) message = '服务器内部错误';
      else if (response.status === 400) message = '参数格式错误';
    }
    ElMessage({ message, type: 'error' });
    return Promise.reject(error);
  }
);

export default service;