import axios from 'axios';

// 获取干部教师列表
export const getPersonnelList = (query) => {
  return axios.get('/api/personnel/list', { params: query });
};

// 获取干部教师详情
export const getPersonnelDetail = (id) => {
  return axios.get(`/api/personnel/detail/${id}`);
};

// 导出干部教师列表为 Excel
export const exportPersonnelExcel = (query) => {
  return axios.get('/api/personnel/exportExcel', { params: query, responseType: 'blob' });
};