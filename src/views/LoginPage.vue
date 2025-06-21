<template>
  <div class="login-container">
      <!-- 背景装饰元素 -->
      <div class="bg-decoration bg-top"></div>
      <div class="bg-decoration bg-bottom"></div>
      
      <!-- 登录卡片 -->
      <div class="login-card">
          <!-- 卡片头部 -->
          <div class="card-header">
              <div class="logo">
                  <i class="fa fa-graduation-cap"></i>
              </div>
              <h2>干部教师管理系统</h2>
              <p>请登录您的账户</p>
          </div>
          
          <!-- 登录方式切换 -->
          <div class="login-type-toggle">
              <button 
                  class="toggle-btn" 
                  :class="{ 'active': loginType === 'userid' }"
                  @click="loginType = 'userid'"
              >
                  <i class="fa fa-user-circle"></i>
                  <span>学号登录</span>
              </button>
              <button 
                  class="toggle-btn" 
                  :class="{ 'active': loginType === 'email' }"
                  @click="loginType = 'email'"
              >
                  <i class="fa fa-envelope"></i>
                  <span>邮箱登录</span>
              </button>
          </div>
          
          <!-- 卡片内容 -->
          <div class="card-body">
              <form @submit.prevent="handleLogin">
                  <!-- 用户名/邮箱输入 -->
                  <div class="form-group">
                      <div class="input-wrapper">
                          <i :class="loginType === 'userid' ? 'fa fa-user' : 'fa fa-envelope'"></i>
                          <input 
                              type="text" 
                              v-model="form.identifier" 
                              :placeholder="loginType === 'userid' ? '请输入用户名或工号' : '请输入邮箱'"
                              required
                          >
                      </div>
                      <p class="error-message" v-if="errors.identifier">{{ errors.identifier }}</p>
                  </div>
                  
                  <!-- 密码/验证码输入 -->
                  <div class="form-group">
                      <div class="input-wrapper">
                          <i :class="loginType === 'userid' ? 'fa fa-lock' : 'fa fa-key'"></i>
                          <input 
                              :type="loginType === 'userid' && passwordVisible ? 'text' : 'password'" 
                              v-model="form.credential" 
                              :placeholder="loginType === 'userid' ? '请输入密码' : '请输入验证码'"
                              required
                          >
                          
                          <!-- 验证码获取按钮 -->
                          <button 
                              v-if="loginType === 'email'"
                              type="button" 
                              class="get-code-btn"
                              :disabled="isSendingCode || countdown > 0"
                              @click="getVerificationCode"
                          >
                              {{ countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码' }}
                          </button>
                          
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
                      <p class="error-message" v-if="errors.credential">{{ errors.credential }}</p>
                  </div>
                  
                  <!-- 忘记密码 -->
                  <div class="form-options">
                      <div class="placeholder" v-show="loginType !== 'userid'"></div>
                      <a href="#" class="forgot-password" v-show="loginType === 'userid'">忘记密码?</a>
                  </div>
                  
                  <!-- 登录按钮 -->
                  <button 
                      type="submit" 
                      class="login-button"
                      :disabled="isLoading"
                  >
                      <span v-if="isLoading" class="loading-spinner">
                          <i class="fa fa-circle-o-notch fa-spin"></i>
                      </span>
                      {{ loginType === 'userid' ? '密码登录' : '验证码登录' }}
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

// 引入路由
const router = useRouter();

// 登录类型：'userid' 或 'email'
const loginType = ref('userid');

// 表单数据
const form = reactive({
  identifier: '',  // 可以是工号或邮箱
  credential: ''   // 可以是密码或验证码
});

// 表单验证错误
const errors = reactive({
  identifier: '',
  credential: ''
});

// 状态管理
const isLoading = ref(false);
const loginError = ref('');
const passwordVisible = ref(false);
const rememberMe = ref(false);
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
  errors.identifier = '';
  errors.credential = '';
  
  // 验证用户名/邮箱
  if (!form.identifier.trim()) {
      errors.identifier = loginType.value === 'userid' 
          ? '请输入工号' 
          : '请输入邮箱';
      isValid = false;
  } else if (loginType.value === 'email' && !isValidEmail(form.identifier)) {
      errors.identifier = '请输入有效的邮箱地址';
      isValid = false;
  }
  
  // 验证密码/验证码
  if (!form.credential) {
      errors.credential = loginType.value === 'userid' 
          ? '请输入密码' 
          : '请输入验证码';
      isValid = false;
  } else if (loginType.value === 'userid' && form.credential.length < 6) {
      errors.credential = '密码长度至少为6个字符';
      isValid = false;
  } else if (loginType.value === 'email' && !/^\d{6}$/.test(form.credential)) {
      errors.credential = '验证码格式不正确';
      isValid = false;
  }
  
  return isValid;
};

// 邮箱格式验证
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 获取验证码
const getVerificationCode = async () => {
  // 验证邮箱
  if (!form.identifier.trim()) {
      errors.identifier = '请输入邮箱';
      return;
  }
  
  if (!isValidEmail(form.identifier)) {
      errors.identifier = '请输入有效的邮箱地址';
      return;
  }
  
  isSendingCode.value = true;
  loginError.value = '';
  
  try {
      // 模拟发送验证码API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟发送成功
      console.log(`验证码已发送至邮箱: ${form.identifier}`);
      
      // 开始倒计时
      startCountdown();
  } catch (error: any) {
      loginError.value = error.message || '获取验证码失败，请重试';
  } finally {
      isSendingCode.value = false;
  }
};

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60;
  
  // 清除之前的计时器
  if (countdownTimer) {
      clearInterval(countdownTimer);
  }
  
  // 设置新的计时器
  countdownTimer = setInterval(() => {
      if (countdown.value > 0) {
          countdown.value--;
      } else {
          clearInterval(countdownTimer);
          countdownTimer = null;
      }
  }, 1000);
};

// 组件卸载时清除计时器
onUnmounted(() => {
  if (countdownTimer) {
      clearInterval(countdownTimer);
  }
});

// 登录处理
const handleLogin = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  loginError.value = '';
  
  try {
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟登录成功
      const mockResponse = {
          success: true,
          token: 'mock-token-1234567890',
          user: {
              id: 1,
              name: loginType.value === 'userid' ? '张教授' : '李老师',
              role: 'teacher'
          }
      };
      
      if (mockResponse.success) {
          // 存储认证信息
          localStorage.setItem('token', mockResponse.token);
          localStorage.setItem('user', JSON.stringify(mockResponse.user));
          
          // 如果勾选了记住我，则设置长期存储
          if (rememberMe.value && loginType.value === 'userid') {
              localStorage.setItem('rememberMe', 'true');
          }
          
          // 登录成功后跳转到主页
          router.push('/home');
      } else {
          throw new Error(loginType.value === 'userid' 
              ? '用户名或密码不正确' 
              : '邮箱或验证码不正确');
      }
  } catch (error: any) {
      // 处理登录错误
      loginError.value = error.message || '登录失败，请重试';
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
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #165DFF 0%, #0E42D2 100%);
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(80px);
}

.bg-top {
  top: -250px;
  right: -100px;
  background: linear-gradient(135deg, #FFFFFF 0%, #A6C8FF 100%);
}

.bg-bottom {
  bottom: -250px;
  left: -100px;
  background: linear-gradient(135deg, #409EFF 0%, #165DFF 100%);
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