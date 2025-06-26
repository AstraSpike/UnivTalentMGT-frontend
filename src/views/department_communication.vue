<template>
  <div class="department-communication-container">
    <!-- 顶部导航栏 -->
    <div class="header bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <span class="text-blue-600 text-2xl"><i class="fa fa-comments"></i></span>
          <h1 class="text-xl font-bold text-gray-800">部门需求对接系统</h1>
        </div>
        <div class="user-info flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="user-avatar w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <span>{{ userInfo?.name?.substring(0, 1) || 'U' }}</span>
            </div>
            <span class="text-gray-700">{{ userInfo?.name || '未登录' }}</span>
          </div>
          <button class="text-gray-600 hover:text-red-500 transition-colors" @click="logout">
            <i class="fa fa-sign-out"></i> 退出
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6">
      <!-- 标签页切换 -->
      <div class="tabs flex border-b border-gray-200">
        <div 
          class="tab px-6 py-3 cursor-pointer font-medium text-gray-600 border-b-2 border-transparent hover:text-blue-600 transition-all duration-200" 
          :class="{ 'border-blue-600 text-blue-600': currentTab === 'create-demand' }"
          @click="showTab('create-demand')"
        >
          <i class="fa fa-plus-circle mr-2"></i>发起需求
        </div>
        <div 
          class="tab px-6 py-3 cursor-pointer font-medium text-gray-600 border-b-2 border-transparent hover:text-blue-600 transition-all duration-200" 
          :class="{ 'border-blue-600 text-blue-600': currentTab === 'my-demands' }"
          @click="showTab('my-demands')"
        >
          <i class="fa fa-list-alt mr-2"></i>我的需求
        </div>
        <div 
          class="tab px-6 py-3 cursor-pointer font-medium text-gray-600 border-b-2 border-transparent hover:text-blue-600 transition-all duration-200" 
          :class="{ 'border-blue-600 text-blue-600': currentTab === 'todo-list' }"
          @click="showTab('todo-list')"
        >
          <i class="fa fa-tasks mr-2"></i>待办任务
        </div>
        <div 
          class="tab px-6 py-3 cursor-pointer font-medium text-gray-600 border-b-2 border-transparent hover:text-blue-600 transition-all duration-200" 
          :class="{ 'border-blue-600 text-blue-600': currentTab === 'completed-tasks' }"
          @click="showTab('completed-tasks')"
        >
          <i class="fa fa-check-circle mr-2"></i>已完成任务
        </div>
      </div>
      
      <!-- 标签页内容区域 -->
      <div class="tab-content mt-6">
        <!-- 发起需求 -->
        <div v-if="currentTab === 'create-demand'" class="tab-pane">
          <div class="card bg-white rounded-lg shadow-md p-6">
            <div class="card-title text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              发起新需求
            </div>
            <form @submit.prevent="submitDemand" class="space-y-6">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">需求标题</label>
                <input 
                  v-model="demandForm.title" 
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="请输入需求标题"
                  required
                />
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">需求类型</label>
                <select 
                  v-model="demandForm.type" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="新专业建设">新专业建设</option>
                  <option value="岗位补充">岗位补充</option>
                  <option value="实验室建设">实验室建设</option>
                  <option value="设备采购">设备采购</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">需求内容</label>
                <textarea 
                  v-model="demandForm.detail" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
                  placeholder="请详细描述您的需求..."
                  required
                ></textarea>
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">优先级</label>
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="demandForm.priority" value="高" class="text-blue-600 focus:ring-blue-500 h-4 w-4">
                    <span class="ml-2 text-gray-700">高</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="demandForm.priority" value="中" class="text-blue-600 focus:ring-blue-500 h-4 w-4">
                    <span class="ml-2 text-gray-700">中</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input type="radio" v-model="demandForm.priority" value="低" class="text-blue-600 focus:ring-blue-500 h-4 w-4">
                    <span class="ml-2 text-gray-700">低</span>
                  </label>
                </div>
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">预期完成时间</label>
                <input 
                  v-model="demandForm.expectedCompletionTime" 
                  type="date" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">接收人员</label>
                <select 
                  v-model="demandForm.receiverId" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
                  <option v-for="receiver in receivers" :key="receiver.id" :value="receiver.id">
                    {{ receiver.name }} ({{ receiver.department }})
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">需求岗位</label>
                <div class="space-y-4" v-if="demandForm.positions && demandForm.positions.length">
                  <div v-for="(position, index) in demandForm.positions" :key="index" class="bg-gray-50 p-4 rounded-md">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs text-gray-500 mb-1">岗位类型</label>
                        <input 
                          v-model="position.type" 
                          type="text" 
                          class="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1">职称要求</label>
                        <input 
                          v-model="position.level" 
                          type="text" 
                          class="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1">人数</label>
                        <input 
                          v-model.number="position.count" 
                          type="number" 
                          class="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1">专业要求</label>
                        <input 
                          v-model="position.major" 
                          type="text" 
                          class="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                    <div class="mt-3">
                      <label class="block text-xs text-gray-500 mb-1">其他要求</label>
                      <input 
                        v-model="position.otherRequirements" 
                        type="text" 
                        class="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <button 
                      type="button" 
                      class="mt-2 text-red-500 text-sm hover:text-red-700 transition-colors"
                      @click="removePosition(index)"
                    >
                      <i class="fa fa-trash"></i> 移除岗位
                    </button>
                  </div>
                </div>
                <button type="button" class="text-blue-600 text-sm hover:text-blue-800 transition-colors" @click="addPosition">
                  <i class="fa fa-plus-circle"></i> 添加岗位
                </button>
              </div>
              
              <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button type="button" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors" @click="resetDemandForm">
                  重置
                </button>
                <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                  <i class="fa fa-paper-plane mr-2"></i> 提交需求
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <!-- 我的需求 -->
        <div v-if="currentTab === 'my-demands'" class="tab-pane">
          <div class="card bg-white rounded-lg shadow-md p-6">
            <div class="card-title text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              我的需求
            </div>
            
            <!-- 筛选条件 -->
            <div class="filter-bar bg-gray-50 p-4 rounded-md mb-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
                  <select 
                    v-model="myDemandsFilter.status" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="全部">全部</option>
                    <option value="待处理">待处理</option>
                    <option value="处理中">处理中</option>
                    <option value="已完成">已完成</option>
                    <option value="已关闭">已关闭</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                  <input 
                    v-model="myDemandsFilter.startDate" 
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                  <input 
                    v-model="myDemandsFilter.endDate" 
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button 
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  @click="fetchMyDemands"
                >
                  <i class="fa fa-filter mr-2"></i> 筛选
                </button>
              </div>
            </div>
            
            <!-- 需求列表 -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">需求ID</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交日期</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="demand in filteredMyDemands" :key="demand.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ demand.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ demand.title }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ demand.type }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ demand.submitDate }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(demand.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ demand.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        class="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                        @click="showDemandDetail(demand.id)"
                      >
                        查看详情
                      </button>
                      <button 
                        class="text-red-600 hover:text-red-900 transition-colors"
                        @click="cancelDemand(demand.id)"
                        :disabled="demand.status !== '待处理'"
                        :class="{ 'opacity-50 cursor-not-allowed': demand.status !== '待处理' }"
                      >
                        取消
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 分页 -->
            <div class="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  @click="currentPage = currentPage - 1"
                  :disabled="currentPage === 1"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                >
                  上一页
                </button>
                <button
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  @click="currentPage = currentPage + 1"
                  :disabled="currentPage >= totalPages"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }"
                >
                  下一页
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 至 
                    <span class="font-medium">{{ Math.min(currentPage * pageSize, totalItems) }}</span> 条，
                    共 <span class="font-medium">{{ totalItems }}</span> 条
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      @click="currentPage = currentPage - 1"
                      :disabled="currentPage === 1"
                      :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                    >
                      <span class="sr-only">上一页</span>
                      <i class="fa fa-chevron-left text-xs"></i>
                    </button>
                    
                    <button
                      v-for="page in Math.min(totalPages, 5)"
                      :key="page"
                      :class="{
                        'bg-blue-50 border-blue-500 text-blue-600': page === currentPage,
                        'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage
                      }"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      @click="currentPage = page"
                    >
                      {{ page }}
                    </button>
                    
                    <button
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      @click="currentPage = currentPage + 1"
                      :disabled="currentPage >= totalPages"
                      :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }"
                    >
                      <span class="sr-only">下一页</span>
                      <i class="fa fa-chevron-right text-xs"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 待办任务 -->
        <div v-if="currentTab === 'todo-list'" class="tab-pane">
          <div class="card bg-white rounded-lg shadow-md p-6">
            <div class="card-title text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              待办任务
            </div>
            
            <!-- 筛选条件 -->
            <div class="filter-bar bg-gray-50 p-4 rounded-md mb-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                  <select 
                    v-model="todoFilter.priority" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="全部">全部</option>
                    <option value="高">高</option>
                    <option value="中">中</option>
                    <option value="低">低</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">类型</label>
                  <select 
                    v-model="todoFilter.type" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="全部类型">全部类型</option>
                    <option value="新专业建设">新专业建设</option>
                    <option value="岗位补充">岗位补充</option>
                    <option value="实验室建设">实验室建设</option>
                    <option value="设备采购">设备采购</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button 
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  @click="fetchTodoTasks"
                >
                  <i class="fa fa-filter mr-2"></i> 筛选
                </button>
              </div>
            </div>
            
            <!-- 任务列表 -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">需求ID</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交日期</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">优先级</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="task in filteredTodoTasks" :key="task.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ task.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ task.title }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ task.type }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ task.submitDate }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getPriorityClass(task.priority)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ task.priority }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(task.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ task.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        class="text-blue-600 hover:text-blue-900 transition-colors mr-3"
                        @click="showDemandDetail(task.id)"
                      >
                        查看详情
                      </button>
                      <button 
                        class="text-green-600 hover:text-green-900 transition-colors"
                        @click="processDemand(task.id)"
                      >
                        处理
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 分页 -->
            <div class="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
              <!-- 分页代码与"我的需求"标签页相同 -->
            </div>
          </div>
        </div>
        
        <!-- 已完成任务 -->
        <div v-if="currentTab === 'completed-tasks'" class="tab-pane">
          <div class="card bg-white rounded-lg shadow-md p-6">
            <div class="card-title text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              已完成任务
            </div>
            
            <!-- 筛选条件 -->
            <div class="filter-bar bg-gray-50 p-4 rounded-md mb-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">处理人员</label>
                  <select 
                    v-model="completedFilter.handler" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="全部">全部人员</option>
                    <option v-for="handler in handlers" :key="handler.id" :value="handler.id">
                      {{ handler.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                  <input 
                    v-model="completedFilter.startDate" 
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                  <input 
                    v-model="completedFilter.endDate" 
                    type="date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button 
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  @click="fetchCompletedTasks"
                >
                  <i class="fa fa-filter mr-2"></i> 筛选
                </button>
              </div>
            </div>
            
            <!-- 任务列表 -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">需求ID</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">完成日期</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="task in filteredCompletedTasks" :key="task.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ task.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ task.title }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ task.type }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ task.department }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ task.completeDate || '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusClass(task.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ task.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        class="text-blue-600 hover:text-blue-900 transition-colors"
                        @click="showCompletedDetail(task.id)"
                      >
                        查看详情
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 分页 -->
            <div class="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
              <!-- 分页代码与"我的需求"标签页相同 -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 需求详情模态框 -->
    <transition name="fade">
      <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" @click.self="closeDetailModal">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="modal-header px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-800">
              {{ currentDemand.title || '需求详情' }}
              <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClass(currentDemand.status || '处理中')">
                {{ currentDemand.status || '处理中' }}
              </span>
            </h3>
            <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-500 transition-colors">
              <i class="fa fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body p-6">
            <div class="space-y-6">
              <div class="detail-section">
                <h4 class="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">基本信息</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="detail-row">
                    <div class="detail-label text-sm font-medium text-gray-500">需求ID：</div>
                    <div class="detail-value text-sm text-gray-900">{{ currentDemand.id || '-' }}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label text-sm font-medium text-gray-500">需求类型：</div>
                    <div class="detail-value text-sm text-gray-900">{{ currentDemand.type || '-' }}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label text-sm font-medium text-gray-500">提交部门：</div>
                    <div class="detail-value text-sm text-gray-900">{{ currentDemand.department || '-' }}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label text-sm font-medium text-gray-500">处理人：</div>
                    <div class="detail-value text-sm text-gray-900">{{ currentDemand.handler || '-' }}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label text-sm font-medium text-gray-500">提交日期：</div>
                    <div class="detail-value text-sm text-gray-900">{{ currentDemand.submitDate || '-' }}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label text-sm font-medium text-gray-500">期望完成日期：</div>
                    <div class="detail-value text-sm text-gray-900">{{ currentDemand.expectedDate || '-' }}</div>
                  </div>
                  <div class="detail-row" v-if="currentDemand.completeDate">
                    <div class="detail-label text-sm font-medium text-gray-500">实际完成日期：</div>
                    <div class="detail-value text-sm text-gray-900">{{ currentDemand.completeDate || '-' }}</div>
                  </div>
                  <div class="detail-row" v-if="currentDemand.priority">
                    <div class="detail-label text-sm font-medium text-gray-500">优先级：</div>
                    <div class="detail-value text-sm text-gray-900">
                      <span :class="getPriorityClass(currentDemand.priority)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ currentDemand.priority || '-' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="detail-section">
                <h4 class="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">需求详情</h4>
                <div class="detail-value text-sm text-gray-900 bg-gray-50 p-4 rounded-md whitespace-pre-line">
                  {{ currentDemand.detail || '无详情描述' }}
                </div>
              </div>
              
              <div class="detail-section">
                <h4 class="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">需求岗位</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">岗位类型</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">职称要求</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">人数</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">专业要求</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">其他要求</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(position, index) in currentDemand.positions || []" :key="index" class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ position.type || '-' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ position.level || '-' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ position.count || '-' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ position.major || '-' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ position.otherRequirements || '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="detail-section" v-if="currentDemand.comments && currentDemand.comments.length">
                <h4 class="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">处理记录</h4>
                <div class="space-y-4">
                  <div v-for="(comment, index) in currentDemand.comments" :key="index" class="bg-gray-50 p-4 rounded-md">
                    <div class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                          {{ comment.handler?.substring(0, 1) || 'U' }}
                        </div>
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ comment.handler || '系统' }}</div>
                          <div class="text-xs text-gray-500">{{ comment.date || '-' }}</div>
                        </div>
                      </div>
                      <div class="text-xs px-2 py-0.5 rounded-full" :class="getStatusClass(comment.status)">
                        {{ comment.status || '处理中' }}
                      </div>
                    </div>
                    <div class="text-sm text-gray-700 whitespace-pre-line">
                      {{ comment.content || '无备注信息' }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="detail-section" v-if="currentTab === 'todo-list' && currentDemand.status === '待处理'">
                <h4 class="text-base font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">处理需求</h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">处理意见</label>
                    <textarea 
                      v-model="processingComment" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
                      placeholder="请输入处理意见..."
                    ></textarea>
                  </div>
                  <div class="flex justify-end space-x-4">
                    <button 
                      class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      @click="closeDetailModal"
                    >
                      取消
                    </button>
                    <button 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      @click="confirmProcessDemand(currentDemand.id)"
                    >
                      确认处理
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer px-6 py-4 border-t border-gray-200 flex justify-end">
            <button 
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              @click="closeDetailModal"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import axios from 'axios';

// 定义接口类型
interface User {
  id: number;
  name: string;
  department: string;
  role: string;
}

interface DemandPosition {
  type: string;
  level: string;
  count: number;
  major: string;
  otherRequirements: string;
}

interface DemandComment {
  handler: string;
  date: string;
  content: string;
  status: string;
}

interface Demand {
  id: string;
  title: string;
  type: string;
  department: string;
  handler: string;
  submitter: string;
  submitDate: string;
  submitID: number;
  expectedDate: string;
  completeDate?: string;
  detail: string;
  positions: DemandPosition[];
  status: string;
  priority: string;
  comments?: DemandComment[];
}

interface DemandFilter {
  status?: string;
  startDate?: string;
  endDate?: string;
  handler?: string;
  priority?: string;
  type?: string;
}

// 状态管理
const userInfo = ref<User>(JSON.parse(localStorage.getItem('user-info') || '{}'));
const currentTab = ref('create-demand');
const currentDemand = ref<Demand>({} as Demand);
const processingComment = ref('');
const showDetailModal = ref(false);
const loading = ref({
  myDemands: false,
  todoTasks: false,
  completedTasks: false,
  submitting: false
});

// 分页参数
const pageSize = ref(10);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(0);

// 模拟数据
const receivers = ref([
  { id: 1, name: '张院长', department: '人事处' },
  { id: 2, name: '李主任', department: '教务处' },
  { id: 3, name: '王教授', department: '计算机学院' },
  { id: 4, name: '赵老师', department: '外语学院' }
]);

const handlers = ref([
  { id: 1, name: '张院长' },
  { id: 2, name: '李主任' },
  { id: 3, name: '王教授' },
  { id: 4, name: '赵老师' }
]);

// 表单数据
const demandForm = reactive({
  title: '',
  type: '新专业建设',
  detail: '',
  priority: '中',
  expectedCompletionTime: '',
  receiverId: 1,
  positions: [
    {
      type: '专业负责人',
      level: '教授',
      count: 1,
      major: '计算机、大数据相关',
      otherRequirements: '5年以上经验'
    }
  ]
});

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
  handler: '全部',
  startDate: '',
  endDate: ''
});

