<template>
  <div class="person-detail-container">
    <div class="detail-header">
      <h2>人员详细信息</h2>
      <button @click="goBack">返回</button>
    </div>
    
    <!-- 错误状态 -->
    <div v-if="error" class="error-message">
      <el-icon><CircleClose /></el-icon>
      <span>{{ error }}</span>
      <el-button size="small" @click="retry">重试</el-button>
    </div>
    
    <!-- 加载状态 -->
    <div v-else-if="loading" class="skeleton">
      <div class="skeleton-header"></div>
      <div class="skeleton-section">
        <div class="skeleton-title"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
      </div>
      <div class="skeleton-section">
        <div class="skeleton-title"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
      </div>
    </div>
    
    <!-- 数据显示 -->
    <div v-else-if="personInfo" class="detail-content">
      <div class="basic-info">
        <h3>基本信息</h3>
        <div class="info-row">
          <span class="label">姓名：</span>
          <span class="value">{{ personInfo.name }}</span>
        </div>
        <div class="info-row">
          <span class="label">性别：</span>
          <span class="value">{{ personInfo.gender }}</span>
        </div>
        <div class="info-row">
          <span class="label">年龄：</span>
          <span class="value">{{ personInfo.age }}</span>
        </div>
      </div>
      
      <div class="work-info">
        <h3>工作信息</h3>
        <div class="info-row">
          <span class="label">院系：</span>
          <span class="value">{{ personInfo.department }}</span>
        </div>
        <div class="info-row">
          <span class="label">职务：</span>
          <span class="value">{{ personInfo.position }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPersonDetail } from '@/service/personnelService'
import { CircleClose } from '@element-plus/icons-vue'

// 人员信息接口
interface Person {
  id:number;
  jobid: string;//工号
  name: string;
  gender: string;
  age: number;
  department: string;
  position: string;
  title:string;
  entry_time:string;
  degree:string;
  university:string;
  major:string;
  email:string;
  phone:string;
  political_status:string;
  native_place:string;
  marital_status:string;
  ethnicity:string;
}

// 状态管理
const route = useRoute()
const router = useRouter()
const personInfo = ref<Person | null>(null)
const loading = ref(false)
const error = ref('')

// 判断是否为有效人员数据
const isValidPerson = (data: any): data is Person => {
  return (
    data && 
    typeof data.id === 'number' &&
    typeof data.jobid === 'string' &&
    typeof data.name === 'string' &&
    typeof data.gender === 'string' &&
    typeof data.age === 'number' &&
    typeof data.department === 'string' &&
    typeof data.position === 'string' &&
    typeof data.title === 'string' &&
    typeof data.entry_time === 'string' &&
    typeof data.degree === 'string' &&
    typeof data.university === 'string' &&
    typeof data.major === 'string' &&
    typeof data.email === 'string' &&
    typeof data.phone === 'string' &&
    typeof data.political_status === 'string' &&
    typeof data.native_place === 'string' &&
    typeof data.marital_status === 'string' &&
    typeof data.ethnicity === 'string'
  )
}

// 获取人员详情
const fetchPersonDetail = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 获取并验证路由参数
const idParam = (route.params.id as unknown) as number | undefined
    if (!idParam) throw new Error('缺少人员ID')
    
    // 转换为数字并验证
// 由于 idParam 可能是 number 类型，直接赋值给 id，避免 parseInt 接收非字符串参数的问题
const id = typeof idParam === 'number' ? idParam : typeof idParam === 'string' ? parseInt(idParam, 10) : NaN;
    if (isNaN(id)) throw new Error('无效的人员ID')
    
    // 获取数据
// 由于 getPersonDetail 可能需要字符串类型的参数，将数字类型的 id 转换为字符串
const res = await getPersonDetail(id.toString())
    
    // 验证数据结构
    if (!isValidPerson(res.data)) {
      throw new Error('获取的数据格式不正确')
    }
    
    personInfo.value = res.data
  } catch (err: any) {
    error.value = err.message || '获取人员详情失败'
    console.error('获取人员详情失败:', err)
  } finally {
    loading.value = false
  }
}

// 返回上一页
const goBack = () => {
  // 如果有上一页则返回，否则返回首页
  if (router.currentRoute.value.meta?.backPath) {
    router.push(router.currentRoute.value.meta.backPath as string)
  } else if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

// 重试获取数据
const retry = () => {
  fetchPersonDetail()
}

// 组件挂载后加载数据
onMounted(() => {
  fetchPersonDetail()
})
</script>

<style scoped>
/* 基本样式 */
.person-detail-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.detail-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.info-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.label {
  width: 120px;
  color: #606266;
}

.value {
  flex: 1;
}

h3 {
  color: #303133;
  font-size: 16px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #ebeef5;
}

/* 错误信息样式 */
.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #fef0f0;
  color: #f56c6c;
  border-radius: 4px;
  margin-bottom: 20px;
}

/* 骨架屏样式 */
.skeleton {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.skeleton-header,
.skeleton-title,
.skeleton-row {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 10px;
}

.skeleton-header {
  height: 30px;
  width: 200px;
  margin-bottom: 20px;
}

.skeleton-title {
  height: 24px;
  width: 100px;
  margin-bottom: 15px;
}

.skeleton-row {
  height: 20px;
  width: 100%;
}

.skeleton-section {
  margin-bottom: 20px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>