<template>
  <div class="department-communication-container">
    <!-- 标签页切换 -->
    <div class="tabs">
      <div 
        class="tab" 
        :class="{ active: currentTab === 'create-demand' }"
        @click="showTab('create-demand')"
      >发起需求</div>
      <div 
        class="tab" 
        :class="{ active: currentTab === 'my-demands' }"
        @click="showTab('my-demands')"
      >我的需求</div>
      <div 
        class="tab" 
        :class="{ active: currentTab === 'todo-list' }"
        @click="showTab('todo-list')"
      >待办任务</div>
      <div 
        class="tab" 
        :class="{ active: currentTab === 'completed-tasks' }"
        @click="showTab('completed-tasks')"
      >已完成任务</div>
    </div>
    
    <!-- 标签页内容区域 -->
    <div class="tab-content">
      <!-- 发起需求 -->
      <div v-if="currentTab === 'create-demand'" class="tab-pane">
        <div class="card">
          <div class="card-title">发起新需求</div>
          <div class="form-container">
            <div class="form-group">
              <label class="form-label">需求标题</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="demandForm.title"
                placeholder="请输入需求标题"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">需求类型</label>
              <select class="form-control" v-model="demandForm.type">
                <option value="新专业建设">新专业建设</option>
                <option value="岗位补充">岗位补充</option>
                <option value="实验室建设">实验室建设</option>
                <option value="其他">其他</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">需求详情</label>
              <textarea 
                class="form-control" 
                v-model="demandForm.detail"
                rows="4"
                placeholder="请输入需求详情"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">期望完成时间</label>
              <input 
                type="date" 
                class="form-control" 
                v-model="demandForm.expectedDate"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">需求岗位</label>
              <div v-for="(position, index) in demandForm.positions" :key="index" class="position-item">
                <div class="row">
                  <div class="col-md-3">
                    <label class="form-label">岗位类型</label>
                    <select class="form-control" v-model="position.type">
                      <option value="专业负责人">专业负责人</option>
                      <option value="骨干教师">骨干教师</option>
                      <option value="普通教师">普通教师</option>
                      <option value="实验员">实验员</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">职称要求</label>
                    <select class="form-control" v-model="position.level">
                      <option value="教授">教授</option>
                      <option value="副教授">副教授</option>
                      <option value="讲师">讲师</option>
                      <option value="助教">助教</option>
                      <option value="不限">不限</option>
                    </select>
                  </div>
                  <div class="col-md-2">
                    <label class="form-label">人数</label>
                    <input type="number" class="form-control" v-model.number="position.count">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">专业要求</label>
                    <input type="text" class="form-control" v-model="position.major">
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-12">
                    <label class="form-label">其他要求</label>
                    <input type="text" class="form-control" v-model="position.otherRequirements">
                  </div>
                </div>
                <button 
                  v-if="demandForm.positions.length > 1" 
                  class="btn btn-secondary mt-2"
                  @click="removePosition(index)"
                >
                  删除岗位
                </button>
              </div>
              <button class="btn btn-primary mt-3" @click="addPosition">
                添加岗位
              </button>
            </div>
            
            <div class="form-group">
              <label class="form-label">附件（可选）</label>
              <input type="file" class="form-control" @change="handleFileUpload">
              <div v-if="demandForm.attachment" class="mt-2">
                已选择文件: {{ demandForm.attachment.name }}
              </div>
            </div>
            
            <div class="form-group mt-4">
              <button class="btn btn-primary" @click="submitDemand">提交需求</button>
              <button class="btn btn-secondary ml-2" @click="resetDemandForm">重置</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 我的需求 -->
      <div v-if="currentTab === 'my-demands'" class="tab-pane">
        <div class="card">
          <div class="card-title">我的需求</div>
          
          <!-- 筛选条件 -->
          <div class="filter-bar">
            <div class="filter-item">
              <label>状态:</label>
              <select v-model="myDemandsFilter.status">
                <option value="全部">全部</option>
                <option value="待处理">待处理</option>
                <option value="处理中">处理中</option>
                <option value="已完成">已完成</option>
                <option value="已关闭">已关闭</option>
              </select>
            </div>
            <div class="filter-item">
              <label>开始日期:</label>
              <input type="date" v-model="myDemandsFilter.startDate">
            </div>
            <div class="filter-item">
              <label>结束日期:</label>
              <input type="date" v-model="myDemandsFilter.endDate">
            </div>
            <button class="btn btn-primary" @click="filterMyDemands">筛选</button>
          </div>
          
          <!-- 需求列表 -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>需求ID</th>
                  <th>标题</th>
                  <th>类型</th>
                  <th>提交日期</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="demand in filteredMyDemands" :key="demand.id">
                  <td>{{ demand.id }}</td>
                  <td>{{ demand.title }}</td>
                  <td>{{ demand.type }}</td>
                  <td>{{ demand.submitDate }}</td>
                  <td><span :class="getStatusClass(demand.status)">{{ demand.status }}</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="showDemandDetail(demand.id)">
                      查看详情
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div class="pagination">
            <div class="page-item" @click="currentPage = currentPage - 1" :class="{ disabled: currentPage === 1 }">
              上一页
            </div>
            <div class="page-item active">{{ currentPage }}</div>
            <div class="page-item" @click="currentPage = currentPage + 1">下一页</div>
          </div>
        </div>
      </div>
      
      <!-- 待办任务 -->
      <div v-if="currentTab === 'todo-list'" class="tab-pane">
        <div class="card">
          <div class="card-title">待办任务</div>
          
          <!-- 筛选条件 -->
          <div class="filter-bar">
            <div class="filter-item">
              <label>优先级:</label>
              <select v-model="todoFilter.priority">
                <option value="全部">全部</option>
                <option value="高">高</option>
                <option value="中">中</option>
                <option value="低">低</option>
              </select>
            </div>
            <div class="filter-item">
              <label>类型:</label>
              <select v-model="todoFilter.type">
                <option value="全部类型">全部类型</option>
                <option value="新专业建设">新专业建设</option>
                <option value="岗位补充">岗位补充</option>
                <option value="实验室建设">实验室建设</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <button class="btn btn-primary" @click="filterTodoTasks">筛选</button>
          </div>
          
          <!-- 任务列表 -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>需求ID</th>
                  <th>标题</th>
                  <th>类型</th>
                  <th>提交日期</th>
                  <th>优先级</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in filteredTodoTasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.type }}</td>
                  <td>{{ task.submitDate }}</td>
                  <td><span :class="getPriorityClass(task.priority)">{{ task.priority }}</span></td>
                  <td><span :class="getStatusClass(task.status)">{{ task.status }}</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="showDemandDetail(task.id)">
                      查看详情
                    </button>
                    <button class="btn btn-sm btn-success ml-2" @click="processDemand(task.id)">
                      处理
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div class="pagination">
            <div class="page-item" @click="currentPage = currentPage - 1" :class="{ disabled: currentPage === 1 }">
              上一页
            </div>
            <div class="page-item active">{{ currentPage }}</div>
            <div class="page-item" @click="currentPage = currentPage + 1">下一页</div>
          </div>
        </div>
      </div>
      
      <!-- 已完成任务 -->
      <div v-if="currentTab === 'completed-tasks'" class="tab-pane">
        <div class="card">
          <div class="card-title">已完成任务</div>
          
          <!-- 筛选条件 -->
          <div class="filter-bar">
            <div class="filter-item">
              <label>部门:</label>
              <select v-model="completedFilter.department">
                <option value="全部部门">全部部门</option>
                <option value="大数据学院">大数据学院</option>
                <option value="计算机学院">计算机学院</option>
                <option value="外国语学院">外国语学院</option>
                <option value="管理学院">管理学院</option>
              </select>
            </div>
            <div class="filter-item">
              <label>开始日期:</label>
              <input type="date" v-model="completedFilter.startDate">
            </div>
            <div class="filter-item">
              <label>结束日期:</label>
              <input type="date" v-model="completedFilter.endDate">
            </div>
            <button class="btn btn-primary" @click="filterCompletedTasks">筛选</button>
          </div>
          
          <!-- 任务列表 -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>需求ID</th>
                  <th>标题</th>
                  <th>类型</th>
                  <th>部门</th>
                  <th>完成日期</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in filteredCompletedTasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.type }}</td>
                  <td>{{ task.department }}</td>
                  <td>{{ task.completeDate || '-' }}</td>
                  <td><span :class="getStatusClass(task.status)">{{ task.status }}</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="showCompletedDetail(task.id)">
                      查看详情
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div class="pagination">
            <div class="page-item" @click="currentPage = currentPage - 1" :class="{ disabled: currentPage === 1 }">
              上一页
            </div>
            <div class="page-item active">{{ currentPage }}</div>
            <div class="page-item" @click="currentPage = currentPage + 1">下一页</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 需求详情模态框 -->
    <div v-if="showDetailModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>需求详情</h3>
          <button @click="closeDetailModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-title">
              <span>{{ currentDemand.title || '需求详情' }}</span>
              <span :class="getStatusClass(currentDemand.status || '处理中')">{{ currentDemand.status || '处理中' }}</span>
            </div>
            
            <div class="detail-section">
              <h4>基本信息</h4>
              <div class="detail-row">
                <div class="detail-label">需求ID：</div>
                <div class="detail-value">{{ currentDemand.id }}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">需求类型：</div>
                <div class="detail-value">{{ currentDemand.type }}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">提交部门：</div>
                <div class="detail-value">{{ currentDemand.department }}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">处理人：</div>
                <div class="detail-value">{{ currentDemand.handler }}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">提交日期：</div>
                <div class="detail-value">{{ currentDemand.submitDate }}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">期望完成日期：</div>
                <div class="detail-value">{{ currentDemand.expectedDate }}</div>
              </div>
              <div class="detail-row" v-if="currentDemand.completeDate">
                <div class="detail-label">实际完成日期：</div>
                <div class="detail-value">{{ currentDemand.completeDate }}</div>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>需求详情</h4>
              <div class="detail-value">{{ currentDemand.detail || '无详情描述' }}</div>
            </div>
            
            <div class="detail-section">
              <h4>需求岗位</h4>
              <table class="detail-table">
                <thead>
                  <tr>
                    <th>岗位类型</th>
                    <th>职称要求</th>
                    <th>人数</th>
                    <th>专业要求</th>
                    <th>其他要求</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(position, index) in currentDemand.positions || []" :key="index">
                    <td>{{ position.type }}</td>
                    <td>{{ position.level }}</td>
                    <td>{{ position.count }}</td>
                    <td>{{ position.major }}</td>
                    <td>{{ position.otherRequirements }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeDetailModal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { 
  submitDemand, 
  getMyDemands, 
  getTodoTasks, 
  getCompletedTasks, 
  getDemandDetail, 
  processDemand 
// 为解决找不到模块声明文件的问题，使用 @ts-ignore 临时忽略类型检查
// @ts-ignore
} from '../api/demand.js';

// 定义需求岗位接口
interface DemandPosition {
  type: string;
  level: string;
  count: number;
  major: string;
  otherRequirements: string;
}

// 定义完整需求接口
interface Demand {
  id: string;
  title: string;
  type: string;
  department: string;
  handler: string;
  submitDate: string;
  expectedDate: string;
  completeDate?: string;
  detail: string;
  positions: DemandPosition[];
  status: string;
}

// 定义任务接口（扩展需求接口）
interface Task extends Demand {
  priority: string;
}

// 定义过滤器接口
interface DemandFilter {
  status?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  priority?: string;
  type?: string;
}

const router = useRouter();

// 当前活动标签
const currentTab = ref('create-demand');

// 当前查看的需求
const currentDemand = ref<Demand>({} as Demand);

// 需求表单数据
const demandForm = reactive({
  title: '',
  type: '新专业建设',
  detail: '',
  positions: [
    {
      type: '专业负责人',
      level: '教授',
      count: 1,
      major: '计算机、大数据相关',
      otherRequirements: '5年以上经验'
    }
  ],
  expectedDate: '',
  attachment: null as File | null
});

// 我的需求数据
const myDemands = ref<Demand[]>([
  {
    id: 'XQ202306001',
    title: '大数据专业建设人才需求',
    type: '新专业建设',
    submitDate: '2023-06-10',
    status: '处理中',
    department: '大数据学院',
    handler: '张院长',
    expectedDate: '2023-09-01',
    positions: [
      { type: '专业负责人', level: '教授', count: 1, major: '计算机、大数据相关', otherRequirements: '5年以上经验' },
      { type: '骨干教师', level: '副教授', count: 2, major: '数据科学', otherRequirements: '3年以上经验' }
    ],
    detail: '随着大数据专业的发展，现需要招聘专业负责人1名，骨干教师2名，以满足教学和科研需求。'
  },
  {
    id: 'XQ202305015',
    title: '人工智能实验室人才补充',
    type: '岗位补充',
    submitDate: '2023-05-20',
    status: '已完成',
    department: '计算机学院',
    handler: '李教授',
    expectedDate: '2023-06-30',
    completeDate: '2023-06-05',
    positions: [
      { type: '普通教师', level: '讲师', count: 3, major: '人工智能', otherRequirements: '2年以上经验' }
    ],
    detail: '人工智能实验室需要补充3名讲师，主要负责实验室日常教学和科研工作。'
  }
]);

// 待办任务数据
const todoTasks = ref<Task[]>([
  {
    id: 'XQ202306001',
    title: '大数据专业建设人才需求',
    type: '新专业建设',
    department: '大数据学院',
    submitDate: '2023-06-10',
    expectedDate: '2023-09-01',
    priority: '高',
    positions: [
      { type: '专业负责人', level: '教授', count: 1, major: '计算机、大数据相关', otherRequirements: '5年以上经验' }
    ],
    detail: '随着大数据专业的发展，现需要招聘专业负责人1名，以满足教学和科研需求。',
    status: '待处理',
    handler: '张院长'
  },
  {
    id: 'XQ202306005',
    title: '英语专业师资补充',
    type: '岗位补充',
    department: '外国语学院',
    submitDate: '2023-06-15',
    expectedDate: '2023-08-30',
    priority: '中',
    positions: [
      { type: '普通教师', level: '讲师', count: 2, major: '英语', otherRequirements: '专业八级' }
    ],
    detail: '英语专业需要补充2名讲师，主要负责日常教学工作。',
    status: '待处理',
    handler: '王主任'
  }
]);

// 已完成任务数据
const completedTasks = ref<Demand[]>([
  {
    id: 'XQ202305015',
    title: '人工智能实验室人才补充',
    type: '岗位补充',
    department: '计算机学院',
    submitDate: '2023-05-20',
    completeDate: '2023-06-05',
    handler: '李人事',
    expectedDate: '2023-06-30',
    positions: [
      { type: '普通教师', level: '讲师', count: 3, major: '人工智能', otherRequirements: '2年以上经验' }
    ],
    detail: '人工智能实验室需要补充3名讲师，主要负责实验室日常教学和科研工作。',
    status: '已完成'
  }
]);

// 过滤器
const myDemandsFilter = reactive<DemandFilter>({
  status: '全部',
  startDate: '',
  endDate: ''
});

const todoFilter = reactive<DemandFilter>({
  priority: '全部',
  type: '全部类型'
});

const completedFilter = reactive<DemandFilter>({
  startDate: '',
  endDate: '',
  department: '全部部门'
});

// 分页
const currentPage = ref(1);

// 详情模态框
const showDetailModal = ref(false);

// 显示标签页
const showTab = (tabId: string): void => {
  currentTab.value = tabId;
};

// 添加岗位
const addPosition = (): void => {
  demandForm.positions.push({
    type: '专业负责人',
    level: '教授',
    count: 1,
    major: '',
    otherRequirements: ''
  });
};

// 删除岗位
const removePosition = (index: number): void => {
  demandForm.positions.splice(index, 1);
};

// 处理文件上传
const handleFileUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    demandForm.attachment = target.files[0];
  }
};

