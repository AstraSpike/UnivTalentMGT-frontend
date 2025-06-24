import express from 'express';
const router = express.Router();
import DemandService from '../services/demandService.js';

/**
 * 提交人才需求
 * @route POST /api/demand/submit
 */
router.post('/submit', async (req, res) => {
    try {
        const result = await DemandService.submitDemand(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 获取我的需求列表
 * @route GET /api/demand/myDemands
 * @param {string} status - 状态，可选，默认值为 `全部`
 * @param {string} startDate - 开始日期，可选
 * @param {string} endDate - 结束日期，可选
 * @param {number} page - 页码，可选，默认值为 1
 * @param {number} pageSize - 每页数量，可选，默认值为 10
 */
router.get('/myDemands', async (req, res) => {
    try {
        const result = await DemandService.getMyDemands(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 获取待办任务列表
 * @route GET /api/demand/todoTasks
 * @param {string} priority - 优先级，可选，默认值为 `全部`
 * @param {string} type - 需求类型，可选，默认值为 `全部类型`
 * @param {number} page - 页码，可选，默认值为 1
 * @param {number} pageSize - 每页数量，可选，默认值为 10
 */
router.get('/todoTasks', async (req, res) => {
    try {
        const result = await DemandService.getTodoTasks(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 获取已完成任务列表
 * @route GET /api/demand/completedTasks
 * @param {string} startDate - 开始日期，可选
 * @param {string} endDate - 结束日期，可选
 * @param {string} department - 需求部门，可选，默认值为 `全部部门`
 * @param {number} page - 页码，可选，默认值为 1
 * @param {number} pageSize - 每页数量，可选，默认值为 10
 */
router.get('/completedTasks', async (req, res) => {
    try {
        const result = await DemandService.getCompletedTasks(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 获取需求详情
 * @route GET /api/demand/detail/:id
 * @param {string} id - 需求 ID
 */
router.get('/detail/:id', async (req, res) => {
    try {
        const result = await DemandService.getDemandDetail(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 处理需求
 * @route POST /api/demand/process/:id
 * @param {number} id - 需求 ID
 */
router.post('/process/:id', async (req, res) => {
    try {
        const result = await DemandService.processDemand(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;