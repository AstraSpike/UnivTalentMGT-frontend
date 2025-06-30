import axios from 'axios';
// 提交人才需求
export const submitDemand = (demandData, initiator_id) => {
  return axios.post('/api/demand/submit', { ...demandData, initiator_id });
};

// 获取我的需求列表
export const getMyDemands = (query, initiator_id) => {
  return axios.get('/api/demand/myDemands', { params: { ...query, initiator_id } });
};

// 获取待办任务列表
export const getTodoTasks = (query, initiator_id) => {
  return axios.get('/api/demand/todoTasks', { params: { ...query, initiator_id } });
};

// 获取已完成任务列表
export const getCompletedTasks = (query, initiator_id) => {
  return axios.get('/api/demand/completedTasks', { params: { ...query, initiator_id } });
};

// 获取需求详情
export const getDemandDetail = (id) => {
  return axios.get(`/api/demand/detail/${id}`);
};

// 处理需求
export const processDemand = (id) => {
  return axios.post(`/api/demand/process/${id}`);
};
