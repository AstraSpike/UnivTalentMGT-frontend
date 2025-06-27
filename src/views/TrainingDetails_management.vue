<template>
    <div class="main-content">
      <div class="header">
        <div class="page-title">{{'培训详情' }}</div>
      </div>
      
      <div class="card">
        <div class="card-title">
          <div>{{'加载中...' }}</div>
          <button class="btn btn-secondary" @click="goBack">返回</button>
        </div>
        
        <div class="detail-container">
          <div class="detail-section">
            <h3 class="section-title">基本信息</h3>
<div class="detail-row">
  <div class="detail-label">能力维度:</div>
  <div class="detail-value">
    <span v-if="trainingData && trainingData.trainingNeeds && trainingData.trainingNeeds.length > 0">
      <span v-for="(need, index) in trainingData.trainingNeeds" :key="need.skill">
        {{ need.skill }}
        <span v-if="index < trainingData.trainingNeeds.length - 1">、</span>
      </span>
    </span>
    <span v-else>-</span>
  </div>
</div>
            <div class="detail-row">
              <div class="detail-label">需培训人数:</div>
              <div class="detail-value">{{ '-' }}</div>
            </div>
<div class="detail-row">
  <div class="detail-label">推荐课程:</div>
  <div class="detail-value">
    <span v-if="trainingData && trainingData.trainingCourses.length > 0">
      <span v-for="(course, index) in trainingData.trainingCourses" :key="course.courseId">
        {{ course.courseName }}
        <span v-if="index < trainingData.trainingCourses.length - 1">、</span>
      </span>
    </span>
    <span v-else>-</span>
  </div>
</div>
          </div>
          
          <div class="detail-section">
            <h3 class="section-title">详细描述</h3>
            <div class="detail-description">
              {{ '暂无详细描述' }}
            </div>
          </div>
          
          <div class="detail-section">
            <h3 class="section-title">推荐参训人员</h3>
            <div class="participants-container">
              <!-- <div class="participant-item" v-for="(participant, index) in detailData.participants || []" :key="index"> -->
                <!-- <div class="participant-avatar">
                  {{ participant.name.charAt(0) }}
                </div>
                <div class="participant-info">
                  <div class="participant-name">{{ participant.name }}</div>
                  <div class="participant-position">{{ participant.position }}</div>
                  <div class="participant-department">{{ participant.department }}</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name="management">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import axios from 'axios';
// 为了解决找不到模块声明文件的问题，使用 @ts-ignore 临时忽略类型检查
// @ts-ignore
import { generateTrainingRecommendation, processTrainingData } from '../service/trainingService';
interface TrainingData {
    staffId: string;
    trainingNeeds: { skill: string; priority: string }[];
    trainingCourses: { courseName: string; courseId: string }[];
}  

  const router = useRouter();
  const route = useRoute();
  const goBack = () => {
    router.back();
  };
const staffId = 'S001';
const capabilities = {
  teaching: 4.5,
  research: 4.8,
  management: 3.9,
  innovation: 4.2
};
const positionRequirements = {
  requiredSkills: ["Data Analysis", "Machine Learning"],
  minimumExperience: 3
};

const trainingData = ref<TrainingData | null>(null);;
const loading = ref(false);
const error = ref('');

const fetchTrainingRecommendation = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await generateTrainingRecommendation({
      staffId,
      capabilities,
      positionRequirements
    });
    trainingData.value = processTrainingData(response.data);
    console.log(trainingData.value);
  } catch (err) {
     if (err instanceof Error) {
            error.value = err.message;
        } else {
            error.value = '未知错误';
        }
  } finally {
    loading.value = false;
  }
};
// 组件挂载后立即获取培训推荐
fetchTrainingRecommendation();
</script>
  
  <style scoped>
  .main-content {
    max-width: 1200px; /* 限制最大宽度 */
    margin: 0 auto;    /* 水平居中 */
    padding: 20px;     /* 添加内边距 */
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
  }
  
  .page-title {
    font-size: 20px;
    font-weight: bold;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #1890ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  
  .user-name {
    font-size: 14px;
  }
  
  .card {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    padding: 20px;
  }
  
  .card-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .detail-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .detail-section {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 15px;
  }
  
  .section-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  
  .detail-row {
    display: flex;
    margin-bottom: 10px;
  }
  
  .detail-label {
    width: 120px;
    color: #888;
    font-size: 14px;
  }
  
  .detail-value {
    flex: 1;
    font-size: 14px;
  }
  
  .detail-description {
    font-size: 14px;
    line-height: 1.6;
  }
  
  .participants-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }
  
  .participant-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }
  
  .participant-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #1890ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }
  
  .participant-info {
    flex: 1;
  }
  
  .participant-name {
    font-weight: bold;
    margin-bottom: 3px;
  }
  
  .participant-position, .participant-department {
    font-size: 12px;
    color: #666;
  }
  </style>