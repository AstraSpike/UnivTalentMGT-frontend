<template>
  <div class="person-detail-container">
    <div class="detail-header">
      <h2>人员详细信息</h2>
      <button @click="goBack">返回</button>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" class="error-message">
      <i class="fa fa-exclamation-circle"></i>
      <span>{{ error }}</span>
      <button @click="retry">重试</button>
    </div>

    <!-- 加载状态 -->
    <div v-else-if="loading" class="skeleton">
      <div class="skeleton-header"></div>
      <div class="skeleton-section">
        <div class="skeleton-title"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
      </div>
      <div class="skeleton-section">
        <div class="skeleton-title"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
      </div>
    </div>

    <!-- 数据显示 -->
    <div v-else-if="personInfo" class="detail-content">
      <div class="basic-info">
        <h3>基本信息</h3>
        <div class="info-row">
          <span class="label">姓名：</span>
          <span class="value">{{ baseInfo?.name?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">性别：</span>
          <span class="value">{{ baseInfo?.gender?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">年龄：</span>
          <span class="value">{{ baseInfo?.age?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">院系：</span>
          <span class="value">{{ baseInfo?.department?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">职务：</span>
          <span class="value">{{ baseInfo?.position?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">职称：</span>
          <span class="value">{{ baseInfo?.title?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">入职时间：</span>
          <span class="value">{{ baseInfo?.entryTime?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">学历：</span>
          <span class="value">{{ baseInfo?.education?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">毕业院校：</span>
          <span class="value">{{ baseInfo?.university?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">专业：</span>
          <span class="value">{{ baseInfo?.major?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">邮箱：</span>
          <span class="value">{{ baseInfo?.email?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">电话：</span>
          <span class="value">{{ baseInfo?.phone?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">政治面貌：</span>
          <span class="value">{{ baseInfo?.politicalStatus?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">籍贯：</span>
          <span class="value">{{ baseInfo?.nativePlace?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">婚姻状况：</span>
          <span class="value">{{ baseInfo?.maritalStatus?? '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">民族：</span>
          <span class="value">{{ baseInfo?.ethnicity?? '-' }}</span>
        </div>
      </div>
      <div class="other-info">
        <h3>其他信息</h3>
        <div class="info-row">
          <span class="label">身份证号：</span>
          <span class="value">{{ personInfo.idCardNumber }}</span>
        </div>
        <div class="info-row">
          <span class="label">紧急联系人：</span>
          <span class="value">{{ personInfo.emergencyContactName }}</span>
        </div>
        <div class="info-row">
          <span class="label">紧急联系人电话：</span>
          <span class="value">{{ personInfo.emergencyContactPhone }}</span>
        </div>
        <div class="info-row">
          <span class="label">家庭住址：</span>
          <span class="value">{{ personInfo.homeAddress }}</span>
  </div>
         <div class="info-row">
    <span class="label">教授课程：</span>
    <span class="value">{{ personInfo.teachingCourses }}</span>
  </div>
  <div class="info-row">
    <span class="label">课时数：</span>
    <span class="value">{{ personInfo.courseHours }}</span>
  </div>
  <div class="info-row">
    <span class="label">教学班级数：</span>
    <span class="value">{{ personInfo.teachingClasses }}</span>
  </div>
  <div class="info-row">
    <span class="label">教学评分：</span>
    <span class="value">{{ personInfo.teachingEvaluationScore }}</span>
  </div>
  <div class="info-row">
    <span class="label">教学奖项：</span>
    <span class="value">{{ personInfo.teachingAwards }}</span>
  </div>
  <div class="info-row">
    <span class="label">教学材料：</span>
    <span class="value">{{ personInfo.teachingMaterials }}</span>
  </div>
  
  <!-- 科研信息 -->
  <div class="info-row">
    <span class="label">科研期刊：</span>
    <span class="value">{{ personInfo.researchJournals }}</span>
  </div>
  <div class="info-row">
    <span class="label">科研论文：</span>
    <span class="value">{{ personInfo.researchPapers }}</span>
  </div>
  <div class="info-row">
    <span class="label">发表时间：</span>
    <span class="value">{{ personInfo.publicationTime }}</span>
  </div>
  <div class="info-row">
    <span class="label">影响因子：</span>
    <span class="value">{{ personInfo.impactFactor }}</span>
  </div>
  <div class="info-row">
    <span class="label">科研项目：</span>
    <span class="value">{{ personInfo.researchProjects }}</span>
  </div>
  <div class="info-row">
    <span class="label">项目编号：</span>
    <span class="value">{{ personInfo.projectNumbers }}</span>
  </div>
  <div class="info-row">
    <span class="label">项目经费：</span>
    <span class="value">{{ personInfo.projectFunds }}</span>
  </div>
  <div class="info-row">
    <span class="label">项目周期：</span>
    <span class="value">{{ personInfo.projectTimePeriod }}</span>
  </div>
  <div class="info-row">
    <span class="label">专利：</span>
    <span class="value">{{ personInfo.patents }}</span>
  </div>
  <div class="info-row">
    <span class="label">专利类型：</span>
    <span class="value">{{ personInfo.patentTypes }}</span>
  </div>
  <div class="info-row">
    <span class="label">专利授权时间：</span>
    <span class="value">{{ personInfo.patentAuthorizationTime }}</span>
  </div>
  
  <!-- 管理信息 -->
  <div class="info-row">
    <span class="label">管理部门：</span>
    <span class="value">{{ personInfo.managementDepartments }}</span>
  </div>
  <div class="info-row">
    <span class="label">管理职责：</span>
    <span class="value">{{ personInfo.managementResponsibilities }}</span>
  </div>
  <div class="info-row">
    <span class="label">管理团队规模：</span>
    <span class="value">{{ personInfo.managementTeamSize }}</span>
  </div>
  <div class="info-row">
    <span class="label">管理决策：</span>
    <span class="value">{{ personInfo.managementDecisions }}</span>
  </div>
  
  <!-- 培训信息 -->
  <div class="info-row">
    <span class="label">培训名称：</span>
    <span class="value">{{ personInfo.trainingNames }}</span>
  </div>
  <div class="info-row">
    <span class="label">培训时间：</span>
    <span class="value">{{ personInfo.trainingTimes }}</span>
  </div>
  <div class="info-row">
    <span class="label">培训地点：</span>
    <span class="value">{{ personInfo.trainingLocations }}</span>
  </div>
  <div class="info-row">
    <span class="label">培训内容：</span>
    <span class="value">{{ personInfo.trainingContents }}</span>
  </div>
  <div class="info-row">
    <span class="label">培训证书：</span>
    <span class="value">{{ personInfo.trainingCertificates }}</span>
  </div>
  
  <!-- 系统信息 -->
  <div class="info-row">
    <span class="label">创建时间：</span>
    <span class="value">{{ personInfo.createTime }}</span>
  </div>
  <div class="info-row">
    <span class="label">更新时间：</span>
    <span class="value">{{ personInfo.updateTime }}</span>
  </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PersonnelService from '../service/personnelService.js';
import { CircleClose } from '@element-plus/icons-vue';

// 人员信息接口 - 调整id类型为string或number
interface Person {
  id: string | number;
  personnelId: number;
  idCardNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  homeAddress: string;
  teachingCourses: string;
  courseHours: number;
  teachingClasses: number;
  teachingEvaluationScore: number;
  teachingAwards: string;
  teachingMaterials: string;
  researchJournals: string;
  researchPapers: string;
  publicationTime: string;
  impactFactor: number;
  researchProjects: string;
  projectNumbers: string;
  projectFunds: number;
  projectTimePeriod: string;
  patents: string;
  patentTypes: string;
  patentAuthorizationTime: string;
  managementDepartments: string;
  managementResponsibilities: string;
  managementTeamSize: number;
  managementDecisions: string;
  trainingNames: string;
  trainingTimes: string;
  trainingLocations: string;
  trainingContents: string;
  trainingCertificates: string;
  createTime: string;
  updateTime: string;
  name?: string;
  gender?: string;
  age?: number;
  department?: string;
  position?: string;
  title?: string;
  entryTime?: Date;
  education?: string;
  university?: string;
  major?: string;
  email?: string;
  phone?: string;
  politicalStatus?: string;
  nativePlace?: string;
  maritalStatus?: string;
  ethnicity?: string;
}

// 状态管理
const route = useRoute();
const router = useRouter();
const personInfo = ref<Person | null>(null);
const loading = ref(false);
const error = ref('');
const baseInfo = ref<Person | null>(null);
// 判断是否为有效人员数据 - 调整id验证逻辑
const isValidPerson = (data: any): data is Person => {
  if (!data) {
    console.log('数据为空');
    return false;
  }
  // 添加日志输出
  console.log('id 的值:', data.id);
  console.log('id 的类型:', typeof data.id);

  // 允许id为字符串或数字类型
  const isIdValid = typeof data.id === 'string' || typeof data.id === 'number';

  // 修改 personnelId 验证逻辑
  const isPersonnelIdValid = typeof data.personnelId === 'number' ||!isNaN(parseFloat(data.personnelId)) && isFinite(Number(data.personnelId));

  const checks = [
    { condition: isIdValid, field: 'id' },
    { condition: isPersonnelIdValid, field: 'personnelId' },
    { condition: typeof data.idCardNumber === 'string', field: 'idCardNumber' },
    { condition: typeof data.emergencyContactName === 'string', field: 'emergencyContactName' },
    { condition: typeof data.emergencyContactPhone === 'string', field: 'emergencyContactPhone' },
    { condition: typeof data.homeAddress === 'string', field: 'homeAddress' },
    { condition: typeof data.teachingCourses === 'string', field: 'teachingCourses' },
    { condition: typeof data.courseHours === 'number', field: 'courseHours' },
    { condition: typeof data.teachingClasses === 'number', field: 'teachingClasses' },
    { condition: typeof data.teachingEvaluationScore === 'number', field: 'teachingEvaluationScore' },
    { condition: typeof data.teachingAwards === 'string', field: 'teachingAwards' },
    { condition: typeof data.teachingMaterials === 'string', field: 'teachingMaterials' },
    { condition: typeof data.researchJournals === 'string', field: 'researchJournals' },
    { condition: typeof data.researchPapers === 'string', field: 'researchPapers' },
    { condition: typeof data.publicationTime === 'string', field: 'publicationTime' },
    { condition: typeof data.impactFactor === 'number', field: 'impactFactor' },
    { condition: typeof data.researchProjects === 'string', field: 'researchProjects' },
    { condition: typeof data.projectNumbers === 'string', field: 'projectNumbers' },
    { condition: typeof data.projectFunds === 'number', field: 'projectFunds' },
    { condition: typeof data.projectTimePeriod === 'string', field: 'projectTimePeriod' },
    { condition: typeof data.patents === 'string', field: 'patents' },
    { condition: typeof data.patentTypes === 'string', field: 'patentTypes' },
    { condition: typeof data.patentAuthorizationTime === 'string', field: 'patentAuthorizationTime' },
    { condition: typeof data.managementDepartments === 'string', field: 'managementDepartments' },
    { condition: typeof data.managementResponsibilities === 'string', field: 'managementResponsibilities' },
    { condition: typeof data.managementTeamSize === 'number', field: 'managementTeamSize' },
    { condition: typeof data.managementDecisions === 'string', field: 'managementDecisions' },
    { condition: typeof data.trainingNames === 'string', field: 'trainingNames' },
    { condition: typeof data.trainingTimes === 'string', field: 'trainingTimes' },
    { condition: typeof data.trainingLocations === 'string', field: 'trainingLocations' },
    { condition: typeof data.trainingContents === 'string', field: 'trainingContents' },
    { condition: typeof data.trainingCertificates === 'string', field: 'trainingCertificates' },
    { condition: typeof data.createTime === 'string', field: 'createTime' },
    { condition: typeof data.updateTime === 'string', field: 'updateTime' },
  ];

  const failedCheck = checks.find(check => !check.condition);
  if (failedCheck) {
    console.log(`字段 ${failedCheck.field} 验证失败`);
    return false;
  }

  return true;
};

// 获取人员详情
const fetchPersonDetail = async () => {
  loading.value = true;
  error.value = '';
  try {
    // 获取路由参数中的人员ID
    const idParam = route.params.id;
    // 添加日志输出
    console.log('获取到的 idParam:', idParam);

    // 简化ID转换逻辑，直接使用字符串或数字
    let id: string | number;
    if (typeof idParam === 'string') {
      // 尝试解析为数字，如果失败则保留字符串
      const numId = parseInt(idParam, 10);
      id = isNaN(numId) ? idParam : numId;
    } else {
// 处理 idParam 为数组的情况，这里简单取数组的第一个元素并尝试转换为合适的类型
if (Array.isArray(idParam)) {
  const firstId = idParam[0];
  if (typeof firstId === 'string') {
    const numId = parseInt(firstId, 10);
    id = isNaN(numId) ? firstId : numId;
  } else {
    id = firstId;
  }
} else {
  id = idParam;
}
    }

    // 检查ID是否有效
    if (!id) throw new Error('无效的人员ID');

    // 获取数据
    const res = await PersonnelService.getPersonnelDetail(id);
    console.log('接口返回的数据:', res);

    // 这里需要根据实际情况调整，如果接口返回的数据是 { success: true, message: '...', data: {...} } 结构
    const actualData = res.data || res;

    // 验证数据结构
    if (!isValidPerson(actualData)) {
      throw new Error('获取的数据格式不正确');
    }

    personInfo.value = actualData;
    console.log('人员详情:', personInfo.value);
  } catch (err: any) {
    error.value = err.message || '获取人员详情失败';
    console.error('获取人员详情失败:', err);
  } finally {
    loading.value = false;
  }
};

// 返回上一页
const goBack = () => {
  // 如果有上一页则返回，否则返回首页
  if (router.currentRoute.value.meta?.backPath) {
    router.push(router.currentRoute.value.meta.backPath as string);
  } else if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push('/');
  }
};

// 重试获取数据
const retry = () => {
  fetchPersonDetail();
};


onMounted(() => {
    const basicInfo = route.query.basicInfo ? JSON.parse(route.query.basicInfo as string) : null;
    if (basicInfo) {
        // 使用展开运算符确保深度合并
        baseInfo.value = {
            ...baseInfo.value, // 保留初始值
            ...basicInfo // 用basicInfo覆盖
        };
        console.log('合并后的baseInfo:', baseInfo.value);
    }
    
    fetchPersonDetail();
});
    console.log('baseInfo:',baseInfo.value)
</script>

<style scoped>
/* 基本样式 */
.person-detail-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.detail-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.info-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.label {
  width: 120px;
  color: #606266;
}

.value {
  flex: 1;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #fef0f0;
  color: #f56c6c;
  border-radius: 4px;
  margin-bottom: 20px;
}

.skeleton {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.skeleton-header,
.skeleton-title,
.skeleton-row {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 10px;
}

.skeleton-header {
  height: 30px;
  width: 200px;
  margin-bottom: 20px;
}

.skeleton-title {
  height: 24px;
  width: 100px;
  margin-bottom: 15px;
}

.skeleton-row {
  height: 20px;
  width: 100%;
}

.skeleton-section {
  margin-bottom: 20px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