// 数据列表
const myDemands = ref<Demand[]>([]);
const todoTasks = ref<Demand[]>([]);
const completedTasks = ref<Demand[]>([]);

// 显示标签页
const showTab = (tabId: string): void => {
  currentTab.value = tabId;
  // 切换标签页时重置分页
  currentPage.value = 1;
  
  // 加载对应标签页的数据
  switch(tabId) {
    case 'my-demands':
      fetchMyDemands();
      break;
    case 'todo-list':
      fetchTodoTasks();
      break;
    case 'completed-tasks':
      fetchCompletedTasks();
      break;
  }
};

// 获取当前日期 (YYYY-MM-DD)
const getCurrentDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};

// 初始化表单
const resetDemandForm = (): void => {
  demandForm.title = '';
  demandForm.type = '新专业建设';
  demandForm.detail = '';
  demandForm.priority = '中';
  demandForm.expectedCompletionTime = getCurrentDate();
  demandForm.receiverId = 1;
  demandForm.positions = [
    {
      type: '专业负责人',
      level: '教授',
      count: 1,
      major: '计算机、大数据相关',
      otherRequirements: '5年以上经验'
    }
  ];
};

// 添加岗位
const addPosition = () => {
  demandForm.positions.push({
    type: '',
    level: '',
    count: 1,
    major: '',
    otherRequirements: ''
  });
};

