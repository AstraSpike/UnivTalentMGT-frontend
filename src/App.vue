<template>
  <div class="container" v-if="!$route.meta.hideLayout">
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
  <router-view v-else />
</template>

<script setup lang="ts" name="App">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterView, RouterLink } from 'vue-router';

const router = useRouter()
const route = useRoute()
const isFullScreen = ref(false);
const currentPath = ref('');

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
</script>

<style src="./components/style.css">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;
}

/* 添加全屏样式 */
.main-content.full-screen {
  margin-left: 0 !important;
  padding: 0 !important;
  height: 100vh;
  width: 100vw;
}

/* 确保全屏时无滚动条 */
body:fullscreen .main-content,
body:-webkit-full-screen .main-content,
body:-moz-full-screen .main-content {
  height: 100%;
  width: 100%;
}

/* 侧边栏基础样式 */
.nav-menu .nav-link {
  display: block;
  text-decoration: none;
}

/* 侧边栏选中样式 - 保持与你现有CSS一致 */
.nav-item {
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.nav-item:hover, .nav-item.active {
    background-color: #1890ff;
    color: white; /* 添加文字颜色，提高可读性 */
}

.nav-item i {
    margin-right: 10px;
}
</style>    