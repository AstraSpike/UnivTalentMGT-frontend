<template>
    <div class="modal-mask">
      <div class="modal-container" :class="{ 'scale-in': showModal }">
        <div class="modal-header">
          <h3 class="modal-title">修改手机号</h3>
          <button class="close-button" @click="closeModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="currentPhone">当前手机号</label>
              <div class="input-container">
                <i class="fa fa-mobile input-icon"></i>
                <input 
                  type="tel" 
                  id="currentPhone" 
                  v-model="form.currentPhone" 
                  placeholder="请输入当前手机号"
                  required
                  maxlength="11"
                  pattern="^1[3-9]\d{9}$"
                >
              </div>
              <div class="error-message" v-if="form.currentPhone && !phonePattern.test(form.currentPhone)">
                请输入有效的手机号
              </div>
            </div>
            
            <div class="form-group">
              <label for="currentCode">验证码</label>
              <div class="input-container with-button">
                <i class="fa fa-key input-icon"></i>
                <input 
                  type="text" 
                  id="currentCode" 
                  v-model="form.currentCode" 
                  placeholder="请输入验证码"
                  required
                  maxlength="6"
                >
                <button 
                  type="button" 
                  class="get-code-button" 
                  :disabled="countdown > 0"
                  @click="sendCurrentCode"
                >
                  {{ countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码' }}
                </button>
              </div>
            </div>
            
            <div class="form-group">
              <label for="newPhone">新手机号</label>
              <div class="input-container">
                <i class="fa fa-mobile input-icon"></i>
                <input 
                  type="tel" 
                  id="newPhone" 
                  v-model="form.newPhone" 
                  placeholder="请输入新手机号"
                  required
                  maxlength="11"
                  pattern="^1[3-9]\d{9}$"
                >
              </div>
              <div class="error-message" v-if="form.newPhone && !phonePattern.test(form.newPhone)">
                请输入有效的手机号
              </div>
              <div class="error-message" v-if="form.newPhone === form.currentPhone">
                新手机号不能与当前手机号相同
              </div>
            </div>
            
            <div class="form-group">
              <label for="newCode">新手机验证码</label>
              <div class="input-container with-button">
                <i class="fa fa-key input-icon"></i>
                <input 
                  type="text" 
                  id="newCode" 
                  v-model="form.newCode" 
                  placeholder="请输入验证码"
                  required
                  maxlength="6"
                >
                <button 
                  type="button" 
                  class="get-code-button" 
                  :disabled="newCountdown > 0 || !phonePattern.test(form.newPhone)"
                  @click="sendNewCode"
                >
                  {{ newCountdown > 0 ? `${newCountdown}秒后重新获取` : '获取验证码' }}
                </button>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" class="cancel-button" @click="closeModal">
                取消
              </button>
              <button type="submit" class="submit-button" :disabled="!isFormValid">
                确认修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  
  // 定义表单数据
  const form = ref({
    currentPhone: '',
    currentCode: '',
    newPhone: '',
    newCode: ''
  });
  
  // 手机号正则
  const phonePattern = /^1[3-9]\d{9}$/;
  
  // 倒计时
  const countdown = ref(0);
  const newCountdown = ref(0);
  
  // 表单验证
  const isFormValid = computed(() => {
    return (
      phonePattern.test(form.value.currentPhone) &&
      form.value.currentCode.length === 6 &&
      phonePattern.test(form.value.newPhone) &&
      form.value.newPhone !== form.value.currentPhone &&
      form.value.newCode.length === 6
    );
  });
  
  // 模态框状态
  const showModal = ref(true);
  
  // 关闭模态框
  const closeModal = () => {
    showModal.value = false;
    setTimeout(() => {
      // 返回上一页或执行其他操作
      history.back();
    }, 300);
  };
  
  // 发送当前手机号验证码
  const sendCurrentCode = () => {
    if (!phonePattern.test(form.value.currentPhone)) {
      alert('请输入有效的手机号');
      return;
    }
    
    // 模拟发送验证码
    console.log('发送验证码到:', form.value.currentPhone);
    
    // 设置倒计时
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };
  
  // 发送新手机号验证码
  const sendNewCode = () => {
    if (!phonePattern.test(form.value.newPhone)) {
      alert('请输入有效的新手机号');
      return;
    }
    
    if (form.value.newPhone === form.value.currentPhone) {
      alert('新手机号不能与当前手机号相同');
      return;
    }
    
    // 模拟发送验证码
    console.log('发送验证码到:', form.value.newPhone);
    
    // 设置倒计时
    newCountdown.value = 60;
    const timer = setInterval(() => {
      newCountdown.value--;
      if (newCountdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };
  
  // 提交表单
  const handleSubmit = () => {
    if (!isFormValid.value) return;
    
    // 模拟API调用
    console.log('提交修改手机号表单:', form.value);
    
    // 显示成功消息
    alert('手机号修改成功！');
    
    // 关闭模态框
    closeModal();
  };
  
  // 动画效果
  onMounted(() => {
    setTimeout(() => {
      showModal.value = true;
    }, 10);
  });
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  
  .modal-container {
    width: 70%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    transform: scale(0.9);
    opacity: 0;
  }
  
  .scale-in {
    transform: scale(1);
    opacity: 1;
  }
  
  .modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  
  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #999;
    font-size: 16px;
    transition: color 0.2s;
  }
  
  .close-button:hover {
    color: #333;
  }
  
  .modal-body {
    padding: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
  
  .input-container {
    position: relative;
  }
  
  .input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
  
  .input-container input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    transition: border-color 0.2s;
  }
  
  .input-container input:focus {
    outline: none;
    border-color: #165DFF;
  }
  
  .input-container.with-button {
    display: flex;
    gap: 12px;
  }
  
  .get-code-button {
    padding: 0 16px;
    background-color: #165DFF;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s;
  }
  
  .get-code-button:disabled {
    background-color: #94b5ff;
    cursor: not-allowed;
  }
  
  .error-message {
    color: #F87272;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 24px;
  }
  
  .cancel-button,
  .submit-button {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .cancel-button {
    background-color: #f5f5f5;
    color: #666;
    border: none;
  }
  
  .cancel-button:hover {
    background-color: #f0f0f0;
  }
  
  .submit-button {
    background-color: #165DFF;
    color: #fff;
    border: none;
  }
  
  .submit-button:disabled {
    background-color: #94b5ff;
    cursor: not-allowed;
  }
  
  .submit-button:not(:disabled):hover {
    background-color: #0e47cc;
  }
  </style>