// 提交需求
const submitDemand = (): void => {
  // 简单验证
  if (!demandForm.title) {
    alert('请填写需求标题');
    return;
  }
  
  if (!demandForm.expectedDate) {
    alert('请选择期望完成时间');
    return;
  }
  
  // 创建新需求对象
  const newDemand: Demand = {
    id: `XQ${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    title: demandForm.title,
    type: demandForm.type,
    submitDate: new Date().toISOString().split('T')[0],
    status: '待处理',
    department: '大数据学院',
    handler: '张院长',
    expectedDate: demandForm.expectedDate,
    positions: [...demandForm.positions],
    detail: demandForm.detail
  };
  
  // 添加到我的需求列表
  myDemands.value.unshift(newDemand);
  
  // 重置表单
  resetDemandForm();
  
  // 显示成功提示
  alert('需求已提交');
  
  // 切换到我的需求标签页
  showTab('my-demands');
};

// 重置表单
const resetDemandForm = (): void => {
  demandForm.title = '';
  demandForm.type = '新专业建设';
  demandForm.detail = '';
  demandForm.positions = [
    {
      type: '专业负责人',
      level: '教授',
      count: 1,
      major: '计算机、大数据相关',
      otherRequirements: '5年以上经验'
    }
  ];
  demandForm.expectedDate = '';
  demandForm.attachment = null;
};

// 过滤我的需求
const filterMyDemands = (): void => {
  console.log('过滤我的需求:', myDemandsFilter);
};

// 过滤待办任务
const filterTodoTasks = (): void => {
  console.log('过滤待办任务:', todoFilter);
};

// 过滤已完成任务
const filterCompletedTasks = (): void => {
  console.log('过滤已完成任务:', completedFilter);
};

// 显示需求详情
const showDemandDetail = (demandId: string): void => {
  // 查找需求
  const demand = myDemands.value.find(d => d.id === demandId) || 
                 todoTasks.value.find(t => t.id === demandId) || 
                 completedTasks.value.find(t => t.id === demandId);
  
  if (demand) {
    currentDemand.value = demand;
    showDetailModal.value = true;
  }
};

// 处理需求
const processDemand = (demandId: string): void => {
  console.log('处理需求:', demandId);
  alert('处理需求：' + demandId);
  
  // 模拟处理后更新状态
  const demandIndex = todoTasks.value.findIndex(t => t.id === demandId);
  if (demandIndex !== -1) {
    // 从待办任务中移除
    const processedDemand = { ...todoTasks.value[demandIndex], status: '处理中' };
    todoTasks.value.splice(demandIndex, 1);
    
    // 添加到我的需求列表
    myDemands.value.unshift(processedDemand);
    
    alert('需求状态已更新为"处理中"');
  }
};

// 显示已完成任务详情
const showCompletedDetail = (demandId: string): void => {
  showDemandDetail(demandId);
};

// 关闭详情模态框
const closeDetailModal = (): void => {
  showDetailModal.value = false;
};

// 获取状态类
const getStatusClass = (status: string): string => {
  switch (status) {
    case '待处理':
      return 'status-badge status-pending';
    case '处理中':
      return 'status-badge status-approved';
    case '已完成':
      return 'status-badge status-completed';
    case '已关闭':
      return 'status-badge status-closed';
    default:
      return 'status-badge';
  }
};

// 获取优先级类
const getPriorityClass = (priority: string): string => {
  switch (priority) {
    case '高':
      return 'status-badge status-high';
    case '中':
      return 'status-badge status-medium';
    case '低':
      return 'status-badge status-low';
    default:
      return 'status-badge';
  }
};

// 计算属性 - 过滤后的我的需求
const filteredMyDemands = computed(() => {
  return myDemands.value.filter(demand => {
    if (myDemandsFilter.status !== '全部' && demand.status !== myDemandsFilter.status) {
      return false;
    }
    
    // 日期过滤逻辑
    if (myDemandsFilter.startDate && new Date(demand.submitDate) < new Date(myDemandsFilter.startDate)) {
      return false;
    }
    
    if (myDemandsFilter.endDate && new Date(demand.submitDate) > new Date(myDemandsFilter.endDate)) {
      return false;
    }
    
    return true;
  });
});

// 计算属性 - 过滤后的待办任务
const filteredTodoTasks = computed(() => {
  return todoTasks.value.filter(task => {
    if (todoFilter.priority !== '全部' && task.priority !== todoFilter.priority) {
      return false;
    }
    
    if (todoFilter.type !== '全部类型' && task.type !== todoFilter.type) {
      return false;
    }
    
    return true;
  });
});

// 计算属性 - 过滤后的已完成任务
const filteredCompletedTasks = computed(() => {
  return completedTasks.value.filter(task => {
    if (completedFilter.department !== '全部部门' && task.department !== completedFilter.department) {
      return false;
    }
    
    // 日期过滤逻辑
    if (completedFilter.startDate && task.completeDate && new Date(task.completeDate) < new Date(completedFilter.startDate)) {
      return false;
    }
    
    if (completedFilter.endDate && task.completeDate && new Date(task.completeDate) > new Date(completedFilter.endDate)) {
      return false;
    }
    
    return true;
  });
  const submitDemandHandler = async () => {
  try {
    const response = await submitDemand(demandForm);
    console.log('需求提交成功', response.data);
    // 可以在这里添加成功提示和重置表单等逻辑
    resetDemandForm();
  } catch (error) {
    console.error('需求提交失败', error);
    // 可以在这里添加失败提示逻辑
  }
};

// 获取我的需求列表
const fetchMyDemands = async () => {
  try {
    const response = await getMyDemands(myDemandsFilter);
    myDemands.value = response.data;
  } catch (error) {
    console.error('获取我的需求列表失败', error);
  }
};

// 获取待办任务列表
const fetchTodoTasks = async () => {
  try {
    const response = await getTodoTasks(todoFilter);
    todoTasks.value = response.data;
  } catch (error) {
    console.error('获取待办任务列表失败', error);
  }
};

// 获取已完成任务列表
const fetchCompletedTasks = async () => {
  try {
    const response = await getCompletedTasks(completedTasksFilter);
    completedTasks.value = response.data;
  } catch (error) {
    console.error('获取已完成任务列表失败', error);
  }
};

// 获取需求详情
const showDemandDetail = async (demandId) => {
  try {
    const response = await getDemandDetail(demandId);
    demandDetail.value = response.data;
    showDetailModal.value = true;
  } catch (error) {
    console.error('获取需求详情失败', error);
  }
};

// 处理需求
const processDemandHandler = async (demandId) => {
  try {
    const response = await processDemand(demandId);
    console.log('需求处理成功', response.data);
    // 更新需求列表
    fetchMyDemands();
  } catch (error) {
    console.error('需求处理失败', error);
  }
};

onMounted(() => {
  fetchMyDemands();
  fetchTodoTasks();
  fetchCompletedTasks();
});
});

// 页面加载时执行
onMounted(() => {
  console.log('部门对接页面已加载');
});

</script>

<style scoped>
/* 基础样式 */
.department-communication-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 30px;
  height: 30px;
  background-color: #165DFF;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s;
  font-weight: 500;
}

.tab.active {
  border-bottom: 2px solid #165DFF;
  color: #165DFF;
  font-weight: 600;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.form-container {
  padding: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #165DFF;
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
}

.btn {
  padding: 8px 15px;
  background-color: #165DFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #0e45cc;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}
</style>