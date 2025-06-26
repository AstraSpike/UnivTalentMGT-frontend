import axios from 'axios';
class PersonnelModel {
    /**
     * 获取干部教师列表
     * @param {Object} query - 查询参数
     */
    static async getPersonnelList(query) {
        // 模拟从数据库查询
        return { success: true, message: '获取干部教师列表成功', data: { personnelList: [] } };
    }

    /**
     * 获取干部教师详情
     * @param {number} id - 人员 ID
     */
    static async getPersonnelDetail(id) {
        try {
            const response = await axios.get(`/detail/${id}`);
            console.log('接口响应内容:', response.data); // 打印响应内容
            return {
                success: true,
                message: '获取干部教师详情成功',
                data: response.data
            };
        } catch (error) {
            console.error('获取干部教师详情失败:', error);
            return {
                success: false,
                message: '获取干部教师详情失败',
                data: null
            };
        }
    }
    static async getPersonnelBasicInfo() {
         try {
            const response = await axios.get(`/basic`);
            console.log('接口响应内容:', response.data); // 打印响应内容
            return {
                success: true,
                message: '获取干部教师基础信息成功',
                data: response.data
            };
        } catch (error) {
            console.error('获取干部教师基础信息失败:', error);
            return {
                success: false,
                message: '获取干部教师基础信息失败',
                data: null
            };
        }
    }
}

export default PersonnelModel;