// 移除岗位
const removePosition = (index: number) => {
  if (demandForm.positions.length > 1) {
    demandForm.positions.splice(index, 1);
  } else {
    alert('至少保留一个岗位');
  }
};

// 提交需求
const submitDemand = async () => {
  // 表单验证
  if (!demandForm.title) {
    alert('请输入需求标题');
    return;
  }
  
  if (!demandForm.detail) {
    alert('请输入需求详情');
    return;
  }
  
  if (!demandForm.expectedCompletionTime) {
    alert('请选择预期完成时间');
    return;
  }
  
  if (!demandForm.positions || demandForm.positions.length === 0) {
    alert('请至少添加一个岗位');
    return;
  }
  
  // 检查每个岗位是否有必填信息
  const invalidPosition = demandForm.positions.find(pos => !pos.type || !pos.level || !pos.major);
  if (invalidPosition) {
    alert('请确保每个岗位的类型、职称要求和专业要求都已填写');
    return;
  }
  
  try {
    loading.value.submitting = true;
    
    // 准备提交数据
    const submitData = {
      ...demandForm,
      submitter: userInfo.value.name || '未知用户',
      department: userInfo.value.department || '未知部门',
      submitDate: getCurrentDate(),
      status: '待处理',
      submitID: userInfo.value.id || 0,
      id: 'XQ' + new Date().getTime().toString().slice(-8) // 生成唯一ID
    };
    
    // 模拟API调用
    const response = await axios.post('/api/demand/submit', submitData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    
    if (response.data.code === 200) {
      alert('需求提交成功');
      resetDemandForm();
      currentTab.value = 'my-demands';
      fetchMyDemands(); // 刷新我的需求列表
    } else {
      alert('需求提交失败: ' + (response.data.msg || '未知错误'));
    }
  } catch (error: any) {
    console.error('提交需求出错:', error);
    alert('提交需求时发生错误: ' + (error.message || '请检查网络连接'));
  } finally {
    loading.value.submitting = false;
  }
};

// 获取我的需求
const fetchMyDemands = async () => {
  try {
    loading.value.myDemands = true;
    
    // 模拟API调用
    const response = await axios.get('/api/demand/my', {
      params: {
        ...myDemandsFilter,
        page: currentPage.value,
        pageSize: pageSize.value,
        userId: userInfo.value.id
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    
    myDemands.value = response.data.records || [];
    totalItems.value = response.data.total || 0;
    totalPages.value = Math.ceil(totalItems.value / pageSize.value);
  } catch (error: any) {
    console.error('获取我的需求出错:', error);
    alert('获取我的需求列表时发生错误: ' + (error.message || '请检查网络连接'));
  } finally {
    loading.value.myDemands = false;
  }
};

// 获取待办任务
const fetchTodoTasks = async () => {
  try {
    loading.value.todoTasks = true;
    
    // 模拟API调用
    const response = await axios.get('/api/demand/todo', {
      params: {
        ...todoFilter,
        page: currentPage.value,
        pageSize: pageSize.value,
        receiverId: userInfo.value.id
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    
    todoTasks.value = response.data.records || [];
    totalItems.value = response.data.total || 0;
    totalPages.value = Math.ceil(totalItems.value / pageSize.value);
  } catch (error: any) {
    console.error('获取待办任务出错:', error);
    alert('获取待办任务列表时发生错误: ' + (error.message || '请检查网络连接'));
  } finally {
    loading.value.todoTasks = false;
  }
};

// 获取已完成任务
const fetchCompletedTasks = async () => {
  try {
    loading.value.completedTasks = true;
    
    // 模拟API调用
    const response = await axios.get('/api/demand/completed', {
      params: {
        ...completedFilter,
        page: currentPage.value,
        pageSize: pageSize.value,
        receiverId: userInfo.value.id
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    
    completedTasks.value = response.data.records || [];
    totalItems.value = response.data.total || 0;
    totalPages.value = Math.ceil(totalItems.value / pageSize.value);
  } catch (error: any) {
    console.error('获取已完成任务出错:', error);
    alert('获取已完成任务列表时发生错误: ' + (error.message || '请检查网络连接'));
  } finally {
    loading.value.completedTasks = false;
  }
};

// 查看需求详情
const showDemandDetail = async (demandId: string): Promise<void> => {
  try {
    // 先从本地查找
    let demand = myDemands.value.find(d => d.id === demandId) || 
                 todoTasks.value.find(t => t.id === demandId) || 
                 completedTasks.value.find(t => t.id === demandId);
    
    if (demand) {
      currentDemand.value = demand;
      showDetailModal.value = true;
      return;
    }
    
    // 如果本地没有，从服务器获取
    const response = await axios.get(`/api/demand/detail/${demandId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    
    if (response.data.code === 200 && response.data.data) {
      currentDemand.value = response.data.data;
      showDetailModal.value = true;
    } else {
      alert('获取需求详情失败: ' + (response.data.msg || '未知错误'));
    }
  } catch (error: any) {
    console.error('获取需求详情出错:', error);
    alert('获取需求详情时发生错误: ' + (error.message || '请检查网络连接'));
  }
};

// 处理需求
const processDemand = (demandId: string): void => {
  showDemandDetail(demandId);
  processingComment.value = '';
};

// 确认处理需求
const confirmProcessDemand = async (demandId: string) => {
  if (!processingComment.value.trim()) {
    alert('请输入处理意见');
    return;
  }
  
  try {
    const response = await axios.post(`/api/demand/process/${demandId}`, {
      handler: userInfo.value.name || '未知用户',
      content: processingComment.value,
      status: '处理中'
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
    
    if (response.data.code === 200) {
      alert('需求已开始处理');
      closeDetailModal();
      fetchTodoTasks(); // 刷新待办任务列表
      fetchMyDemands(); // 刷新我的需求列表
    } else {
      alert('处理需求失败: ' + (response.data.msg || '未知错误'));
    }
  } catch (error: any) {
    console.error('处理需求出错:', error);
    alert('处理需求时发生错误: ' + (error.message || '请检查网络连接'));
  }
};

// 取消需求
const cancelDemand = async (demandId: string) => {
  if (confirm('确定要取消这个需求吗？')) {
    try {
      const response = await axios.post(`/api/demand/cancel/${demandId}`, null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      
      if (response.data.code === 200) {
        alert('需求已取消');
        fetchMyDemands(); // 刷新我的需求列表
      } else {
        alert('取消需求失败: ' + (response.data.msg || '未知错误'));
      }
    } catch (error: any) {
      console.error('取消需求出错:', error);
      alert('取消需求时发生错误: ' + (error.message || '请检查网络连接'));
    }
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
      return 'bg-yellow-100 text-yellow-800';
    case '处理中':
      return 'bg-blue-100 text-blue-800';
    case '已完成':
      return 'bg-green-100 text-green-800';
    case '已关闭':
      return 'bg-gray-100 text-gray-800';
    case '已拒绝':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// 获取优先级类
const getPriorityClass = (priority: string): string => {
  switch (priority) {
    case '高':
      return 'bg-red-100 text-red-800';
    case '中':
      return 'bg-yellow-100 text-yellow-800';
    case '低':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// 计算属性 - 过滤后的我的需求
const filteredMyDemands = computed(() => {
  return myDemands.value; // 实际过滤在API端处理
});

// 计算属性 - 过滤后的待办任务
const filteredTodoTasks = computed(() => {
  return todoTasks.value; // 实际过滤在API端处理
});

// 计算属性 - 过滤后的已完成任务
const filteredCompletedTasks = computed(() => {
  return completedTasks.value; // 实际过滤在API端处理
});

// 登出
const logout = () => {
  localStorage.removeItem('user-info');
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// 监听分页变化
watch(currentPage, () => {
  switch(currentTab.value) {
    case 'my-demands':
      fetchMyDemands();
      break;
    case 'todo-list':
      fetchTodoTasks();
      break;
    case 'completed-tasks':
      fetchCompletedTasks();
      break;
  }
});

// 页面加载时执行
onMounted(() => {
  console.log('部门对接页面已加载');
  
  // 检查用户是否登录
  if (!userInfo.value.id) {
    alert('请先登录');
    window.location.href = '/login';
    return;
  }
  
  // 初始化表单
  resetDemandForm();
  
  // 加载我的需求数据
  fetchMyDemands();
});
</script>

<style scoped>
/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>  