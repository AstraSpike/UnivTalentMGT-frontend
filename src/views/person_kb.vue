<template>
<div id="personnel-kanban-page" class="page">
			    <div class="filter-bar">
			        <div class="filter-item">
			            <label>院系</label>
			            <select>
			                <option>全部院系</option>
			                <option>文学院</option>
			                <option>理学院</option>
			                <option>工学院</option>
			            </select>
			        </div>
			        <div class="filter-item">
			            <label>职务</label>
			            <select>
			                <option>全部职务</option>
			                <option>教师</option>
			                <option>行政人员</option>
			                <option>管理人员</option>
			            </select>
			        </div>
			        <div class="filter-item">
			            <label>职称</label>
			            <select>
			                <option>全部职称</option>
			                <option>教授</option>
			                <option>副教授</option>
			                <option>讲师</option>
			            </select>
			        </div>
			        <button class="btn">查询</button>
			        <button class="btn btn-secondary">重置</button>
			    </div>
			
			    <div class="kanban-view-options">
			        <div class="view-option" :class="{ active: currentView === 'card' }" @click="changeKanbanView('card')">卡片视图</div>
			        <div class="view-option" :class="{ active: currentView === 'list' }" @click="changeKanbanView('list')">列表视图</div>
			    </div>
			
			    <!-- 卡片视图 -->
			    <div v-if="currentView === 'card'" id="card-view" class="personnel-kanban">
			        <div 
			            class="personnel-card" 
			            v-for="person in personnelList" 
			            :key="person.id"
			        >
			            <div class="personnel-card-header">
			                <div class="personnel-avatar">{{ person.name.charAt(0) }}</div>
			                <div>
			                    <div class="personnel-name">{{ person.name }}</div>
			                    <div class="personnel-position">{{ person.department }} · {{ person.position }}</div>
			                </div>
			            </div>
			            <div class="personnel-details">
			                <div class="detail-row">
			                    <div class="detail-label">性别</div>
			                    <div>{{ person.gender }}</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">年龄</div>
			                    <div>{{ person.age }}岁</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">入职时间</div>
			                    <div>{{ person.hireDate }}</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">学历</div>
			                    <div>{{ person.education }}</div>
			                </div>
			            </div>
			            <div class="personnel-tags">
							<span 
        class="tag" 
        :class="'tag-' + tag"
        v-for="tag in person.tags" 
        :key="tag"
    >
        {{ tag }}
    </span>
			            </div>
			            <div class="view-more">
			                <RouterLink 
			                    :to="`/person/detail/${person.id}`"
			                    class="detail-link"
			                >
			                    查看详情
			                </RouterLink>
			            </div>
			        </div>
			    </div>
			
			    <!-- 列表视图 -->
			    <div v-if="currentView === 'list'" id="list-view" class="page">
			        <div class="card">
			            <div class="card-title">
			                <span>人员列表</span>
			                <button class="btn" @click="exportExcel">导出Excel</button>
			            </div>
			            <div class="table-container">
			                <table>
			                    <thead>
			                        <tr>
			                            <th>姓名</th>
			                            <th>性别</th>
			                            <th>年龄</th>
			                            <th>院系</th>
			                            <th>职务</th>
			                            <th>职称</th>
			                            <th>学历</th>
			                            <th>标签</th>
			                            <th>操作</th>
			                        </tr>
			                    </thead>
			                    <tbody>
			                        <tr v-for="person in personnelList" :key="person.name">
			                            <td>{{ person.name }}</td>
			                            <td>{{ person.gender }}</td>
			                            <td>{{ person.age }}</td>
			                            <td>{{ person.department }}</td>
			                            <td>{{ person.position }}</td>
			                            <td>{{ person.title }}</td>
			                            <td>{{ person.education }}</td>
			                            <td>
			                                <span v-for="tag in person.tags" :key="tag.name" :class="'tag tag-' + tag.type">
			                                    {{ tag}}
			                                </span>
			                            </td>
			                            <RouterLink :to="`/person/detail/${person.id}`">
			                            查看详情
			                            </RouterLink>
			                        </tr>
			                    </tbody>
			                </table>
			            </div>
			            <div class="pagination">
			                <div class="page-item active">1</div>
			                <div class="page-item">2</div>
			                <div class="page-item">3</div>
			                <div class="page-item">...</div>
			                <div class="page-item">10</div>
			            </div>
			        </div>
			    </div>
			    <!--筛查选项设置-->
			    <div class="card">
			        <div class="card-title">筛查选项设置</div>
			        <div class="screening-options">
			            <div class="option-group">
			                <div class="option-group-title">教学能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox" checked> 教学名师</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox" checked> 优秀课程负责人</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 教学创新能手</label>
			                </div>
			            </div>
			            <div class="option-group">
			                <div class="option-group-title">科研能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox" checked> 科研领军人才</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 核心期刊高产作者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 专利达人</label>
			                </div>
			            </div>
			            <div class="option-group">
			                <div class="option-group-title">管理能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 优秀管理者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 高效协调者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 战略规划专家</label>
			                </div>
			            </div>
			            <div class="option-group">
			                <div class="option-group-title">创新能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 创新技术先锋</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 模式创新开拓者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 教学方法革新者</label>
			                </div>
			            </div>
			        </div>
			        <div class="form-actions">
			            <button class="btn">应用筛选</button>
			            <button class="btn btn-secondary">保存筛选方案</button>
			        </div>
			    </div>
			
			    <!-- 会议场景适配 -->
			    <div class="card">
			        <div class="card-title">会议场景适配</div>
			        <!-- 修改按钮点击事件 -->
			        <button class="btn" @click="toggleFullScreenMode">
			          {{ isFullScreen ? '退出沉浸会议模式' : '进入沉浸会议模式' }}
			        </button>
			    </div>
			</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
