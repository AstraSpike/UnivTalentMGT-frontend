import DemandModel from '../models/DemandModel.js';
import axios from 'axios';
class DemandService {
    /**
     * 提交人才需求
     * @param {Object} demandData - 需求数据
     */
    static async submitDemand(demandData) {
        return await DemandModel.submitDemand(demandData);
    }

    /**
     * 获取我的需求列表
     * @param {Object} query - 查询参数
     */
    static async getMyDemands(query) {
        return await DemandModel.getMyDemands(query);
    }

    /**
     * 获取待办任务列表
     * @param {Object} query - 查询参数
     */
    static async getTodoTasks(query) {
        return await DemandModel.getTodoTasks(query);
    }

    /**
     * 获取已完成任务列表
     * @param {Object} query - 查询参数
     */
    static async getCompletedTasks(query) {
        return await DemandModel.getCompletedTasks(query);
    }

    /**
     * 获取需求详情
     * @param {string} id - 需求 ID
     */
    static async getDemandDetail(id) {
        return await DemandModel.getDemandDetail(id);
    }

    /**
     * 处理需求
     * @param {string} id - 需求 ID
     */
    static async processDemand(id) {
        return await DemandModel.processDemand(id);
    }
}
const demandService = {
    // 提交人才需求
    submit(demandData) {
      return axios.post('/api/demand/submit', demandData);
    },
    
    // 获取我的需求列表
    getMyDemands(params) {
      return axios.get('/api/demand/myDemands', { params });
    },
    
    // 获取待办任务列表
    getTodoTasks(params) {
      return axios.get('/api/demand/todoTasks', { params });
    },
    
    // 获取已完成任务列表
    getCompletedTasks(params) {
      return axios.get('/api/demand/completedTasks', { params });
    },
    
    // 获取需求详情
    getDetail(id) {
      return axios.get(`/api/demand/detail/${id}`);
    },
    
    // 处理需求
    process(id) {
      return axios.post(`/api/demand/process/${id}`);
    }
  };
export default DemandService;demandService; 