<template>
   <div class="main-content" :key="$route.fullPath">
        <div class="card">
            <div class="card-title">培训详情（{{ ability }}）</div>
            <div class="detail-section">
                <h3>基本信息</h3>
                <p>能力维度: {{ ability }}</p>
                <p>需培训人数: {{ count }}</p>
            </div>
            <div class="detail-section">
                <h3>推荐参训人员</h3>
                <ul>
                    <li v-for="person in personnelList" :key="person.personnelId">
                        {{ person.name }}（ID: {{ person.personnelId }}）
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
  <script lang="ts" setup name="teach">
  import { ref, onMounted,onUnmounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useTrainingStore } from '../stores/training';
  const trainingStore = useTrainingStore();
  const router = useRouter();
  const route = useRoute();
  const goBack = () => {
    router.back();
  };

  // 移除与personnelId相关的逻辑（因需求是展示整体信息，无需单个人员ID）
  const loading = ref(false);
  const error = ref('');
// 从Pinia获取数据
const { ability, count, courses, personnelList } = trainingStore.currentDetails || {};
  // 组件卸载时清除数据
onUnmounted(() => {
  trainingStore.clearCurrentDetails();
});
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
