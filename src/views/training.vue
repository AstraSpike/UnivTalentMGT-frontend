<template>
<div class="main-content">
    <div id="training-page" class="page">
        <div class="card">
            <div class="card-title">培训需求分析</div>
            <!-- 为图表添加 ref -->
            <div ref="trainingChart" class="chart-container" style="height:300px;"></div>
            <table>
                <thead>
                    <tr>
                        <th>能力维度</th>
                        <th>需培训人数</th>
                        <th>推荐能力</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>教学能力</td>
                        <td>{{ teachingCount }}</td>
                         <td>教学方法创新、课程设计优化</td>
                        <td>
                  <router-link :to="{ name: 'TrainingDetails', params: { type: 'teach' }}" @click="handleTrainingDetailsClick_teach">查看详情</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td>科研能力</td>
                        <td>{{ researchCount }}</td>
                        <td>科研项目申报、论文写作技巧</td>
                        <td>
                  <router-link :to="{ name: 'TrainingDetails', params: { type: 'teach' }}" @click="handleTrainingDetailsClick_research">查看详情</router-link>
                      </td>
                    </tr>
                    <tr>
                        <td>管理能力</td>
                        <td>{{ managementCount }}</td>
                        <td>团队管理、决策能力提升</td>
<td>
                 <router-link :to="{ name: 'TrainingDetails', params: { type: 'teach' }}" @click="handleTrainingDetailsClick_management">查看详情</router-link>
</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 新增保存培训信息表单 -->
        <div class="card">
            <div class="card-title">保存人员培训信息</div>
            <div class="form-item">
                <label>人员 ID:</label>
                <input v-model="personnelId" type="number" placeholder="请输入人员 ID">
            </div>
            <div class="form-item">
                <label>培训能力:</label>
                <input v-model="trainingCourse" type="text" placeholder="请输入培训能力">
            </div>
            <div class="form-item">
                <label>培训优先级:</label>
                <input v-model="trainingPriority" type="number" placeholder="请输入培训优先级">
            </div>
            <button @click="saveTrainingInfo">保存</button>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup name="training">
import { ref, onMounted,computed } from 'vue';
import * as echarts from 'echarts';
import {
  getBatchTrainingAnalysis,
  getScreenedPersonnel,
  getTrainingList,
  // 假设后续会在 training.ts 中添加该接口
  saveTrainingRecords
} from '../api/training.ts';
import { useTrainingStore } from '../stores/training';
import { ElMessage } from 'element-plus';

// 定义响应式数据存储各能力维度的需培训人数
const teachingCount = ref(0);
const researchCount = ref(0);
const managementCount = ref(0);

// 定义图表 ref
const trainingChart = ref(null);

// 教学能力对应的课程列表（真实值）
const teachingCourses = computed(() => { 
  const filtered = (batchAnalysisResults.value as any[]).filter(item => item.ability === '教学能力');
  // 新增日志：验证教学能力筛选结果是否有数据
  console.log('[教学能力] 筛选后的人员列表（用于提取课程）:', filtered);
  const courses = [...new Set(filtered.map(item => item.recommendedCourses))]; // 原有逻辑
  // 新增日志：验证提取到的recommendedCourses原始值
  console.log('[教学能力] 原始recommendedCourses数组:', courses);
  return courses;
})

// 教学点击处理方法（原有结构）
const handleTrainingDetailsClick_teach = () => { 
  const trainingStore = useTrainingStore();
  const filteredPersonnel = batchAnalysisResults.value.filter(item => item.ability === '教学能力')
  const personnelList = JSON.parse(JSON.stringify(batchAnalysisResults.value.filter(item => 
    teachingKeywords.some(keyword => (item as any).abilityShortcomings?.includes(keyword))
  )));
  // 新增日志：验证点击时筛选的人员列表是否有数据
  console.log('[教学点击] 筛选的personnelList:', personnelList);
  // 新增日志：验证传递前的courses值（与teachingCourses计算属性强关联）
  console.log('[教学点击] 传递的courses（来自teachingCourses）:', teachingCourses.value);
  console.log('[教学点击] 筛选的personnelList（含ability字段）:', personnelList.map(item => ({ personnelId: item.personnelId, ability: item.ability })));
  trainingStore.setCurrentDetails({ 
    ability: '教学能力',
    count: teachingCount.value,
    courses: teachingCourses.value.join(', '), 
    personnelList
  });
}
// 教学点击处理方法（原有结构）
const handleTrainingDetailsClick_research = () => { 
  const trainingStore = useTrainingStore();
  const personnelList = JSON.parse(JSON.stringify(batchAnalysisResults.value.filter(item => 
    researchKeywords.some(keyword => (item as any).abilityShortcomings?.includes(keyword))
  )));
  trainingStore.setCurrentDetails({ 
    ability: '科研能力',
    count: researchCount.value,
    courses: teachingCourses.value.join(', '), 
    personnelList
  });
}
// 定义点击处理方法
// 管理能力对应的课程列表（原有结构）
const managementCourses = computed(() => { 
  const filtered = (batchAnalysisResults.value as any[]).filter(item => item.ability === '管理能力');
  console.log('[管理能力] 筛选后的人员列表（用于提取课程）:', filtered); // 新增日志
  const courses = [...new Set(filtered.map(item => item.recommendedCourses))]; // 原有逻辑
  console.log('[管理能力] 原始recommendedCourses数组:', courses); // 新增日志
  return courses;
})