const isFullScreen = ref(false);

// 全屏模式切换方法
const toggleFullScreenMode = () => {
  isFullScreen.value = !isFullScreen.value;

  // 发送事件通知App.vue更新侧边栏状态
  window.dispatchEvent(new CustomEvent('toggleFullScreen', {
    detail: isFullScreen.value
  }));

  // 浏览器全屏API操作
  if (isFullScreen.value) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};
const router = useRouter();
const currentView = ref('card');
const listChart = ref(null);
// 移除表格视图图表引用
// const tableChart = ref(null); 
// 在script部分添加
const personnelList = ref([
    {
        id: 1,
        name: '张教授',
        department: '文学院',
        position: '教授',
		title: '教授',
        gender: '男',
        age: 45,
        hireDate: '2005-08-15',
        education: '博士',
        tags: ['教学名师', '科研骨干', '创新能手']
    },
    { id:2,name: '李副教授', 
	gender: '女', 
	age: 38, 
	department: '理学院',
	 position: '教师', 
	 title: '副教授', 
	 education: '博士', 
	 hireDate: '2005-08-15',
	 tags: ['科研骨干']},
  // ... 其他人员数据
]);

// 切换视图类型
const changeKanbanView = (viewType) => {
  currentView.value = viewType;
};

// 查看详情
const showProfileDetail = (person) => {
  console.log('查看详情:', person);
  router.push({ name: 'profile-detail-page', params: { personId: person.id } });
};

// 导出Excel
const exportExcel = () => {
  console.log('开始导出Excel...');
  // 这里可以添加实际的导出逻辑
};
onMounted(() => {
  if (currentView.value === 'list') {
    initListChart();
  }
});
</script>

<style src="../components/style.css" scoped>
  /* 可以添加一些基本的样式 */
  .view-option {
    cursor: pointer;
    padding: 8px 16px;
    border: 1px solid #ccc;
    margin-right: 8px;
  }
  .view-option.active {
    background-color: #007bff;
    color: white;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
/* 添加全屏状态下的内容样式 */
#personnel-kanban-page.full-screen {
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}
/* 全屏时卡片占满屏幕 */
.full-screen .card {
  margin: 0;
  border-radius: 0;
  height: 100vh;
}
.personnel-tags {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
}

.tag {
    display: inline-block;
    padding: 2px 8px;
    margin-right: 6px;
    margin-bottom: 6px;
    border-radius: 12px;
    font-size: 12px;
    color: white;
    background-color: #666;
}

/* 确保颜色类名与数据中的标签匹配 */
.tag-教学名师 { background-color: #1890ff; }
.tag-科研骨干 { background-color: #52c41a; }
.tag-创新能手 { background-color: #faad14; }
.tag-优秀管理者 { background-color: #722ed1; }

.tag-teaching {
    background-color: #1890ff;
}

.tag-research {
    background-color: #52c41a;
}

.tag-management {
    background-color: #722ed1;
}

.tag-innovation {
    background-color: #faad14;
}

/* 悬停效果 */
.tag:hover {
    opacity: 0.8;
    transform: translateY(-1px);
    transition: all 0.2s ease;
}
</style>