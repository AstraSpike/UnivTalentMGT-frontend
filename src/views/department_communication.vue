<template>
  <div class="department-communication-container">
    <div v-if="isLoading">加载中...</div> 
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div> 
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
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
            <div class="form-item">
              <label>需求标题:</label>
              <input type="text" v-model="demandForm.title" placeholder="请输入标题" style="width: 300px;" />
            </div>
            <br>
            <div class="form-item">
              <label>需求类型:</label>
              <select class="form-control" v-model="demandForm.type" style="width: auto;">
                <option value="行政">行政</option>
                <option value="科研">科研</option>
              </select>
            </div>
            <br>
            <div class="form-item">
              <label>需求内容:</label>
              <textarea 
                v-model="demandForm.taskRequirements" 
                class="large-textarea"
                placeholder="请输入需求内容"
              ></textarea>
            </div>
            <div class="form-item">
              <label>优先级:</label>
              <select class="form-control" v-model="demandForm.taskPriority" style="width: auto;">
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
                        <br>
            <div class="form-item">
              <label>预期完成时间:</label>
              <input type="date" v-model="demandForm.expectedCompletionTime" />
            </div>
                        <br>
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
              <label class="form-label">接收部门</label>
              <select class="form-control" v-model="demandForm.receiverId" style="width: auto;">
                <option v-for="receiver in receivers" :key="receiver.id" :value="receiver.id">
                  {{ receiver.name }}
                </option>
              </select>
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
      
      <!-- 需求列表 -->
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>需求ID</th>
              <th>需求内容</th>
              <th>优先级</th>
              <th>预期完成时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="demand in myDemands" :key="demand.id">
              <td>{{ demand.id }}</td>
              <td>{{ demand.detail }}</td>
              <td>{{ demand.taskPriority }}</td>
              <td>{{ demand.expectedDate }}</td>
              <td><span :class="getStatusClass(demand.status)">{{ demand.status }}</span></td>
              <td>
                <button class="btn btn-sm btn-primary" @click="showDetailModal = true; currentDemand = demand">
                  查看详情
                </button>
                <button class="btn btn-sm btn-info ml-2" @click="handleGetTaskDetail(demand.id)">
                  获取任务详情
                </button>
                <button class="btn btn-sm btn-danger ml-2" @click="handleDeleteTask(demand.id)">
                  删除任务
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 移除了分页区域 -->
    </div>
  </div>
      
      <!-- 待办任务 -->
      <div v-if="currentTab === 'todo-list'" class="tab-pane">
        <div class="card">
          <div class="card-title">待办任务</div>
          
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
                <tr v-for="task in todoTasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.type }}</td>
                  <td>{{ task.submitDate }}</td>
                  <td><span :class="getPriorityClass(task.priority)">{{ task.priority }}</span></td>
                  <td><span :class="getStatusClass(task.status)">{{ task.status }}</span></td>
                  <td>
                    <button class="btn btn-sm btn-success ml-2" @click="processDemand(task.id)">
                      处理
                    </button>
                    <button class="btn btn-sm btn-info ml-2" @click="handleGetTaskDetail(task.id)">
                      获取任务详情
                    </button>
                    <button 
                      class="btn btn-sm btn-warning ml-2" 
                      @click="handleUpdateTaskStatus(task.id, '处理中')"
                    >
                      更新状态为处理中
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 移除了分页区域 -->
        </div>
      </div>
      
      <!-- 已完成任务 -->
      <div v-if="currentTab === 'completed-tasks'" class="tab-pane">
        <div class="card">
          <div class="card-title">已完成任务</div>
          
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
                <tr v-for="task in completedTasks" :key="task.id">
                  <td>{{ task.id }}</td>
                  <td>{{ task.title }}</td>
                  <td>{{ task.type }}</td>
                  <td>{{ task.receiverId }}</td>
                  <td>{{ task.completeDate || '-' }}</td>
                  <td><span :class="getStatusClass(task.status)">{{ task.status }}</span></td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="showCompletedDetail(task.id)">
                      查看详情
                    </button>
                    <button class="btn btn-sm btn-info ml-2" @click="handleGetTaskDetail(task.id)">
                      获取任务详情
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 移除了分页区域 -->
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
                <div class="detail-value">{{ currentDemand.receiverId }}</div>
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
const isLoading = ref(false); 
const errorMessage = ref(''); 
const successMessage = ref('');
import { useRouter } from 'vue-router';
import { 
    createTask,
    getTaskDetail,
    getReceivedTasks,
    updateTaskStatus,
    deleteTask
} from '../api/task.js';
import axios from 'axios';

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
  handler: string;
  submitDate: string;
  submitID:number;
  receiverId:number;
  expectedDate: string;
  completeDate?: string;
  detail: string;
  positions: DemandPosition[];
  status: string;
  taskPriority: string;
}

