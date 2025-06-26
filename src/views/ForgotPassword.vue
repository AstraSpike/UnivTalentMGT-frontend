<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">忘记密码</h2>
      
      <!-- 步骤1：输入邮箱 -->
      <div v-if="step === 1" class="login-form">
        <div class="form-group">
          <input v-model="email" type="email" placeholder="请输入注册邮箱" class="login-input">
        </div>
        <button @click="sendVerificationCode" class="login-btn">发送验证码</button>
      </div>
      
      <!-- 步骤2：验证码验证 -->
      <div v-if="step === 2" class="login-form">
        <div class="form-group">
          <input v-model="verificationCode" placeholder="请输入6位验证码" class="login-input">
        </div>
        <button @click="verifyCode" class="login-btn">验证</button>
      </div>
      
      <!-- 步骤3：设置新密码 -->
      <div v-if="step === 3" class="login-form">
        <div class="form-group">
          <input v-model="newPassword" type="password" placeholder="请输入新密码" class="login-input">
        </div>
        <div class="form-group">
          <input v-model="confirmPassword" type="password" placeholder="请再次输入新密码" class="login-input">
        </div>
        <button @click="resetPassword" class="login-btn">重置密码</button>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div class="login-footer">
        <router-link to="/login" class="login-link">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthModel from '../models/authModel'; // 根据实际路径调整导入路径

const router = useRouter();
const step = ref(1); // 1: 输入邮箱, 2: 验证码, 3: 设置密码
const email = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const error = ref('');

const sendVerificationCode = async () => {
    try {
        await AuthModel.sendVerificationCode(email.value);
        step.value = 2;
    } catch (err) {
        error.value = err instanceof Error ? err.message : '发送验证码失败';
    }
};

const verifyCode = async () => {
    try {
        await AuthModel.verifyVerificationCode(email.value, verificationCode.value);
        step.value = 3;
    } catch (err) {
        error.value = err instanceof Error ? err.message : '发送验证码失败';
    }
};

const resetPassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        error.value = '两次输入的密码不一致';
        return;
    }

    try {
        await AuthModel.resetPassword(email.value, verificationCode.value, newPassword.value);
        router.push('/login');
    } catch (err) {
        error.value = err instanceof Error ? err.message : '发送验证码失败';
    }
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.login-title {
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.login-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #40a9ff;
}

.error-message {
  color: #f5222d;
  margin-bottom: 20px;
  text-align: center;
}

.login-footer {
  text-align: center;
}

.login-link {
  color: #1890ff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>