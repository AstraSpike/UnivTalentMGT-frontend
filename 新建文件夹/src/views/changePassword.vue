<template>
    <div class="modal-mask">
      <div class="modal-container" :class="{ 'scale-in': showModal }">
        <div class="modal-header">
          <h3 class="modal-title">修改密码</h3>
          <button class="close-button" @click="closeModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="currentPassword">当前密码</label>
              <div class="input-container">
                <i class="fa fa-lock input-icon"></i>
                <input 
                  type="password" 
                  id="currentPassword" 
                  v-model="form.currentPassword" 
                  placeholder="请输入当前密码"
                  required
                >
              </div>
              <div class="error-message" v-if="form.currentPassword && form.currentPassword.length < 6">
                密码长度至少为6位
              </div>
            </div>
            
            <div class="form-group">
              <label for="newPassword">新密码</label>
              <div class="input-container">
                <i class="fa fa-lock input-icon"></i>
                <input 
                  type="password" 
                  id="newPassword" 
                  v-model="form.newPassword" 
                  placeholder="请输入新密码"
                  required
                >
              </div>
              <div class="password-strength" v-if="form.newPassword">
                <div class="strength-meter">
                  <div 
                    class="strength-bar" 
                    :class="getStrengthClass(passwordStrength)" 
                    :style="{ width: `${passwordStrength}%` }"
                  ></div>
                </div>
                <div class="strength-text">{{ getStrengthText(passwordStrength) }}</div>
              </div>
              <div class="error-message" v-if="form.newPassword && form.newPassword.length < 6">
                密码长度至少为6位
              </div>
              <div class="error-message" v-if="form.newPassword === form.currentPassword">
                新密码不能与当前密码相同
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">确认新密码</label>
              <div class="input-container">
                <i class="fa fa-lock input-icon"></i>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  v-model="form.confirmPassword" 
                  placeholder="请再次输入新密码"
                  required
                >
              </div>
              <div class="error-message" v-if="form.confirmPassword && form.confirmPassword !== form.newPassword">
                两次输入的密码不一致
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
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // 密码强度计算
  const passwordStrength = computed(() => {
    if (!form.value.newPassword) return 0;
    
    let strength = 0;
    
    // 长度检查
    if (form.value.newPassword.length >= 8) strength += 25;
    if (form.value.newPassword.length >= 12) strength += 25;
    
    // 包含小写字母
    if (/[a-z]/.test(form.value.newPassword)) strength += 15;
    
    // 包含大写字母
    if (/[A-Z]/.test(form.value.newPassword)) strength += 15;
    
    // 包含数字
    if (/[0-9]/.test(form.value.newPassword)) strength += 15;
    
    // 包含特殊字符
    if (/[^a-zA-Z0-9]/.test(form.value.newPassword)) strength += 15;
    
    return Math.min(strength, 100);
  });
  
  // 获取强度文本描述
  const getStrengthText = (strength: number) => {
    if (strength === 0) return '';
    if (strength < 40) return '弱';
    if (strength < 70) return '中';
    return '强';
  };
  
  // 获取强度样式类
  const getStrengthClass = (strength: number) => {
    if (strength < 40) return 'weak';
    if (strength < 70) return 'medium';
    return 'strong';
  };
  
  // 表单验证
  const isFormValid = computed(() => {
    return (
      form.value.currentPassword.length >= 6 &&
      form.value.newPassword.length >= 6 &&
      form.value.newPassword !== form.value.currentPassword &&
      form.value.confirmPassword === form.value.newPassword &&
      passwordStrength.value >= 40
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
  
  // 提交表单
  const handleSubmit = () => {
    if (!isFormValid.value) return;
    
    // 模拟API调用
    console.log('提交修改密码表单:', form.value);
    
    // 显示成功消息
    alert('密码修改成功！');
    
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
  
  .password-strength {
    margin-top: 8px;
  }
  
  .strength-meter {
    height: 6px;
    background-color: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .strength-bar {
    height: 100%;
    transition: width 0.3s ease;
  }
  
  .strength-bar.weak {
    background-color: #F87272;
  }
  
  .strength-bar.medium {
    background-color: #FBBD23;
  }
  
  .strength-bar.strong {
    background-color: #36D399;
  }
  
  .strength-text {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
    text-align: right;
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