<template>
   <div class="container" v-if="!$route.meta.hideLayout">
        <!-- 侧边栏导航 -->
        <div class="sidebar">
            <div class="logo">
                <h2>干部教师管理系统</h2>
            </div>
            <div class="nav-menu">
              <Router-link to="/">
                <div class="nav-item">
                  <i>📊</i>分析看板
                </div>
              </Router-link>
              <Router-link to="/person_kb">
                <div class="nav-item">
                    <i>👥</i>人员看板
                  </div>
              </Router-link>
              <Router-link to="/team_analysis">
                <div class="nav-item">  
                    <i>👥</i>班子分析
                  </div>  
              </Router-link>
              <Router-link to="/profile_list">
                <div class="nav-item">
                    <i>👤</i>干部教师画像
                  </div>  
              </Router-link>
              <Router-link to="/talent">
                <div class="nav-item">
                    <i>📈</i>梯队建设
                  </div>  
              </Router-link>
              <Router-link to="/department_communication">
                <div class="nav-item">
                    <i>📩</i>部门对接
                  </div>  
              </Router-link>
              <Router-link to="/training">
                <div class="nav-item">
                    <i>🎓</i>培训筛选
                  </div>
              </Router-link>
        </div>
  </div>
        <div class="main-content">
          <div class="header">
						        <h2>欢迎您</h2>
						        <div class="user-info">
                      <Router-link to="/userinfo">
						            <div class="user-avatar">管</div>
						            <span>管理员</span>
                      </Router-link>
						        </div>
						    </div>
            <router-view></router-view>
        </div>
    </div>
    <router-view v-else />
  </template>
  <script setup lang="ts" name="App">
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { RouterView, RouterLink } from 'vue-router';

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
</style>