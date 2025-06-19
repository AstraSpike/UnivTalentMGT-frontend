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
          <!-- <button class="edit-button" @click="handleEdit">
            <i class="fa fa-edit"></i> 编辑
          </button> -->
        </div>
      </div>
    </header>

    <!-- 个人信息卡片 -->
    <div class="profile-card">
      <div class="card-header">
        <div class="cover-image"></div>
      </div>
      
      <div class="card-body">
        <div class="avatar-container">
          <img :src="user.avatar" alt="用户头像" class="avatar">
        </div>
        
        <div class="user-info">
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-position">{{ user.department }} | {{ user.title }}</p>
          
          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-value">{{ user.stats.courses }}</div>
              <div class="stat-label">课程</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ user.stats.students }}</div>
              <div class="stat-label">学生</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ user.stats.projects }}</div>
              <div class="stat-label">项目</div>
            </div>
          </div>
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
            <div class="item-value">{{ user.id }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">邮箱</div>
            <div class="item-value">{{ user.email }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">电话</div>
            <div class="item-value">{{ user.phone }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">出生日期</div>
            <div class="item-value">{{ user.birthday }}</div>
          </div>
        </div>
      </div>
      
      <!-- 详细信息 -->
      <div class="info-section">
        <h3 class="section-title">详细信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="item-label">姓名</div>
            <div class="item-value">{{ user.detail.name }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">性别</div>
            <div class="item-value">{{ user.detail.gender }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">政治面貌</div>
            <div class="item-value">{{ user.detail.politicalStatus }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">职称</div>
            <div class="item-value">{{ user.detail.title }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">学历</div>
            <div class="item-value">{{ user.detail.education }}</div>
          </div>
          <div class="info-item">
            <div class="item-label">入职日期</div>
            <div class="item-value">{{ user.detail.hireDate }}</div>
          </div>
        </div>
      </div>
      
      <!-- 安全设置 -->
      <div class="info-section">
        <h3 class="section-title">安全设置</h3>
        <div class="security-items">
          <div class="security-item" @click="handleChangePassword">
            <div class="item-icon">
              <i class="fa fa-lock"></i>
            </div>
            <div class="item-info">
              <div class="item-title">密码</div>
              <div class="item-subtitle">上次修改: {{ user.security.passwordLastModified }}</div>
            </div>
            <div class="item-action">
              <i class="fa fa-angle-right"></i>
            </div>
          </div>
          
          <div class="security-item" @click="handleViewVerification">
            <div class="item-icon">
              <i class="fa fa-shield"></i>
            </div>
            <div class="item-info">
              <div class="item-title">实名认证</div>
              <div class="item-subtitle text-success">已认证</div>
            </div>
            <div class="item-action">
              <i class="fa fa-angle-right"></i>
            </div>
          </div>
          
          <div class="security-item" @click="handleChangePhone">
            <div class="item-icon">
              <i class="fa fa-mobile"></i>
            </div>
            <div class="item-info">
              <div class="item-title">手机号</div>
              <div class="item-subtitle">已绑定: {{ user.security.phone }}</div>
            </div>
            <div class="item-action">
              <i class="fa fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 账户管理 -->
      <div class="info-section">
        <h3 class="section-title">账户管理</h3>
        <div class="security-items">
          <div class="security-item" @click="handleViewLoginHistory">
            <div class="item-icon">
              <i class="fa fa-history"></i>
            </div>
            <div class="item-info">
              <div class="item-title">登录记录</div>
            </div>
            <div class="item-action">
              <i class="fa fa-angle-right"></i>
            </div>
          </div>
          
          <div class="security-item" @click="handleNotificationSettings">
            <div class="item-icon">
              <i class="fa fa-bell"></i>
            </div>
            <div class="item-info">
              <div class="item-title">通知设置</div>
            </div>
            <div class="item-action">
              <i class="fa fa-angle-right"></i>
            </div>
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

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 引入路由
const router = useRouter();

// 用户数据
const user = ref({
  id: '201800123',
  name: '张教授',
  avatar: 'https://picsum.photos/200/200?random=1',
  department: '计算机科学系',
  title: '教授',
  email: 'zhang@example.com',
  phone: '138****5678',
  birthday: '1985-03-12',
  detail: {
    name: '张三',
    gender: '男',
    politicalStatus: '中共党员',
    title: '教授',
    education: '博士',
    hireDate: '2012-09-01'
  },
  stats: {
    courses: 24,
    students: 128,
    projects: 8
  },
  security: {
    passwordLastModified: '3个月前',
    verified: true,
    phone: '138****5678',
    phoneVerified: true
  }
});

// 交互功能处理函数
const handleEdit = () => {
  console.log('编辑个人资料');
  router.push('/userInfo/edit'); // 导航到编辑页面
};

const handleChangePassword = () => {
  console.log('触发修改密码逻辑');
  // 此处可添加打开密码修改模态框的逻辑
};

const handleViewVerification = () => {
  console.log('查看实名认证详情');
  // 此处可添加打开认证详情页的逻辑
};

const handleChangePhone = () => {
  console.log('修改手机号');
  // 此处可添加打开手机号修改页面的逻辑
};

const handleViewLoginHistory = () => {
  console.log('查看登录记录');
  router.push('/userInfo/loginHistory'); // 导航到登录记录页面
};

const handleNotificationSettings = () => {
  console.log('通知设置');
  router.push('/userInfo/notifications'); // 导航到通知设置页面
};

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    console.log('执行退出登录');
    localStorage.removeItem('token'); // 清除登录凭证
    router.push('/'); // 导航到登录页
  }
};

const goBack = () => {
  router.go(-1); // 返回上一页
};
</script>

<style scoped>
/* 导入字体图标 */
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');

/* 基础样式 */
:root {
  --primary-color: #165DFF;
  --text-color: #333;
  --text-secondary-color: #666;
  --text-tertiary-color: #999;
  --bg-color: #f9f9f9;
  --card-bg: #fff;
  --border-color: #e0e0e0;
  --hover-bg: #f5f5f5;
  --success-color: #36D399;
  --error-color: #F87272;
}

.user-profile-container {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  height: 200px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 顶部导航栏样式 */
.user-header {
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-right: 60%;
}

.back-button {
  color: var(--text-secondary-color);
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: var(--hover-bg);
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

.edit-button {
  color: var(--primary-color);
  font-weight: 500;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.edit-button:hover {
  opacity: 0.8;
}

/* 个人信息卡片样式 */
.profile-card {
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 24px 16px;
  overflow: hidden;
}

.card-header {
  height: 120px;
  background: linear-gradient(135deg, var(--primary-color), rgba(22, 93, 255, 0.8));
  position: relative;
}

.cover-image {
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.3;
}

.card-body {
  padding: 0 24px 24px;
  margin-top: -48px;
  position: relative;
  z-index: 10;
}

.avatar-container {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto 16px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  text-align: center;
}

.user-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.user-position {
  font-size: 14px;
  color: var(--text-secondary-color);
  margin-bottom: 16px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat-item {
  background-color: var(--hover-bg);
  border-radius: 8px;
  padding: 12px 8px;
  transition: background-color 0.2s;
}

.stat-item:hover {
  background-color: #f0f0f0;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 12px;
  color: var(--text-tertiary-color);
}

/* 信息展示区域样式 */
.info-container {
  margin: 0 16px 24px;
}

.info-section {
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  overflow: hidden;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  padding: 16px 24px;
}

@media (min-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.info-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.item-label {
  font-size: 14px;
  color: var(--text-tertiary-color);
  margin-bottom: 4px;
}

.item-value {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
}

/* 安全设置项样式 */
.security-items {
  padding: 8px 0;
}

.security-item {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.security-item:hover {
  background-color: var(--hover-bg);
}

.item-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(22, 93, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  margin-right: 16px;
}

.item-info {
  flex-grow: 1;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
}

.item-subtitle {
  font-size: 12px;
  color: var(--text-tertiary-color);
}

.text-success {
  color: var(--success-color);
}

.item-action {
  color: var(--text-tertiary-color);
}

/* 底部操作按钮样式 */
.action-footer {
  margin: 0 16px 24px;
}

.logout-button {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background-color: rgba(248, 114, 114, 0.1);
  color: #F87272;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: rgba(248, 114, 114, 0.2);
}
</style>