// 定义任务接口（扩展需求接口）
interface Task extends Demand {
  priority: string;
}

const router = useRouter();

// 接收部门列表
const receivers = ref([
  { id: 1, name: '行政部门' },
  { id: 2, name: '科研部门' },
]);

// 当前活动标签
const currentTab = ref('create-demand');

// 当前查看的需求
const currentDemand = ref<Demand>({} as Demand);

// 需求表单数据
const demandForm = reactive({
  taskRequirements: '',
  detail:'',
  taskPriority: 'medium',
  expectedCompletionTime: '',
  receiverId: '',
  taskStatus: 'pending',
  initiator_id:0,
  title: '',
  type: '',
});
const userInfo = JSON.parse(localStorage.getItem('user-info') || '{}');
const userId = userInfo.userId;

// 我的需求数据
const myDemands = ref<Demand[]>([]);

// 待办任务数据
const todoTasks = ref<Task[]>([
  {
    taskPriority: '高',
    id: 'XQ202306001',
    receiverId:1,
    title: '大数据专业建设人才需求',
    type: '新专业建设',
    submitDate: '2023-06-10',
    submitID:1,
    expectedDate: '2023-09-01',
    priority: '高',
    positions: [
      { type: '专业负责人', level: '教授', count: 1, major: '计算机、大数据相关', otherRequirements: '5年以上经验' }
    ],
    detail: '随着大数据专业的发展，现需要招聘专业负责人1名，以满足教学和科研需求。',
    status: '待处理',
    handler: '张院长'
  },
]);

