<template>
  <div v-if="!$route.meta.hideLayout">
    <div class="container">
      <!-- 侧边栏导航 -->
      <div class="sidebar" v-show="!isFullScreen" :class="{ 'sidebar-hidden': isFullScreen }">
        <div class="logo">
          <h2>干部教师管理系统</h2>
        </div>
        <div class="nav-menu">
          <div 
            v-for="item in menuItems" 
            :key="item.path"
            @click="navigateTo(item.path)"
            class="nav-link"
          >
            <div 
              class="nav-item"
              :class="{ 'active': currentPath === item.path }"
            >
              <i>{{ item.icon }}</i>{{ item.title }}
            </div>
          </div>
        </div>
        
        <!-- 优化后的绘画按钮 -->
        <button @click="toggleDrawing" class="drawing-button">
          <i class="fa fa-pencil"></i>
          <span>开启涂画</span>
        </button>
      </div>
      
      <div class="main-content" :class="{ 'full-screen': isFullScreen }">
        <div class="header">
          <h2>欢迎您</h2>
          <div class="user-info">
            <RouterLink to="/userinfo">
              <div class="user-avatar">管</div>
              <span>管理员</span>
            </RouterLink>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <!-- 添加对toggleDrawing事件的监听 -->
    <DrawingComponent 
      :isDrawingEnabled="isDrawingEnabled" 
      @toggleDrawing="toggleDrawing" 
    />
  </div>
  <div v-else>
    <!-- 添加对toggleDrawing事件的监听 -->
    <DrawingComponent 
      :isDrawingEnabled="isDrawingEnabled" 
      @toggleDrawing="toggleDrawing" 
    />
    <router-view />
  </div>
</template>

<script setup lang="ts" name="App">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterView, RouterLink } from 'vue-router';
import DrawingComponent from './views/DrawingComponent.vue';

const router = useRouter()
const route = useRoute()
const isFullScreen = ref(false);
const currentPath = ref('');
const isDrawingEnabled = ref(false);

// 定义菜单项数组
const menuItems = [
  { path: '/home', title: '分析看板', icon: '📊' },
  { path: '/person_kb', title: '人员看板', icon: '👥' },
  { path: '/team_analysis', title: '班子分析', icon: '👥' },
  { path: '/profile_list', title: '干部教师画像', icon: '👤' },
  { path: '/talent', title: '梯队建设', icon: '📈' },
  { path: '/department_communication', title: '部门对接', icon: '📩' },
  { path: '/training', title: '培训筛选', icon: '🎓' },
]

// 导航函数
const navigateTo = (path: string) => {
  router.push(path);
}

// 监听路由变化
watch(() => route.path, (newPath) => {
  currentPath.value = newPath;
});

// 初始化当前路径
onMounted(() => {
  currentPath.value = route.path;
  
  window.addEventListener('toggleFullScreen', (e: any) => {
    isFullScreen.value = e.detail;
  });
});

const toggleDrawing = () => {
  isDrawingEnabled.value = !isDrawingEnabled.value;
};
</script>

<style>
/* 基础重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  color: #333;
  background-color: #f9f9f9;
}

/* 容器样式 */
.container {
  display: flex;
  min-height: 100vh;
}

/* 侧边栏样式 */
.sidebar {
  width: 240px;
  background-color: #f8fafc;
  border-right: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: fixed;
  height: 100%;
  overflow-y: auto;
  z-index: 10;
}

.sidebar-hidden {
  transform: translateX(-240px);
}

.logo {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.logo h2 {
  font-size: 20px;
  color: #1890ff;
  font-weight: 600;
}

.nav-menu {
  padding: 10px 0;
}

.nav-link {
  text-decoration: none;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s;
  color: #e2e8f0; /* 侧边栏文字颜色 */
}

.nav-item:hover {
  background-color: #e6f7ff;
  color: #096dd9;
}

.nav-item.active {
  background-color: #1890ff;
  color: white;
  font-weight: 500;
  border-right: 3px solid #096dd9;
}

.nav-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

/* 绘画按钮样式 */
.drawing-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 16px;
  padding: 12px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.drawing-button:hover {
  background-color: #096dd9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.drawing-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.drawing-button i {
  font-size: 16px;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  margin-left: 220px;
  transition: all 0.3s ease;
  padding: 20px;
}

.main-content.full-screen {
  margin-left: 0;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: #1890ff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* 确保引入 Font Awesome */
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');
</style>