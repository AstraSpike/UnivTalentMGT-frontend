<template>
    <div class="person-detail-container">
      <div class="detail-header">
        <h2>人员详细信息</h2>
        <button @click="goBack">返回</button>
      </div>
      
      <div class="detail-content" v-if="personInfo">
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
          <!-- 更多基本信息字段 -->
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
          <!-- 更多工作信息字段 -->
        </div>
      </div>
      
      <div v-else class="loading">
        加载中...
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getPersonDetail } from '@/service/personnelService'
  
  const route = useRoute()
  const router = useRouter()
  const personInfo = ref(null)
  
  const fetchPersonDetail = async () => {
    try {
      const { id } = route.params
      const res = await getPersonDetail(id)
      personInfo.value = res.data
    } catch (error) {
      console.error('获取人员详情失败:', error)
    }
  }
  
  const goBack = () => {
    router.go(-1)
  }
  
  onMounted(() => {
    fetchPersonDetail()
  })
  </script>
  
  <style scoped>
  .person-detail-container {
    padding: 20px;
  }
  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .info-row {
    margin: 10px 0;
  }
  .label {
    font-weight: bold;
    margin-right: 10px;
  }
  .loading {
    text-align: center;
    padding: 50px;
  }
  </style>