// 已完成任务数据
const completedTasks = ref<Demand[]>([ 
  { 
    taskPriority: '高', 
    id: 'XQ202305015', 
    // Add the receiverId property 
    receiverId: 1, 
    title: '人工智能实验室人才补充', 
    type: '岗位补充', 
    submitID: 1, 
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

// 获取任务详情
const handleGetTaskDetail = async (taskId: string | number) => { 
  isLoading.value = true; 
  errorMessage.value = ''; 
  try { 
    const response = await getTaskDetail(taskId); 
    console.log('任务详情:', response.data); 
    successMessage.value = '获取任务详情成功'; 
  } catch (error) { 
    console.error('获取任务详情失败:', error); 
    errorMessage.value = '获取任务详情失败，请稍后重试'; 
  } finally { 
    isLoading.value = false; 
  }
};

// 获取用户接收的任务列表
const handleGetReceivedTasks = async (receiverId: string | number) => { 
  isLoading.value = true; 
  errorMessage.value = ''; 
  try { 
    const response = await getReceivedTasks(receiverId); 
    console.log('接收的任务列表:', response.data); 
    successMessage.value = '获取接收任务列表成功'; 
    // 添加空值检查，确保 response.data 存在
    if (response.data) { 
      myDemands.value = response.data as Demand[];
      todoTasks.value = (response.data as Task[]).filter((task: Task) => task.status === '待处理');
      completedTasks.value = (response.data as Demand[]).filter((task: Demand) => task.status === '已完成');
    } else { 
      myDemands.value = []; 
      todoTasks.value = []; 
      completedTasks.value = []; 
    } 
  } catch (error) { 
    console.error('获取接收任务列表失败:', error); 
    errorMessage.value = '获取接收任务列表失败，请稍后重试'; 
  } finally { 
    isLoading.value = false; 
  }
};

// 更新任务状态
const handleUpdateTaskStatus = async (taskId: string | number, status: string) => { 
  isLoading.value = true; 
  errorMessage.value = ''; 
  try { 
    const response = await updateTaskStatus(taskId, status); 
    console.log('更新任务状态成功:', response.data); 
    successMessage.value = '更新任务状态成功'; 
    // 更新本地数据
    if (status === '处理中') {
      const index = todoTasks.value.findIndex(task => task.id === taskId);
      if (index !== -1) {
        todoTasks.value[index].status = status;
      }
    } else if (status === '已完成') {
      const index = todoTasks.value.findIndex(task => task.id === taskId);
      if (index !== -1) {
        completedTasks.value.push(todoTasks.value.splice(index, 1)[0]);
      }
    }
  } catch (error) { 
    console.error('更新任务状态失败:', error); 
    errorMessage.value = '更新任务状态失败，请稍后重试'; 
  } finally { 
    isLoading.value = false; 
  }
};

// 删除任务
const handleDeleteTask = async (taskId: string | number) => { 
  if (!confirm('确定要删除该任务吗？')) return; 
  isLoading.value = true; 
  errorMessage.value = ''; 
  try { 
    const response = await deleteTask(taskId); 
    console.log('删除任务结果:', response.data); 
    successMessage.value = '删除任务成功'; 
    // 从本地数据中删除
    myDemands.value = myDemands.value.filter(demand => demand.id !== taskId);
    todoTasks.value = todoTasks.value.filter(task => task.id !== taskId);
    completedTasks.value = completedTasks.value.filter(task => task.id !== taskId);
  } catch (error) { 
    console.error('删除任务失败:', error); 
    errorMessage.value = '删除任务失败，请稍后重试'; 
  } finally { 
    isLoading.value = false; 
  }
};

// 详情模态框
const showDetailModal = ref(false);

// 显示标签页
const showTab = (tabId: string): void => {
  currentTab.value = tabId;
};

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

const message = ref('');
const code = ref(0);

// 重置表单
const resetDemandForm = () => {
  demandForm.taskRequirements = '';
  demandForm.taskPriority = 'medium';
  demandForm.expectedCompletionTime = '';
  demandForm.receiverId = '';
  demandForm.taskStatus = 'pending';
  demandForm.title = '';
  demandForm.type = '';
};

// 提交需求
const submitDemand = async () => {
  isLoading.value = true; 
  errorMessage.value = ''; 
  try { 
    const initiator_id = getLoginUserId(); 
    console.log('userId:', initiator_id); 
    if (!initiator_id) { 
      errorMessage.value = '用户 ID 未获取，请重新登录'; 
      isLoading.value = false; 
      return; 
    } 
    const data = { 
      title: demandForm.title, 
      type: demandForm.type, 
      taskRequirements: demandForm.taskRequirements, 
      taskPriority: demandForm.taskPriority, 
      expectedCompletionTime: demandForm.expectedCompletionTime, 
      receiverId: demandForm.receiverId, 
      taskStatus: demandForm.taskStatus, 
      initiatorId: initiator_id 
    }; 
    const response = await createTask(data); 
    successMessage.value = '需求提交成功'; 
    resetDemandForm(); 
    // 刷新任务列表
    if (userId) {
      handleGetReceivedTasks(userId);
    }
    console.log('需求提交结果:', response); 
  } catch (error) { 
    errorMessage.value = '需求提交失败，请稍后重试'; 
    console.error('需求提交出错:', error); 
  } finally { 
    isLoading.value = false; 
  }
};

// 处理需求
const processDemand = (demandId: string): void => {
  console.log('处理需求:', demandId);
  alert('处理需求：' + demandId);
};

// 显示已完成任务详情
const showCompletedDetail = (demandId: string): void => {
  const showDemandDetail = async (demandId: string) => {
    try {
      const response = await getTaskDetail(demandId);
      currentDemand.value = response.data as Demand;
      showDetailModal.value = true;
    } catch (error) {
      console.error('获取需求详情失败', error);
    }
  };
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

// 页面加载时执行
onMounted(() => { 
  console.log('部门对接页面已加载'); 
  console.log('当前用户id:', userId); 
  getLoginUserId(); 
  if (userId) { 
    handleGetReceivedTasks(userId); 
  }
});

</script>
<style scoped>
/* 基础样式 */
.error {
  color: red;
  margin: 10px 0;
}
.success {
  color: green;
  margin: 10px 0;
}
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
.large-textarea {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>