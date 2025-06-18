<template>
    <div class="user-profile">
      <!-- 顶部导航栏 -->
      <header class="navbar">
        <div class="container">
          <div class="nav-left">
            <router-link to="/" class="back-button">
              <i class="fa fa-arrow-left"></i>
            </router-link>
            <h1 class="title">个人信息</h1>
          </div>
          <div class="nav-right">
            <button @click="handleEdit" class="edit-button">
              <i class="fa fa-edit mr-1"></i> 编辑
            </button>
          </div>
        </div>
      </header>
  
      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 个人信息卡片 -->
        <div class="profile-card fade-in">
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
        
        <!-- 基本信息卡片 -->
        <div class="info-card fade-in" :style="{animationDelay: '0.1s'}">
          <h3 class="card-title">基本信息</h3>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="icon-container bg-blue">
                <i class="fa fa-id-card"></i>
              </div>
              <div class="info-content">
                <p class="info-label">工号</p>
                <p class="info-value">{{ user.id }}</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="icon-container bg-green">
                <i class="fa fa-envelope"></i>
              </div>
              <div class="info-content">
                <p class="info-label">邮箱</p>
                <p class="info-value">{{ user.email }}</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="icon-container bg-purple">
                <i class="fa fa-phone"></i>
              </div>
              <div class="info-content">
                <p class="info-label">电话</p>
                <p class="info-value">{{ user.phone }}</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="icon-container bg-orange">
                <i class="fa fa-birthday-cake"></i>
              </div>
              <div class="info-content">
                <p class="info-label">出生日期</p>
                <p class="info-value">{{ user.birthday }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 详细信息卡片 -->
        <div class="detail-card fade-in" :style="{animationDelay: '0.2s'}">
          <h3 class="card-title">详细信息</h3>
          
          <div class="detail-items">
            <div class="detail-item">
              <div class="detail-label">姓名</div>
              <div class="detail-value">{{ user.detail.name }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">性别</div>
              <div class="detail-value">{{ user.detail.gender }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">政治面貌</div>
              <div class="detail-value">{{ user.detail.politicalStatus }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">职称</div>
              <div class="detail-value">{{ user.detail.title }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">学历</div>
              <div class="detail-value">{{ user.detail.education }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">入职日期</div>
              <div class="detail-value">{{ user.detail.hireDate }}</div>
            </div>
          </div>
        </div>
        
        <!-- 安全设置卡片 -->
        <div class="security-card fade-in" :style="{animationDelay: '0.3s'}">
          <h3 class="card-title">安全设置</h3>
          
          <div class="security-items">
            <div class="security-item">
              <div class="security-left">
                <div class="security-icon">
                  <i class="fa fa-lock"></i>
                </div>
                <div class="security-info">
                  <div class="security-title">密码</div>
                  <div class="security-subtitle">上次修改: {{ user.security.passwordLastModified }}</div>
                </div>
              </div>
              <button @click="handleChangePassword" class="security-action">修改</button>
            </div>
            
            <div class="security-item">
              <div class="security-left">
                <div class="security-icon">
                  <i class="fa fa-shield"></i>
                </div>
                <div class="security-info">
                  <div class="security-title">实名认证</div>
                  <div class="security-subtitle text-green">已认证</div>
                </div>
              </div>
              <button @click="handleViewVerification" class="security-action">查看</button>
            </div>
            
            <div class="security-item">
              <div class="security-left">
                <div class="security-icon">
                  <i class="fa fa-mobile"></i>
                </div>
                <div class="security-info">
                  <div class="security-title">手机号</div>
                  <div class="security-subtitle">已绑定: {{ user.security.phone }}</div>
                </div>
              </div>
              <button @click="handleChangePhone" class="security-action">修改</button>
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="action-container fade-in" :style="{animationDelay: '0.4s'}">
          <div class="action-info">
            <h3 class="action-title">账户管理</h3>
            <p class="action-subtitle">管理您的账户设置和隐私选项</p>
          </div>
          
          <div class="action-buttons">
            <button @click="handleViewLoginHistory" class="action-button">
              <i class="fa fa-history mr-1"></i> 登录记录
            </button>
            
            <button @click="handleNotificationSettings" class="action-button">
              <i class="fa fa-bell mr-1"></i> 通知设置
            </button>
            
            <button @click="handleLogout" class="action-button logout-button">
              <i class="fa fa-sign-out mr-1"></i> 退出登录
            </button>
          </div>
        </div>
      </main>
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
      router.push('/login'); // 导航到登录页
    }
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
  
  .user-profile {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: var(--bg-color);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  /* 导航栏样式 */
  .navbar {
    background-color: var(--card-bg);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }
  
  .nav-left {
    display: flex;
    align-items: center;
  }
  
  .back-button {
    color: var(--text-secondary-color);
    margin-right: 16px;
    transition: color 0.2s;
  }
  
  .back-button:hover {
    color: var(--primary-color);
  }
  
  .title {
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
    color: var(--primary-color);
    opacity: 0.8;
  }
  
  /* 主要内容样式 */
  .main-content {
    flex-grow: 1;
    padding: 24px 0;
  }
  
  /* 卡片通用样式 */
  .profile-card,
  .info-card,
  .detail-card,
  .security-card,
  .action-container {
    background-color: var(--card-bg);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
    overflow: hidden;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 20px;
  }
  
  /* 个人信息卡片样式 */
  .profile-card {
    position: relative;
  }
  
  .card-header {
    height: 120px;
    background: linear-gradient(to right, var(--primary-color), rgba(22, 93, 255, 0.8));
    position: relative;
  }
  
  .cover-image {
    height: 100%;
    position: relative;
  }
  
  .cover-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to top, white, transparent);
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
    padding: 8px;
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
  
  /* 基本信息卡片样式 */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  @media (min-width: 768px) {
    .info-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .info-item {
    display: flex;
    align-items: center;
  }
  
  .icon-container {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    color: white;
  }
  
  .bg-blue {
    background-color: rgba(59, 130, 246, 0.1);
    color: #3B82F6;
  }
  
  .bg-green {
    background-color: rgba(16, 185, 129, 0.1);
    color: #10B981;
  }
  
  .bg-purple {
    background-color: rgba(139, 92, 246, 0.1);
    color: #8B5CF6;
  }
  
  .bg-orange {
    background-color: rgba(249, 115, 22, 0.1);
    color: #F97316;
  }
  
  .info-content {
    flex-grow: 1;
  }
  
  .info-label {
    font-size: 12px;
    color: var(--text-tertiary-color);
  }
  
  .info-value {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
  }
  
  /* 详细信息卡片样式 */
  .detail-items {
    display: flex;
    flex-direction: column;
  }
  
  .detail-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .detail-item:last-child {
    border-bottom: none;
  }
  
  .detail-label {
    font-size: 14px;
    color: var(--text-secondary-color);
  }
  
  .detail-value {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
  }
  
  /* 安全设置卡片样式 */
  .security-items {
    display: flex;
    flex-direction: column;
  }
  
  .security-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .security-item:last-child {
    border-bottom: none;
  }
  
  .security-left {
    display: flex;
    align-items: center;
  }
  
  .security-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--hover-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary-color);
    margin-right: 16px;
  }
  
  .security-info {
    display: flex;
    flex-direction: column;
  }
  
  .security-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
  }
  
  .security-subtitle {
    font-size: 12px;
    color: var(--text-tertiary-color);
  }
  
  .text-green {
    color: var(--success-color);
  }
  
  .security-action {
    color: var(--primary-color);
    font-size: 14px;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .security-action:hover {
    color: rgba(22, 93, 255, 0.8);
  }
  
  /* 操作按钮样式 */
  .action-container {
    padding: 24px;
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .action-container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .action-info {
    margin-bottom: 16px;
  }
  
  @media (min-width: 768px) {
    .action-info {
      margin-bottom: 0;
    }
  }
  
  .action-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 4px;
  }
  
  .action-subtitle {
    font-size: 12px;
    color: var(--text-tertiary-color);
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  @media (min-width: 768px) {
    .action-buttons {
      flex-direction: row;
    }
  }
  
  .action-button {
    padding: 10px 16px;
    border-radius: 8px;
    background-color: var(--hover-bg);
    color: var(--text-secondary-color);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .action-button:hover {
    background-color: #f0f0f0;
  }
  
  .logout-button {
    background-color: rgba(248, 114, 114, 0.1);
    color: #F87272;
  }
  
  .logout-button:hover {
    background-color: rgba(248, 114, 114, 0.2);
  }
  
  /* 淡入动画 */
  .fade-in {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeIn 0.5s ease forwards;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>