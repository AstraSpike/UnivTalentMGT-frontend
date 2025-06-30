import { AxiosPromise } from 'axios';
import { taskService } from '../service/request';

interface CreateTaskData {
      title: demandForm.title, 
      type: demandForm.type, 
      taskRequirements: demandForm.taskRequirements, 
      taskPriority: demandForm.taskPriority, 
      expectedCompletionTime: demandForm.expectedCompletionTime, 
      receiverId: demandForm.receiverId, 
      taskStatus: demandForm.taskStatus, 
      initiatorId: initiator_id 
}

/**
 * 创建任务
 * @param data - 请求体数据
 * @returns 包含返回字段的对象
 */
export declare const createTask: (data: CreateTaskData) => AxiosPromise<Object>;

/**
 * 获取任务详情
 * @param id - 任务 ID
 * @returns 包含返回字段的对象
 */
export declare const getTaskDetail: (id: string | number) => AxiosPromise<Object>;

/**
 * 获取用户接收的任务列表
 * @param receiverId - 接收者 ID
 * @returns 包含任务对象的数组
 */
export declare const getReceivedTasks: (receiverId: string | number) => AxiosPromise<Array<Object>>;

/**
 * 更新任务状态
 * @param id - 任务 ID
 * @param status - 新状态
 * @returns 包含返回字段的对象
 */
export declare const updateTaskStatus: (id: string | number, status: string) => AxiosPromise<Object>;

/**
 * 删除任务
 * @param id - 任务 ID
 * @returns 删除是否成功
 */
export declare const deleteTask: (id: string | number) => AxiosPromise<boolean>;