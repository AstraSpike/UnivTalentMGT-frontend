<template>
  <div class="login-container">
    <!-- 登录卡片 -->
    <div class="login-card">
      <!-- 卡片头部 -->
      <div class="card-header">
        <div class="logo">
          <i class="fa fa-graduation-cap"></i>
        </div>
        <h2>干部教师管理系统</h2>
        <p>请登录或注册您的账户</p>
      </div>

      <!-- 登录/注册方式切换 -->
      <div class="login-type-toggle">
        <button 
          class="toggle-btn" 
          :class="{ 'active': isLoginMode }"
          @click="isLoginMode = true"
        >
          <i class="fa fa-user-circle"></i>
          <span>登录</span>
        </button>
        <button 
          class="toggle-btn" 
          :class="{ 'active': !isLoginMode }"
          @click="isLoginMode = false"
        >
          <i class="fa fa-user-plus"></i>
          <span>注册</span>
        </button>
      </div>

      <!-- 卡片内容 -->
      <div class="card-body">
        <form @submit.prevent="isLoginMode ? handleLogin() : handleRegister()">
          <!-- 用户名/邮箱输入 -->
          <div class="form-group">
            <div class="input-wrapper">
              <i :class="loginType === 'userid' ? 'fa fa-user' : 'fa fa-envelope'"></i>
              <input 
                type="text" 
                v-model="form.username" 
                :placeholder="loginType === 'userid' ? '请输入用户名或工号' : '请输入邮箱'"
                required
              >
            </div>
            <p class="error-message" v-if="errors.username">{{ errors.username }}</p>
          </div>

          <!-- 密码/验证码输入 -->
          <div class="form-group">
            <div class="input-wrapper">
              <i :class="loginType === 'userid' ? 'fa fa-lock' : 'fa fa-key'"></i>
              <input 
                :type="loginType === 'userid' && passwordVisible ? 'text' : 'password'" 
                v-model="form.password" 
                :placeholder="loginType === 'userid' ? '请输入密码' : '请输入验证码'"
                required
              >
              <!-- 密码可见性切换 -->
              <button 
                v-if="loginType === 'userid'"
                type="button" 
                class="toggle-password"
                @click="togglePasswordVisibility"
              >
                <i :class="passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </button>
            </div>
            <p class="error-message" v-if="errors.password">{{ errors.password }}</p>
          </div>

          <!-- 忘记密码 -->
          <div class="form-options">
            <div class="placeholder" v-show="loginType !== 'userid'"></div>
            <a href="#" class="forgot-password" v-show="isLoginMode && loginType === 'userid'" @click.prevent="$router.push('/forgot-password')">忘记密码?</a>
          </div>

          <!-- 登录/注册按钮 -->
          <button 
            type="submit" 
            class="login-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading-spinner">
              <i class="fa fa-circle-o-notch fa-spin"></i>
            </span>
            {{ isLoginMode ? (loginType === 'userid' ? '密码登录' : '验证码登录') : '注册' }}
          </button>

          <!-- 错误提示 -->
          <div v-if="loginError" class="error-alert">
            <i class="fa fa-exclamation-circle"></i>
            <p>{{ loginError }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthModel from '../models/authModel';
import personnelService from '../service/personnelService';

// 引入路由
const router = useRouter();

// 登录/注册模式
const isLoginMode = ref(true);

// 登录类型：'userid' 或 'email'
const loginType = ref('userid');

// 表单数据
const form = reactive({
  username: '',  // 可以是工号或邮箱
  password: ''   // 可以是密码或验证码
});

// 表单验证错误
const errors = reactive({
  username: '',
  password: ''
});

// 状态管理
const isLoading = ref(false);
const loginError = ref('');
const passwordVisible = ref(false);
const isSendingCode = ref(false);
const countdown = ref(0);
let countdownTimer: number | null = null;

// 切换密码可见性
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// 表单验证
const validateForm = () => {
  let isValid = true;

  // 重置错误
  errors.username = '';
  errors.password = '';

  // 验证用户名
  if (!form.username.trim()) {
      errors.username = loginType.value === 'userid' 
          ? '请输入工号' 
          : '请输入邮箱';
      isValid = false;
  } 
  // 验证密码/验证码
  if (!form.password) {
      errors.password = loginType.value === 'userid' 
          ? '请输入密码' 
          : '请输入验证码';
      isValid = false;
  } else if (loginType.value === 'userid' && form.password.length < 6) {
      errors.password = '密码长度至少为6个字符';
      isValid = false;
  } else if (loginType.value === 'email' && !/^\d{6}$/.test(form.password)) {
      errors.password = '验证码格式不正确';
      isValid = false;
  }

  return isValid;
};
// 开始倒计时
const startCountdown = () => {
  countdown.value = 60;

  // 清除之前的计时器
  if (typeof countdownTimer === 'number') {
      clearInterval(countdownTimer);
  }

  // 设置新的计时器
  countdownTimer = setInterval(() => {
      if (countdown.value > 0) {
          countdown.value--;
      } else {
          clearInterval(countdownTimer as number);
          countdownTimer = null;
      }
  }, 1000);
};

// 组件卸载时清除计时器
onUnmounted(() => {
  if (countdownTimer !== null) {
      clearInterval(countdownTimer);
  }
});

// 登录处理
const handleLogin = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    isLoading.value = true;
    loginError.value = '';

    const data = await AuthModel.login(form);
    console.log('登录成功，数据:', data);

    // 存储token和用户信息
    sessionStorage.setItem("token", data.token);
    const userInfo = {
      userId: data.userId,
      username: data.username
    };
    localStorage.setItem("user-info", JSON.stringify(userInfo));
    
    // 跳转到目标页面
    router.push("/home")
  } catch (error) {
    console.error('登录失败:', error);
    loginError.value = '用户名或密码错误';
  } finally {
    isLoading.value = false;
  }
};

