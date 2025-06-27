<template>
  <div class="user-profile-container">
    <!-- 顶部导航栏 -->
    <header class="user-header">
      <div class="container">
        <div class="header-content">
          <div class="back-button" @click="goBack">
            <i class="fa fa-arrow-left"></i>
          </div>
          <h1 class="header-title">个人信息</h1>
        </div>
      </div>
    </header>

    <!-- 个人信息卡片 -->
    <div class="profile-card">
      <div class="card-header">
        <div class="cover-image"></div>
      </div>
      
      <div class="card-body">
        <div class="user-info">
          <h2 class="user-name">{{ baseInfo?.name?? '-' }}</h2>
          <p class="user-position">{{ baseInfo?.department?? '-' }} | {{ baseInfo?.title?? '-' }}</p>
        </div>
      </div>
    </div>
    
    <!-- 信息展示区域 -->
    <div class="info-container">
      <!-- 基本信息 -->
      <div class="info-section">
        <h3 class="section-title">基本信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="item-label">工号</div>
            <div class="item-value">{{ baseInfo?.id?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">邮箱</div>
            <div class="item-value">{{ baseInfo?.email?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">电话</div>
            <div class="item-value">{{ baseInfo?.phone?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">出生日期</div>
            <div class="item-value">{{ baseInfo?.birthday?? '-' }}</div>
          </div>
        </div>
      </div>
      
      <!-- 详细信息 -->
      <div class="info-section">
        <h3 class="section-title">详细信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="item-label">姓名</div>
            <div class="item-value">{{  baseInfo?.name?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">性别</div>
            <div class="item-value">{{ baseInfo?.gender?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">政治面貌</div>
            <div class="item-value">{{ baseInfo?.politicalStatus?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">职称</div>
            <div class="item-value">{{ baseInfo?.title?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">学历</div>
            <div class="item-value">{{ baseInfo?.education?? '-' }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">入职日期</div>
            <div class="item-value">{{ baseInfo?.entryTime?? '-' }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部操作按钮 -->
    <div class="action-footer">
      <button class="logout-button" @click="handleLogout">
        <i class="fa fa-sign-out"></i> 退出登录
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios';

// 定义用户详细信息接口
interface user {
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
  detailInfo?: any;
    // 添加以下两个属性
    research?: number;
    teaching?: number;
}
// 定义 props
const props = defineProps<{
  id?: string | number;
  baseInfo?: user | null;
}>();
const baseInfo = ref<user | null>(props.baseInfo ?? null);

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const error = ref('');

const getLoginUserId = (): string | number | null => {
  const token = sessionStorage.getItem('token');
  try {
    if (token) {
 const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payloadBase64 = tokenParts[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        if (payload.user) {
          return payload.user;
        }
      }
    }
  } catch (e) { 
    console.error('获取用户 id 失败:', e); 
  } 
  console.log('token:', token); 
  return null; 
}

const fetchBasicInfo = async (id: string | number) => {
  loading.value = true;
  error.value = '';
  try {
    const response = await axios.get(`/basic`);
    console.log('response:', response);
    if (Array.isArray(response.data)) {
      const matchedData = response.data.find(item => {
        return String(item.id) === String(id);
      });
      if (matchedData) {
        baseInfo.value = matchedData;
        console.log('baseInfo:', baseInfo.value);
      }
    } else {
      console.error('接口返回数据不是数组');
    }
  } catch (err) {
    error.value = '获取基础信息失败';
    console.error('获取基础信息失败:', err);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
    const basicInfo = route.query.basicInfo ? JSON.parse(route.query.basicInfo as string) : null;
    if (basicInfo) {
        baseInfo.value = {
            ...baseInfo.value,
            ...basicInfo
        };
        console.log('合并后的baseInfo:', baseInfo.value);
        isValidPerson(baseInfo.value);
    }
    const userId = getLoginUserId();
    console.log('userId:', userId);
  if (userId) {
    fetchBasicInfo(userId);
  }
});
const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    console.log('执行退出登录');
    localStorage.removeItem('token'); 
    router.push('/'); 
  }
};

const goBack = () => {
  router.go(-1); 
};
const isValidPerson = (data: any): data is user => {
  if (!data) {
    console.log('数据为空');
    return false;
  }
  console.log('id 的值:', data.id);
  console.log('id 的类型:', typeof data.id);

  const isIdValid = typeof data.id === 'string' || typeof data.id === 'number';
  const isPersonnelIdValid = typeof data.personnelId === 'number' ||!isNaN(parseFloat(data.personnelId)) && isFinite(Number(data.personnelId));

  const checks = [
    { condition: isIdValid, field: 'id' },
  ];

  const failedCheck = checks.find(check => !check.condition);
  if (failedCheck) {
    console.log(`字段 ${failedCheck.field} 验证失败`);
    return false;
  }
  return true;
}
</script>

<style scoped>
/* 导入字体图标 */
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');

:root {
  --primary-color: #4361ee;      /* 柔和蓝色作为主色调 */
  --primary-light: #6a89cc;     /* 主色浅色 */
  --secondary-color: #3a0ca3;    /* 深紫色作为辅助色 */
  --text-color: #1e293b;        /* 深色文本 */
  --text-secondary: #475569;     /* 次深色文本 */
  --text-tertiary: #94a3b8;     /* 浅色文本 */
  --bg-color: #e3f2fd;          /* 天蓝色背景 */
  --card-bg: #ffffff;           /* 卡片背景 */
  --border-color: #e2e8f0;       /* 边框色 */
  --success-color: #10b981;      /* 成功色 */
  --warning-color: #f59e0b;      /* 警告色 */
  --danger-color: #ef4444;       /* 危险色 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.user-profile-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 顶部导航栏样式 */
.user-header {
  background-color: var(--card-bg);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 3.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.back-button {
  color: var(--text-secondary);
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #f1f5f9;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

/* 个人信息卡片样式 */
.profile-card {
  background-color: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  margin: 2rem 1.5rem 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.card-header {
  height: 8rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, var(--primary-color), var(--primary-light));
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.card-body {
  padding: 0 2rem 2rem;
  margin-top: -3.5rem;
  position: relative;
  z-index: 10;
}

.user-info {
  text-align: center;
}

.user-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.user-position {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.user-position i {
  color: var(--primary-color);
}

/* 信息展示区域样式 */
.info-container {
  margin: 0 1.5rem 2rem;
}

.info-section {
  background-color: var(--card-bg);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-section:hover {
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  padding: 1.5rem 2rem;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.info-item {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item:hover {
  background-color: #f8fafc;
  border-radius: var(--radius-md);
}

.item-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.item-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  line-height: 1.5;
}

/* 底部操作按钮样式 */
.action-footer {
  margin: 0 1.5rem 2rem;
}

.logout-button {
  width: 100%;
  padding: 1rem;
  border-radius: var(--radius-xl);
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  border: 1px solid var(--danger-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.1);
}

.logout-button i {
  margin-right: 0.5rem;
}
</style>