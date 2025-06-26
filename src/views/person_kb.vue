<template>
    <div id="personnel-kanban-page" class="page">
        <div class="filter-bar">
            <div class="filter-item">
                <label>院系</label>
                <select v-model="selectedDepartment">
                    <option value="">全部院系</option>
                    <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                </select>
            </div>
            <div class="filter-item">
                <label>职务</label>
                <select v-model="selectedPosition">
                    <option value="">全部职务</option>
                    <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
            </div>
            <div class="filter-item">
                <label>职称</label>
                <select v-model="selectedTitle">
                    <option value="">全部职称</option>
                    <option v-for="title in titles" :key="title" :value="title">{{ title }}</option>
                </select>
            </div>
            <button class="btn" @click="fetchPersonnel">查询</button>
            <button class="btn btn-secondary" @click="resetFilters">重置</button>
        </div>

        <div class="kanban-view-options">
            <div class="view-option" :class="{ active: currentView === 'card' }" @click="changeKanbanView('card')">卡片视图</div>
            <div class="view-option" :class="{ active: currentView === 'list' }" @click="changeKanbanView('list')">列表视图</div>
        </div>

        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
            <p>加载中...</p>
        </div>

        <div v-else-if="errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
            <button class="btn" @click="fetchPersonnel">重试</button>
        </div>

        <!-- 卡片视图 -->
        <div v-if="currentView === 'card' && personnelList.length > 0" id="card-view" class="personnel-kanban">
            <div 
                class="personnel-card" 
                v-for="person in filteredPersonnel" 
                :key="person.id"
                @click="showProfileDetail(person)"
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
                        <div>{{ person.gender === 'male' ? '男' : '女' }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">年龄</div>
                        <div>{{ person.age }}岁</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">入职时间</div>
                        <div>{{ formatDate(person.entryTime) }}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">学历</div>
                        <div>{{ person.education }}</div>
                    </div>
                </div>
                <div class="personnel-tags">
                    <span 
                        class="tag" 
                        :class="'tag-' + tag.tagName"
                        v-for="tag in person.tags" 
                        :key="tag.id"
                    >
                        {{ tag.tagName }}
                    </span>
                </div>
            </div>
        </div>

        <div v-else-if="currentView === 'card' && personnelList.length === 0" class="empty-state">
            <p>暂无人员数据</p>
        </div>

        <!-- 列表视图 -->
        <div v-if="currentView === 'list' && personnelList.length > 0" id="list-view" class="page">
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
                                <th>晋升概率</th>
                                <th>标签</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="person in filteredPersonnel" :key="person.id">
                                <td>{{ person.name }}</td>
                                <td>{{ person.gender === 'male' ? '男' : '女' }}</td>
                                <td>{{ person.age }}</td>
                                <td>{{ person.department }}</td>
                                <td>{{ person.position }}</td>
                                <td>{{ person.title }}</td>
                                <td>{{ person.education }}</td>
                                <td>{{ person.prochance || 0 }}%</td>
                                <td>
                                    <span v-for="tag in person.tags" :key="tag.id" :class="'tag tag-' + tag.tagName">
                                        {{ tag.tagName }}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-sm" @click="showProfileDetail(person)">查看详情</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination">
                    <div class="page-item" :class="{ active: currentPage === 1 }" @click="currentPage = 1">1</div>
                    <div class="page-item" :class="{ active: currentPage === 2 }" @click="currentPage = 2">2</div>
                    <div class="page-item" :class="{ active: currentPage === 3 }" @click="currentPage = 3">3</div>
                    <div class="page-item">...</div>
                    <div class="page-item" :class="{ active: currentPage === totalPages }" @click="currentPage = totalPages">{{ totalPages }}</div>
                </div>
            </div>
        </div>

        <div v-else-if="currentView === 'list' && personnelList.length === 0" class="empty-state">
            <p>暂无人员数据</p>
        </div>

        <!--筛查选项设置-->
        <div class="card">
            <div class="card-title">筛查选项设置</div>
            <div class="screening-options">
                <div class="option-group">
                    <div class="option-group-title">教学能力标签</div>
                    <div class="option-item" v-for="tag in teachingTags" :key="tag.id">
                        <label><input type="checkbox" v-model="selectedTags" :value="tag.tagName">{{ tag.tagName }}</label>
                    </div>
                </div>
                <div class="option-group">
                    <div class="option-group-title">科研能力标签</div>
                    <div class="option-item" v-for="tag in researchTags" :key="tag.id">
                        <label><input type="checkbox" v-model="selectedTags" :value="tag.tagName">{{ tag.tagName }}</label>
                    </div>
                </div>
                <div class="option-group">
                    <div class="option-group-title">管理能力标签</div>
                    <div class="option-item" v-for="tag in managementTags" :key="tag.id">
                        <label><input type="checkbox" v-model="selectedTags" :value="tag.tagName">{{ tag.tagName }}</label>
                    </div>
                </div>
                <div class="option-group">
                    <div class="option-group-title">创新能力标签</div>
                    <div class="option-item" v-for="tag in innovationTags" :key="tag.id">
                        <label><input type="checkbox" v-model="selectedTags" :value="tag.tagName">{{ tag.tagName }}</label>
                    </div>
                </div>
            </div>
            <div class="form-actions">
                <button class="btn" @click="applyFilters">应用筛选</button>
                <button class="btn btn-secondary">保存筛选方案</button>
            </div>
        </div>

        <!-- 会议场景适配 -->
        <div class="card">
            <div class="card-title">会议场景适配</div>
            <button class="btn" @click="toggleFullScreenMode">
                {{ isFullScreen ? '退出沉浸会议模式' : '进入沉浸会议模式' }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed,onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
import axios from 'axios';

// 定义人员数据类型
interface Person {
    id: number;
    name: string;
    gender: 'male' | 'female';
    age: number;
    position: string;
    title: string;
    department: string;
    entryTime: string;
    education: string;
    degree: string;
    university: string;
    major: string;
    phone: string;
    email: string;
    politicalStatus: string;
    nativePlace: string;
    maritalStatus: string;
    ethnicity: string;
    tags: {
        id: number;
        tagName: string;
        tagType: string;
        createTime: string;
        updateTime: string;
    }[];
    prochance?: number;
    detailInfo?: any;
}

const isFullScreen = ref(false);
const router = useRouter();
const currentView = ref('card');
const listChart = ref(null);
const loading = ref(false);
const errorMessage = ref('');
const personnelList = ref<Person[]>([]);
const filteredPersonnel = computed(() => {
    return personnelList.value.filter(person => {
        const departmentMatch = !selectedDepartment.value || person.department === selectedDepartment.value;
        const positionMatch = !selectedPosition.value || person.position === selectedPosition.value;
        const titleMatch = !selectedTitle.value || person.title === selectedTitle.value;
        
        let tagMatch = true;
        if (selectedTags.value.length > 0) {
            tagMatch = person.tags.some(tag => selectedTags.value.includes(tag.tagName));
        }
        
        return departmentMatch && positionMatch && titleMatch && tagMatch;
    });
});

// 筛选条件
const selectedDepartment = ref('');
const selectedPosition = ref('');
const selectedTitle = ref('');
const selectedTags = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

// 计算属性
const totalPages = computed(() => {
    return Math.ceil(filteredPersonnel.value.length / itemsPerPage.value);
});

// 预定义的标签分类
const teachingTags = ref([
    { id: 1, tagName: '教学名师', tagType: '教学能力' },
    { id: 2, tagName: '优秀课程负责人', tagType: '教学能力' },
    { id: 3, tagName: '教学创新能手', tagType: '教学能力' }
]);

const researchTags = ref([
    { id: 4, tagName: '科研领军人才', tagType: '科研能力' },
    { id: 5, tagName: '核心期刊高产作者', tagType: '科研能力' },
    { id: 6, tagName: '专利达人', tagType: '科研能力' }
]);

const managementTags = ref([
    { id: 7, tagName: '优秀管理者', tagType: '管理能力' },
    { id: 8, tagName: '高效协调者', tagType: '管理能力' },
    { id: 9, tagName: '战略规划专家', tagType: '管理能力' }
]);

const innovationTags = ref([
    { id: 10, tagName: '创新技术先锋', tagType: '创新能力' },
    { id: 11, tagName: '模式创新开拓者', tagType: '创新能力' },
    { id: 12, tagName: '教学方法革新者', tagType: '创新能力' }
]);

// 自动提取的筛选选项
const departments = computed(() => {
    const depts = new Set<string>();
    personnelList.value.forEach(person => depts.add(person.department));
    return Array.from(depts).sort();
});

const positions = computed(() => {
    const pos = new Set<string>();
// 原代码中使用了未定义的 depts，应使用当前作用域下的 pos 集合
personnelList.value.forEach(person => pos.add(person.position));
    return Array.from(pos).sort();
});

const titles = computed(() => {
    const titles = new Set<string>();
    personnelList.value.forEach(person => titles.add(person.title));
    return Array.from(titles).sort();
});

const toggleFullScreenMode = () => {
	isFullScreen.value = !isFullScreen.value;
  
	// 发送事件通知App.vue更新侧边栏状态
	window.dispatchEvent(new CustomEvent('toggleFullScreen', {
	  detail: isFullScreen.value
	}));
  
	if (isFullScreen.value) {
	  if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	  }
	} else {
	  if (document.exitFullscreen) {
		document.exitFullscreen();
	  }
	}
  };

// 切换视图类型
const changeKanbanView = (viewType: string) => {
    currentView.value = viewType;
    if (viewType === 'list') {
        initListChart();
    }
};

//初始化列表图表
const initListChart = () => {
    if (!listChart.value) return;
    const chart = echarts.init(listChart.value);

    // 统计各类标签数量
    const tagCounts = {};
    personnelList.value.forEach(person => {
        person.tags.forEach(tag => {
// 为 tagCounts 定义明确的类型，解决隐式 any 类型问题
const tagCounts: { [key: string]: number } = {};
if (tagCounts[tag.tagName]) {
                tagCounts[tag.tagName]++;
            } else {
                tagCounts[tag.tagName] = 1;
            }
        });
    });

    const tagData = Object.entries(tagCounts).map(([tagName, count]) => ({
        name: tagName,
        value: count
    }));

    // 设置图表配置
    chart.setOption({
        title: {
            text: '人员标签分布'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: tagData.map(item => item.name)
        },
        yAxis: {},
        series: [{
            name: '标签数量',
            type: 'bar',
            data: tagData.map(item => item.value)
        }]
    });
};
// 导出Excel
const exportExcel = () => {
    console.log('开始导出Excel...');
    // 这里可以添加实际的导出逻辑
};

// 格式化日期
const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

// 获取人员数据
const fetchPersonnel = async () => {
    loading.value = true;
    errorMessage.value = '';
    
    try {
        const response = await axios.get('/basic');
        
        if (response.status === 200) {
            personnelList.value = response.data.map((person: Person) => ({
                ...person,
                // 将entryTime转换为更友好的格式
                entryTime: formatDate(person.entryTime),
                // 确保prochance存在
                prochance: person.prochance || 0
            }));
        } else {
            errorMessage.value = `请求失败 (${response.status}): ${response.statusText}`;
        }
    } catch (error: any) {
        console.error('获取人员数据失败:', error);
        errorMessage.value = `请求错误: ${error.message}`;
    } finally {
        loading.value = false;
    }
};
// 查看详情
const showProfileDetail = (person: Person | number) => {
    let personId: number;
    let basicInfo = {};
    if (typeof person === 'number') {
        personId = person;
    } else {
        personId = person.id;
        basicInfo = {
            name: person.name,
            gender: person.gender === 'male' ? '男' : '女', // 确保格式匹配
            age: person.age,
            department: person.department,
            position: person.position,
            title: person.title,
            entryTime: person.entryTime,
            university: person.university,
            major:person.major,
            phone: person.phone,
            email: person.email,
            politicalStatus:person.politicalStatus,
            education:person.education,
            nativePlace:person.nativePlace,
            maritalStatus:person.maritalStatus,
            ethnicity:person.ethnicity
        };
    }
    router.push({ 
        name: 'PersonDetail', 
        params: { id: personId },
        query: { basicInfo: JSON.stringify(basicInfo) }
    });
};
// 重置筛选条件
const resetFilters = () => {
    selectedDepartment.value = '';
    selectedPosition.value = '';
    selectedTitle.value = '';
    selectedTags.value = [];
    currentPage.value = 1;
};

// 应用筛选条件
const applyFilters = () => {
    currentPage.value = 1; // 重置页码
};

onMounted(() => {
    fetchPersonnel();
    if (currentView.value === 'list') {
        initListChart();
    }
    
    // 监听窗口大小变化，更新图表
    window.addEventListener('resize', () => {
        if (currentView.value === 'list' && listChart.value) {
            const chart = echarts.init(listChart.value);
            chart.resize();
        }
    });
});

// 清理
onUnmounted(() => {
    window.removeEventListener('resize', () => {
        if (listChart.value) {
            const chart = echarts.init(listChart.value);
            chart.dispose();
        }
    });
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