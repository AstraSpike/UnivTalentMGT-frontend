import PersonnelModel from '../models/personnelModel.js';
import ExcelJS from 'exceljs';

class PersonnelService {
    /**
     * 获取干部教师列表
     * @param {Object} query - 查询参数
     */
    static async getPersonnelList(query) {
        return await PersonnelModel.getPersonnelList(query);
    }

    /**
     * 获取干部教师详情
     * @param {number} id - 人员 ID
     */
    static async getPersonnelDetail(id) {
        return await PersonnelModel.getPersonnelDetail(id);
    }

    /**
     * 导出干部教师列表为 Excel
     * @param {Object} query - 查询参数
     * @param {Object} res - Express 响应对象
     */
    static async exportPersonnelExcel(query, res) {
        const personnelList = await PersonnelModel.getPersonnelList(query);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('干部教师列表');

        worksheet.columns = [
            { header: '姓名', key: 'name', width: 10 },
            { header: '性别', key: 'gender', width: 10 },
            { header: '年龄', key: 'age', width: 10 },
            { header: '院系', key: 'department', width: 20 },
            { header: '职称', key: 'title', width: 20 },
            { header: '教学评分', key: 'teachingScore', width: 10 },
            { header: '科研评分', key: 'researchScore', width: 10 },
            { header: '晋升概率', key: 'promotionChance', width: 10 },
            { header: '标签', key: 'tags', width: 20 }
        ];

        personnelList.personnelList.forEach(personnel => {
            worksheet.addRow({
                name: personnel.name,
                gender: personnel.gender,
                age: personnel.age,
                department: personnel.department,
                title: personnel.title,
                teachingScore: personnel.teachingScore,
                researchScore: personnel.researchScore,
                tags: personnel.tags.join(',')
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=personnel_list.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    }
}

export default PersonnelService;