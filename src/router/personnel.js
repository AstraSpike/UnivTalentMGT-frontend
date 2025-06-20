import express from 'express';
const router = express.Router();
import PersonnelService from '../services/personnelService.js';
import PersonDetail from '@/views/PersonDetail.vue'

/**
 * 获取干部教师列表
 * @route GET /api/personnel/list
 * @param {string} name - 姓名，可选
 * @param {string} department - 院系，可选，默认值为 `全部院系`
 * @param {string} title - 职称，可选，默认值为 `全部职称`
 * @param {string} tag - 标签，可选，默认值为 `全部标签`
 * @param {number} page - 页码，可选，默认值为 1
 * @param {number} pageSize - 每页数量，可选，默认值为 10
 */
router.get('/list', async (req, res) => {
    try {
        const result = await PersonnelService.getPersonnelList(req.query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 获取干部教师详情
 * @route GET /api/personnel/detail/:id
 * @param {number} id - 人员 ID
 */
router.get('/detail/:id', async (req, res) => {
    try {
        const result = await PersonnelService.getPersonnelDetail(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * 导出干部教师列表为 Excel
 * @route GET /api/personnel/exportExcel
 * @param {string} name - 姓名，可选
 * @param {string} department - 院系，可选，默认值为 `全部院系`
 * @param {string} title - 职称，可选，默认值为 `全部职称`
 * @param {string} tag - 标签，可选，默认值为 `全部标签`
 */
router.get('/exportExcel', async (req, res) => {
    try {
        await PersonnelService.exportPersonnelExcel(req.query, res);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
export default [
  {
    path: '/person/detail/:id',
    name: 'PersonDetail',
    component: PersonDetail,
    meta: {
      requiresAuth: true
    }
  },router
]