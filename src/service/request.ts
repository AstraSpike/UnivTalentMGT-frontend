// 基于文档要求的JWT认证和接口基础URL
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建请求实例 - 原有请求配置
const service = axios.create({ 
  baseURL: 'http://localhost:8080', // 修改为网关地址
  timeout: 10000, 
  headers: { 
    'Content-Type': 'application/json', 
  }, 
}); 

// 创建新的任务请求实例
const taskService = axios.create({ 
  timeout: 10000, 
  headers: { 
    'Content-Type': 'application/json', 
  }, 
}); 

const trainingService = axios.create({ 
  timeout: 10000, 
  headers: { 
    'Content-Type': 'application/json', 
  }, 
}); 



// 请求拦截器 - 携带JWT token（实例都添加拦截器）
const addAuthInterceptor = (instance: import('axios').AxiosInstance) => { 
  instance.interceptors.request.use( 
    config => { 
      const token = localStorage.getItem('token'); 
      if (token) { 
        config.headers['Authorization'] = `Bearer ${token}`; 
      } 
      return config; 
    }, 
    error => Promise.reject(error) 
  ); 
}; 

addAuthInterceptor(service); 
addAuthInterceptor(taskService); 
addAuthInterceptor(trainingService);

// 响应拦截器 - 简化处理逻辑（实例都添加拦截器）
const addResponseInterceptor = (instance: import('axios').AxiosInstance) => {
  instance.interceptors.response.use( 
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
}; 

addResponseInterceptor(service); 
addResponseInterceptor(taskService); 
addResponseInterceptor(trainingService);

// 导出两个实例
export { service, taskService, trainingService };
export default service;