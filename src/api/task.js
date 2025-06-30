import { taskService } from '../service/request';

/**
 * 创建任务
 * @param {Object} data - 请求体数据
 * @param {string} data.字段1 - 描述1
 * @param {string} data.字段2 - 描述2
 * @returns {Promise<Object>} 包含返回字段的对象
 */
export const createTask = (data) => {
    console.log('请求数据:', data);
    return taskService.post('/api/tasks', data);
};

/**
 * 获取任务详情
 * @param {string|number} id - 任务 ID
 * @returns {Promise<Object>} 包含返回字段的对象
 */
export const getTaskDetail = (id) => {
    return taskService.get(`/api/tasks/${id}`);
};

/**
 * 获取用户接收的任务列表
 * @param {string|number} receiverId - 接收者 ID
 * @returns {Promise<Array>} 包含任务对象的数组
 */
export const getReceivedTasks = (receiverId) => {
    return taskService.get(`/api/tasks/receiver/${receiverId}`);
};

/**
 * 更新任务状态
 * @param {string|number} id - 任务 ID
 * @param {string} status - 新状态
 * @returns {Promise<Object>} 包含返回字段的对象
 */
export const updateTaskStatus = (id, status) => {
    return taskService.put(`/api/tasks/${id}/status`, null, { params: { status } });
};

/**
 * 删除任务
 * @param {string|number} id - 任务 ID
 * @returns {Promise<boolean>} 删除是否成功
 */
export const deleteTask = (id) => {
    return taskService.delete(`/api/tasks/${id}`);
};