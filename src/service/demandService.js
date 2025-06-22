import DemandModel from '../models/DemandModel.js';

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

export default DemandService;