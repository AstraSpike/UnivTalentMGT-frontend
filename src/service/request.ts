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

// 响应拦截器 - 简化处理逻辑
service.interceptors.response.use(
  response => {
    // 直接返回响应数据
    return response.data;
  },
  error => {
    const { response } = error;
    let message = '接口请求失败';
    if (response) {
      if (response.status === 404) message = '资源未找到';
      else if (response.status === 500) message = '服务器内部错误';
      else if (response.status === 400) message = '参数格式错误';
      else if (response.status === 401) {
        message = '未授权，请重新登录';
        localStorage.removeItem('token');
      }
    }
    ElMessage({ message, type: 'error', duration: 3000 });
    return Promise.reject(error);
  }
);

export default service;