// 注册处理
const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    isLoading.value = true;
    loginError.value = '';

    const data = await AuthModel.register(form);
    console.log('注册成功，数据:', data);

    // 注册成功后自动登录
    await handleLogin();
  } catch (error) {
    console.error('注册失败:', error);
    loginError.value = '注册失败，请重试';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* 导入字体图标 */
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');

/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
}

a {
  color: #165DFF;
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: #0E42D2;
}

/* 登录容器 */
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #165DFF 0%, #0E42D2 100%);
}

/* 登录卡片 */
.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  z-index: 10;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

/* 卡片头部 */
.card-header {
  padding: 40px 30px 30px;
  text-align: center;
  position: relative;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #165DFF 0%, #409EFF 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  box-shadow: 0 10px 20px rgba(22, 93, 255, 0.2);
}

.logo i {
  color: white;
  font-size: 28px;
}

.card-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.card-header p {
  color: #666;
  font-size: 14px;
}

/* 登录方式切换 */
.login-type-toggle {
  display: flex;
  margin: 0 30px 30px;
  border-radius: 10px;
  background: rgba(238, 238, 238, 0.5);
  padding: 3px;
}

.toggle-btn {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-btn i {
  margin-right: 8px;
}

.toggle-btn.active {
  background: white;
  color: #165DFF;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 卡片内容 */
.card-body {
  padding: 0 30px 40px;
}

/* 表单组 */
.form-group {
  margin-bottom: 24px;
}

/* 输入框包装器 */
.input-wrapper {
  position: relative;
}

.input-wrapper i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  transition: color 0.2s;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 16px 16px 44px;
  background: white;
  border: 1px solid #E0E6ED;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.input-wrapper input:focus {
  outline: none;
  border-color: #165DFF;
  box-shadow: 0 0 0 3px rgba(22, 93, 255, 0.15);
}

.input-wrapper input:focus + i {
  color: #165DFF;
}

/* 切换密码可见性按钮 */
.toggle-password {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  outline: none;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #333;
}

/* 获取验证码按钮 */
.get-code-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #165DFF 0%, #409EFF 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  box-shadow: 0 2px 8px rgba(22, 93, 255, 0.2);
}

.get-code-btn:hover:not(:disabled) {
  transform: translateY(-50%) scale(1.02);
  box-shadow: 0 4px 10px rgba(22, 93, 255, 0.3);
}

.get-code-btn:disabled {
  background: linear-gradient(135deg, #A6C8FF 0%, #7AA8FF 100%);
  cursor: not-allowed;
  box-shadow: none;
}

/* 错误消息 */
.error-message {
  color: #f5222d;
  font-size: 12px;
  margin-top: 6px;
  display: flex;
  align-items: center;
}

.error-message::before {
  content: "!";
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #f5222d;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  font-size: 10px;
  margin-right: 6px;
}

/* 表单选项 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.placeholder {
  width: 1px;
  visibility: hidden;
}

.forgot-password {
  color: #165DFF;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* 登录按钮 */
.login-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #165DFF 0%, #0E42D2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  box-shadow: 0 10px 20px rgba(22, 93, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(22, 93, 255, 0.3);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(22, 93, 255, 0.2);
}

.login-button:disabled {
  background: linear-gradient(135deg, #A6C8FF 0%, #7AA8FF 100%);
  cursor: not-allowed;
  box-shadow: none;
}

/* 加载动画 */
.loading-spinner {
  margin-right: 8px;
}

.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}

/* 错误提示 */
.error-alert {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: rgba(245, 34, 45, 0.05);
  border: 1px solid rgba(245, 34, 45, 0.1);
  border-radius: 10px;
  margin-top: 15px;
  color: #f5222d;
  font-size: 14px;
  transition: all 0.2s;
}

.error-alert i {
  margin-right: 8px;
}
</style>