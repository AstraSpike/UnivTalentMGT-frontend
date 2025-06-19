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
  
      <!-- 发起需求 -->
      <div v-show="currentTab === 'create-demand'" class="tab-content">
        <div class="card">
          <div class="card-title">新建人才需求</div>
          <form @submit.prevent="submitDemand">
            <div class="form-group">
              <label class="form-label">需求标题</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="demandForm.title"
                placeholder="例如：大数据专业建设人才需求"
              >
            </div>
  
            <div class="form-group">
              <label class="form-label">需求类型</label>
              <select class="form-control" v-model="demandForm.type">
                <option>新专业建设</option>
                <option>学科发展</option>
                <option>岗位补充</option>
                <option>人才梯队</option>
                <option>其他</option>
              </select>
            </div>
  
            <div class="form-group">
              <label class="form-label">需求部门</label>
              <input type="text" class="form-control" value="大数据学院" readonly>
            </div>
  
            <div class="form-group">
              <label class="form-label">需求负责人</label>
              <input type="text" class="form-control" value="张院长" readonly>
            </div>
  
            <div class="form-group">
              <label class="form-label">需求详情</label>
              <textarea 
                class="form-control" 
                rows="5" 
                v-model="demandForm.detail"
                placeholder="请详细描述人才需求..."
              ></textarea>
            </div>
  
            <div class="card">
              <div class="card-title">人才需求明细</div>
              <table>
                <thead>
                  <tr>
                    <th>岗位类型</th>
                    <th>岗位级别</th>
                    <th>需求人数</th>
                    <th>专业要求</th>
                    <th>其他要求</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(position, index) in demandForm.positions" :key="index">
                    <td>
                      <select class="form-control" v-model="position.type">
                        <option>专业负责人</option>
                        <option>骨干教师</option>
                        <option>普通教师</option>
                        <option>实验员</option>
                      </select>
                    </td>
                    <td>
                      <select class="form-control" v-model="position.level">
                        <option>教授</option>
                        <option>副教授</option>
                        <option>讲师</option>
                      </select>
                    </td>
                    <td><input type="number" class="form-control" v-model.number="position.count"></td>
                    <td><input type="text" class="form-control" v-model="position.major"></td>
                    <td><input type="text" class="form-control" v-model="position.otherRequirements"></td>
                    <td><button type="button" class="btn btn-secondary" @click="removePosition(index)">删除</button></td>
                  </tr>
                </tbody>
              </table>
              <button type="button" class="btn" @click="addPosition">添加岗位</button>
            </div>
  
            <div class="form-group">
              <label class="form-label">期望完成时间</label>
              <input type="date" class="form-control" v-model="demandForm.expectedDate">
            </div>
  
            <div class="form-group">
              <label class="form-label">附件</label>
              <input type="file" class="form-control" @change="handleFileUpload">
              <small class="text-muted">可上传会议纪要、建设方案等相关文件</small>
            </div>
  
            <div class="form-actions">
              <button type="submit" class="btn">提交需求</button>
              <button type="button" class="btn btn-secondary" @click="saveDraft">保存草稿</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- 我的需求 -->
      <div v-show="currentTab === 'my-demands'" class="tab-content">
        <div class="filter-bar">
          <div class="filter-item">
            <label>状态</label>
            <select v-model="myDemandsFilter.status">
              <option>全部</option>
              <option>待处理</option>
              <option>处理中</option>
              <option>已完成</option>
              <option>已关闭</option>
            </select>
          </div>
          <div class="filter-item">
            <label>时间范围</label>
            <input type="date" v-model="myDemandsFilter.startDate"> 至 
            <input type="date" v-model="myDemandsFilter.endDate">
          </div>
          <button class="btn" @click="filterMyDemands">查询</button>
        </div>
  
        <div class="card">
          <div class="card-title">我发起的需求</div>
          <table>
            <thead>
              <tr>
                <th>需求编号</th>
                <th>需求标题</th>
                <th>需求类型</th>
                <th>提交时间</th>
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
                <td><a href="#" @click.prevent="showDemandDetail(demand.id)">查看</a></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <div class="page-item" :class="{ active: currentPage === 1 }" @click="currentPage = 1">1</div>
            <div class="page-item" :class="{ active: currentPage === 2 }" @click="currentPage = 2">2</div>
            <div class="page-item" :class="{ active: currentPage === 3 }" @click="currentPage = 3">3</div>
          </div>
        </div>
      </div>
  
      <!-- 待办任务 -->
      <div v-show="currentTab === 'todo-list'" class="tab-content">
        <div class="filter-bar">
          <div class="filter-item">
            <label>优先级</label>
            <select v-model="todoFilter.priority">
              <option>全部</option>
              <option>高</option>
              <option>中</option>
              <option>低</option>
            </select>
          </div>
          <div class="filter-item">
            <label>需求类型</label>
            <select v-model="todoFilter.type">
              <option>全部类型</option>
              <option>新专业建设</option>
              <option>学科发展</option>
              <option>岗位补充</option>
            </select>
          </div>
          <button class="btn" @click="filterTodoTasks">查询</button>
        </div>
  
        <div class="card">
          <div class="card-title">待办任务</div>
          <table>
            <thead>
              <tr>
                <th>需求编号</th>
                <th>需求标题</th>
                <th>需求部门</th>
                <th>提交时间</th>
                <th>期望完成</th>
                <th>优先级</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in filteredTodoTasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
                <td>{{ task.department }}</td>
                <td>{{ task.submitDate }}</td>
                <td>{{ task.expectedDate }}</td>
                <td><span :class="getPriorityClass(task.priority)">{{ task.priority }}</span></td>
                <td><a href="#" @click.prevent="processDemand(task.id)">处理</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- 已完成任务 -->
      <div v-show="currentTab === 'completed-tasks'" class="tab-content">
        <div class="filter-bar">
          <div class="filter-item">
            <label>完成时间</label>
            <input type="date" v-model="completedFilter.startDate"> 至 
            <input type="date" v-model="completedFilter.endDate">
          </div>
          <div class="filter-item">
            <label>需求部门</label>
            <select v-model="completedFilter.department">
              <option>全部部门</option>
              <option>大数据学院</option>
              <option>外国语学院</option>
              <option>文学院</option>
            </select>
          </div>
          <button class="btn" @click="filterCompletedTasks">查询</button>
        </div>
  
        <div class="card">
          <div class="card-title">已完成任务</div>
          <table>
            <thead>
              <tr>
                <th>需求编号</th>
                <th>需求标题</th>
                <th>需求部门</th>
                <th>提交时间</th>
                <th>完成时间</th>
                <th>处理人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in filteredCompletedTasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
                <td>{{ task.department }}</td>
                <td>{{ task.submitDate }}</td>
                <td>{{ task.completeDate }}</td>
                <td>{{ task.handler }}</td>
                <td><a href="#" @click.prevent="showCompletedDetail(task.id)">查看</a></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <div class="page-item" :class="{ active: currentPage === 1 }" @click="currentPage = 1">1</div>
            <div class="page-item" :class="{ active: currentPage === 2 }" @click="currentPage = 2">2</div>
            <div class="page-item" :class="{ active: currentPage === 3 }" @click="currentPage = 3">3</div>
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
                  <span class="detail-label">需求编号:</span>
                  <span class="detail-value">{{ currentDemand.id || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">需求类型:</span>
                  <span class="detail-value">{{ currentDemand.type || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">需求部门:</span>
                  <span class="detail-value">{{ currentDemand.department || '大数据学院' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">需求负责人:</span>
                  <span class="detail-value">{{ currentDemand.handler || '张院长' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">提交时间:</span>
                  <span class="detail-value">{{ currentDemand.submitDate || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">期望完成时间:</span>
                  <span class="detail-value">{{ currentDemand.expectedDate || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">完成时间:</span>
                  <span class="detail-value">{{ currentDemand.completeDate || '-' }}</span>
                </div>
              </div>
              
              <div class="detail-section">
                <h4>需求详情</h4>
                <p>{{ currentDemand.detail || '暂无详情描述' }}</p>
              </div>
              
              <div class="detail-section">
                <h4>人才需求明细</h4>
                <table class="detail-table">
                  <thead>
                    <tr>
                      <th>岗位类型</th>
                      <th>岗位级别</th>
                      <th>需求人数</th>
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
  
  // 当前活动标签
  const currentTab = ref('create-demand');
  
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
    attachment: null
  });
  
  // 我的需求数据
  const myDemands = reactive([
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
  const todoTasks = reactive([
    {
      id: 'XQ202306001',
      title: '大数据专业建设人才需求',
      department: '大数据学院',
      submitDate: '2023-06-10',
      expectedDate: '2023-09-01',
      priority: '高',
      type: '新专业建设'
    },
    {
      id: 'XQ202306005',
      title: '英语专业师资补充',
      department: '外国语学院',
      submitDate: '2023-06-15',
      expectedDate: '2023-08-30',
      priority: '中',
      type: '岗位补充'
    },
    {
      id: 'XQ202306007',
      title: '数学建模竞赛指导教师',
      department: '数学系',
      submitDate: '2023-06-18',
      expectedDate: '2023-07-15',
      priority: '高',
      type: '学科发展'
    }
  ]);
  
  // 已完成任务数据
  const completedTasks = reactive([
    {
      id: 'XQ202305015',
      title: '人工智能实验室人才补充',
      department: '计算机学院',
      submitDate: '2023-05-20',
      completeDate: '2023-06-05',
      handler: '李人事',
      status: '已完成'
    },
    {
      id: 'XQ202304012',
      title: '管理学院领导班子调整',
      department: '管理学院',
      submitDate: '2023-04-10',
      completeDate: '2023-05-15',
      handler: '王人事',
      status: '已完成'
    }
  ]);
  
  // 过滤器
  const myDemandsFilter = reactive({
    status: '全部',
    startDate: '',
    endDate: ''
  });
  
  const todoFilter = reactive({
    priority: '全部',
    type: '全部类型'
  });
  
  const completedFilter = reactive({
    startDate: '',
    endDate: '',
    department: '全部部门'
  });
  
  // 分页
  const currentPage = ref(1);
  
  // 详情模态框
  const showDetailModal = ref(false);
  const currentDemand = ref({});
  
  // 显示标签页
  const showTab = (tabId) => {
    currentTab.value = tabId;
  };
  
  // 添加岗位
  const addPosition = () => {
    demandForm.positions.push({
      type: '专业负责人',
      level: '教授',
      count: 1,
      major: '',
      otherRequirements: ''
    });
  };
  
  // 删除岗位
  const removePosition = (index) => {
    demandForm.positions.splice(index, 1);
  };
  
  // 处理文件上传
  const handleFileUpload = (event) => {
    demandForm.attachment = event.target.files[0];
  };
  
  // 提交需求
  const submitDemand = () => {
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
    const newDemand = {
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
    myDemands.unshift(newDemand);
    
    // 重置表单
    resetDemandForm();
    
    // 显示成功提示
    alert('需求已提交');
    
    // 切换到我的需求标签页
    showTab('my-demands');
  };
  
  // 保存草稿
  const saveDraft = () => {
    // 这里可以添加保存草稿的逻辑
    alert('草稿已保存');
  };
  
  // 重置表单
  const resetDemandForm = () => {
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
  const filterMyDemands = () => {
    // 这里可以添加实际的过滤逻辑
    console.log('过滤我的需求:', myDemandsFilter);
  };
  
  // 过滤待办任务
  const filterTodoTasks = () => {
    // 这里可以添加实际的过滤逻辑
    console.log('过滤待办任务:', todoFilter);
  };
  
  // 过滤已完成任务
  const filterCompletedTasks = () => {
    // 这里可以添加实际的过滤逻辑
    console.log('过滤已完成任务:', completedFilter);
  };
  
  // 显示需求详情
  const showDemandDetail = (demandId) => {
    // 查找需求
    const demand = myDemands.find(d => d.id === demandId) || 
                  todoTasks.find(t => t.id === demandId) || 
                  completedTasks.find(t => t.id === demandId);
    
    if (demand) {
      currentDemand.value = demand;
      showDetailModal.value = true;
    }
  };
  
  // 处理需求
  const processDemand = (demandId) => {
    console.log('处理需求:', demandId);
    alert('处理需求：' + demandId);
    
    // 模拟处理后更新状态
    const demandIndex = todoTasks.findIndex(t => t.id === demandId);
    if (demandIndex !== -1) {
      // 从待办任务中移除
      const processedDemand = { ...todoTasks[demandIndex], status: '处理中' };
      todoTasks.splice(demandIndex, 1);
      
      // 添加到我的需求列表
      myDemands.unshift(processedDemand);
      
      alert('需求状态已更新为"处理中"');
    }
  };
  
  // 显示已完成任务详情
  const showCompletedDetail = (demandId) => {
    showDemandDetail(demandId);
  };
  
  // 关闭详情模态框
  const closeDetailModal = () => {
    showDetailModal.value = false;
  };
  
  // 获取状态类
  const getStatusClass = (status) => {
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
  const getPriorityClass = (priority) => {
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
    return myDemands.filter(demand => {
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
    return todoTasks.filter(task => {
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
    return completedTasks.filter(task => {
      if (completedFilter.department !== '全部部门' && task.department !== completedFilter.department) {
        return false;
      }
      
      // 日期过滤逻辑
      if (completedFilter.startDate && new Date(task.completeDate) < new Date(completedFilter.startDate)) {
        return false;
      }
      
      if (completedFilter.endDate && new Date(task.completeDate) > new Date(completedFilter.endDate)) {
        return false;
      }
      
      return true;
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
  }
  
  .tab.active {
    border-bottom: 2px solid #165DFF;
    color: #165DFF;
    font-weight: 500;
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
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .btn {
    padding: 8px 15px;
    background-color: #165DFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .btn-secondary {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
  }
  
  .pagination {
    display: flex;
    margin-top: 20px;
  }
  
  .page-item {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .page-item.active {
    background-color: #165DFF;
    color: white;
    border-color: #165DFF;
  }
  
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .filter-item {
    margin-right: 20px;
    margin-bottom: 10px;
  }
  
  .filter-item label {
    margin-right: 10px;
  }
  
  .status-badge {
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
    display: inline-block;
  }
  
  .status-pending {
    background-color: #fff7e6;
    color: #ff9900;
  }
  
  .status-approved {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  .status-completed {
    background-color: #f0fff4;
    color: #52c41a;
  }
  
  .status-closed {
    background-color: #f5f5f5;
    color: #8c8c8c;
  }
  
  .status-high {
    background-color: #fff1f0;
    color: #f5222d;
  }
  
  .status-medium {
    background-color: #fff7e6;
    color: #faad14;
  }
  
  .status-low {
    background-color: #f6ffed;
    color: #52c41a;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 20px;
    border-top: 1px solid #e0e0e0;
    text-align: right;
  }
  
  .detail-section {
    margin-bottom: 20px;
  }
  
  .detail-section h4 {
    margin-bottom: 10px;
    font-size: 16px;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 8px;
  }
  
  .detail-label {
    width: 120px;
    font-weight: 500;
    color: #666;
  }
  
  .detail-value {
    flex: 1;
  }
  
  .detail-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .detail-table th, .detail-table td {
    padding: 8px;
    border: 1px solid #e0e0e0;
    text-align: left;
  }
  </style>