// 管理点击处理方法（原有结构）
const handleTrainingDetailsClick_management = () => { 
  const trainingStore = useTrainingStore();
  const personnelList = JSON.parse(JSON.stringify(batchAnalysisResults.value.filter(item => 
    managementKeywords.some(keyword => (item as any).abilityShortcomings?.includes(keyword))
  )));
  console.log('[管理点击] 筛选的personnelList:', personnelList); // 新增日志
  console.log('[管理点击] 传递的courses（来自managementCourses）:', managementCourses.value); // 新增日志
  trainingStore.setCurrentDetails({ 
    ability: '管理能力',
    count: managementCount.value,
    courses: managementCourses.value.join(', '), 
    personnelList
  });
}
onMounted(() => {
    if (trainingChart.value) {
        // 初始化图表
        const chart = echarts.init(trainingChart.value);
        // 模拟培训需求数据，初始使用默认值
        const data = [
            { value: teachingCount.value, name: '教学能力' },
            { value: researchCount.value, name: '科研能力' },
            { value: managementCount.value, name: '管理能力' }
        ];
        // 配置图表选项
        const option = {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '培训需求',
                    type: 'pie',
                    radius: '50%',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)' 
                        }
                    }
                }
            ]
        };
        // 设置图表选项
        chart.setOption(option);
    }
});
// 更新图表数据的函数
const updateChart = () => {
    if (trainingChart.value) {
        const chart = echarts.init(trainingChart.value);
        const data = [
            { value: teachingCount.value, name: '教学能力' },
            { value: researchCount.value, name: '科研能力' },
            { value: managementCount.value, name: '管理能力' }
        ];
        const option = {
            series: [
                {
                    data: data
                }
            ]
        };
        chart.setOption(option);
    }
};
    // 定义各能力维度对应的关键字
    const teachingKeywords = ['教育', '教学','课程','学生'];
    const researchKeywords = ['科研', '学术','知识','技术'];
    const managementKeywords = ['管理', '决策'];
// 2.2 批量分析人员培训需求
// 添加响应式变量存储批量分析结果
const batchAnalysisResults = ref([]);

const fetchBatchAnalysis = async () => {
  try {
    const response = await getBatchTrainingAnalysis([1, 2, 3, 4, 5, 6, 7, 8]);
    // 重置计数
    teachingCount.value = 0;
    researchCount.value = 0;
    managementCount.value = 0;
    // 检查 response.data.data 是否为数组
    if (Array.isArray(response.data.data)) {
      // 遍历响应数据，统计各能力维度的需培训人数
      response.data.data.forEach((item: any) => {
        const abilityShortcomings = item.abilityShortcomings;
        
        // 检查是否包含教学能力相关关键字
        if (teachingKeywords.some(keyword => abilityShortcomings.includes(keyword))) {
          teachingCount.value++;
        }
        // 检查是否包含科研能力相关关键字
        if (researchKeywords.some(keyword => abilityShortcomings.includes(keyword))) {
          researchCount.value++;
        }
        // 检查是否包含管理能力相关关键字
        if (managementKeywords.some(keyword => abilityShortcomings.includes(keyword))) {
          managementCount.value++;
        }
      });

      updateChart();
      console.log('批量人员培训需求分析结果:', response.data.data);
      // 存储批量分析结果
      batchAnalysisResults.value = response.data.data;
      // alert('批量分析人员培训需求成功，表格已更新，请查看！');
    } else {
      console.error('返回数据格式错误，response.data.data 不是数组:', response.data.data);
      // alert('批量分析人员培训需求失败，返回数据格式错误！');
    }
  } catch (error) {
    console.error('请求失败:', error);
    // alert('批量分析人员培训需求失败，请查看控制台输出！');
  }
};

// 2.3 根据培训课程筛选人员
const fetchScreenedPersonnel = async () => {
  try {
    const response = await getScreenedPersonnel('科研项目管理培训课程');
    console.log('适合参加培训的人员列表:', response.data);
    // alert('根据课程筛选人员成功，请查看控制台输出！');
  } catch (error) {
    console.error('请求失败:', error);
    // alert('根据课程筛选人员失败，请查看控制台输出！');
  }
};

// 2.4 生成培训人员名单
const fetchTrainingList = async () => {
  try {
    const response = await getTrainingList('科研项目管理培训课程');
    console.log('培训人员名单:', response.data);
    // alert('生成培训人员名单成功，请查看控制台输出！');
  } catch (error) {
    console.error('请求失败:', error);
    // alert('生成培训人员名单失败，请查看控制台输出！');
  }
};
onMounted(() => {
    fetchBatchAnalysis();
    fetchScreenedPersonnel();
    fetchTrainingList();
}
);
// 新增响应式数据
const personnelId = ref<number>(0);
const trainingCourse = ref<string>('');
const trainingPriority = ref<number>(0);

// 保存人员培训信息函数
const saveTrainingInfo = async () => {
  try {
    const trainingDTO = {
      personnelId: personnelId.value,
      trainingCourse: trainingCourse.value,
      trainingPriority: trainingPriority.value
    };
    const response = await saveTrainingRecords(trainingDTO);
    if (response.data.code === 200) {
  ElMessage.success({
    message: '保存成功！',
    type: 'success'
  })
      // 清空表单
      personnelId.value = 0;
      trainingCourse.value = '';
      trainingPriority.value = 0;
    }
  } catch (error) {
    console.error('保存人员培训信息失败:', error);
    alert('保存人员培训信息失败，请查看控制台输出！');
  }
};
</script>


<style src="../components/style.css" scoped>
</style>
