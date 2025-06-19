<template>
    <div class="login-container">
      <!-- 背景图片 -->
      <div class="background-image"></div>
      
      <!-- 毛玻璃效果层 -->
      <div class="glass-effect"></div>
      
      <!-- 登录卡片 -->
      <div class="login-card">
        <!-- 卡片头部 -->
        <div class="card-header">
          <h2>干部教师管理系统</h2>
          <p>请登录您的账户</p>
        </div>
        
        <!-- 登录方式切换 -->
        <div class="login-type-toggle">
          <button 
            class="toggle-btn" 
            :class="{ 'active': loginType === 'username' }"
            @click="loginType = 'username'"
          >
            用户名/工号登录
          </button>
          <button 
            class="toggle-btn" 
            :class="{ 'active': loginType === 'email' }"
            @click="loginType = 'email'"
          >
            邮箱登录
          </button>
        </div>
        
        <!-- 卡片内容 -->
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <!-- 用户名/邮箱输入 -->
            <div class="form-group">
              <label for="identifier">{{ loginType === 'username' ? '用户名/工号' : '邮箱' }}</label>
              <div class="input-wrapper">
                <i :class="loginType === 'username' ? 'fa fa-user' : 'fa fa-envelope'"></i>
                <input 
                  type="text" 
                  id="identifier" 
                  v-model="form.identifier" 
                  :placeholder="loginType === 'username' ? '请输入用户名或工号' : '请输入邮箱'"
                  required
                >
              </div>
              <p class="error-message" v-if="errors.identifier">{{ errors.identifier }}</p>
            </div>
            
            <!-- 密码/验证码输入 -->
            <div class="form-group">
              <label for="credential">{{ loginType === 'username' ? '密码' : '验证码' }}</label>
              <div class="input-wrapper">
                <i :class="loginType === 'username' ? 'fa fa-lock' : 'fa fa-key'"></i>
                <input 
                  :type="loginType === 'username' && passwordVisible ? 'text' : 'password'" 
                  id="credential" 
                  v-model="form.credential" 
                  :placeholder="loginType === 'username' ? '请输入密码' : '请输入验证码'"
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
                  v-if="loginType === 'username'"
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
              
              <!-- 占位元素，保持布局一致 -->
              <div class="placeholder" v-show="loginType !== 'username'"></div>
              
              <!-- 忘记密码链接 -->
              <a href="#" class="forgot-password" v-show="loginType === 'username'">忘记密码?</a>
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
              {{ loginType === 'username' ? '密码登录' : '验证码登录' }}
            </button>
            
            <!-- 错误提示 -->
            <div v-if="loginError" class="error-alert">
              <i class="fa fa-exclamation-circle"></i>
              <p>{{ loginError }}</p>
            </div>
          </form>
        </div>
        
        <!-- 卡片底部 -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  // 引入路由
  const router = useRouter();
  
  // 登录类型：'username' 或 'email'
  const loginType = ref('username');
  
  // 表单数据
  const form = reactive({
    identifier: '',  // 可以是用户名/工号或邮箱
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
      errors.identifier = loginType.value === 'username' 
        ? '请输入用户名或工号' 
        : '请输入邮箱';
      isValid = false;
    } else if (loginType.value === 'email' && !isValidEmail(form.identifier)) {
      errors.identifier = '请输入有效的邮箱地址';
      isValid = false;
    }
    
    // 验证密码/验证码
    if (!form.credential) {
      errors.credential = loginType.value === 'username' 
        ? '请输入密码' 
        : '请输入验证码';
      isValid = false;
    } else if (loginType.value === 'username' && form.credential.length < 6) {
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
          name: loginType.value === 'username' ? '张教授' : '李老师',
          role: 'teacher'
        }
      };
      
      if (mockResponse.success) {
        // 存储认证信息
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        
        // 如果勾选了记住我，则设置长期存储
        if (rememberMe.value && loginType.value === 'username') {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // 登录成功后跳转到主页
        router.push('/home');
      } else {
        throw new Error(loginType.value === 'username' 
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
    font-family: 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
  }
  
  a {
    color: #165DFF;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
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
  }
  
  /* 背景图片 */
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://picsum.photos/id/1015/1920/1080'); /* 示例图片，替换为您的图片 */
    background-size: cover;
    background-position: center;
    z-index: -2;
  }
  
  /* 毛玻璃效果 */
  .glass-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.15); /* 半透明白色 */
    backdrop-filter: blur(10px); /* 模糊效果 */
    -webkit-backdrop-filter: blur(10px); /* Safari 支持 */
    z-index: -1;
  }
  
  /* 登录卡片 */
  .login-card {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.85); /* 半透明白色背景 */
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px); /* 毛玻璃效果 */
    -webkit-backdrop-filter: blur(10px);
  }
  
  .login-card:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  /* 卡片头部 */
  .card-header {
    background: rgba(22, 93, 255, 0.8); /* 半透明蓝色 */
    color: white;
    padding: 30px;
    text-align: center;
  }
  
  .card-header h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .card-header p {
    opacity: 0.9;
    font-size: 14px;
  }
  
  /* 登录方式切换 */
  .login-type-toggle {
    display: flex;
    border-bottom: 1px solid rgba(238, 238, 238, 0.7);
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
  }
  
  .toggle-btn.active {
    color: #165DFF;
    font-weight: 500;
    border-bottom: 2px solid #165DFF;
  }
  
  /* 卡片内容 */
  .card-body {
    padding: 30px;
  }
  
  /* 表单组 */
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
  }
  
  /* 输入框包装器 */
  .input-wrapper {
    position: relative;
  }
  
  .input-wrapper i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 16px;
  }
  
  .input-wrapper input {
    width: 100%;
    padding: 10px 10px 10px 40px;
    background: rgba(255, 255, 255, 0.7); /* 半透明白色输入框 */
    border: 1px solid rgba(221, 221, 221, 0.7); /* 半透明边框 */
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .input-wrapper input:focus {
    outline: none;
    border-color: #165DFF;
    box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
  }
  
  /* 切换密码可见性按钮 */
  .toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    outline: none;
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
    background: rgba(22, 93, 255, 0.9);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
  }
  
  .get-code-btn:hover:not(:disabled) {
    background: rgba(14, 66, 210, 0.9);
  }
  
  .get-code-btn:disabled {
    background: rgba(132, 169, 255, 0.9);
    cursor: not-allowed;
  }
  
  /* 错误消息 */
  .error-message {
    color: #f5222d;
    font-size: 12px;
    margin-top: 4px;
  }
  
  /* 表单选项 */
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    font-size: 14px;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
  }
  
  .remember-me input {
    margin-right: 6px;
  }
  
  .placeholder {
    width: 1px;
    visibility: hidden;
  }
  
  .forgot-password {
    color: #165DFF;
  }
  
  /* 登录按钮 */
  .login-button {
    width: 100%;
    padding: 12px;
    background-color: rgba(22, 93, 255, 0.9); /* 半透明蓝色按钮 */
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
    outline: none;
  }
  
  .login-button:hover {
    background-color: rgba(14, 66, 210, 0.9); /* 半透明深蓝色 */
  }
  
  .login-button:active {
    transform: scale(0.98);
  }
  
  .login-button:disabled {
    background-color: rgba(132, 169, 255, 0.9); /* 半透明浅蓝色 */
    cursor: not-allowed;
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
    padding: 10px;
    background-color: rgba(255, 242, 240, 0.8); /* 半透明红色背景 */
    border: 1px solid rgba(255, 204, 199, 0.8); /* 半透明红色边框 */
    border-radius: 6px;
    margin-top: 15px;
    color: #f5222d;
    font-size: 14px;
  }
  
  .error-alert i {
    margin-right: 8px;
  }
  
  /* 卡片底部 */
  .card-footer {
    padding: 15px 30px;
    background-color: rgba(249, 250, 251, 0.7); /* 半透明灰色背景 */
    border-top: 1px solid rgba(238, 238, 238, 0.7); /* 半透明边框 */
    text-align: center;
    font-size: 14px;
  }
  
  .card-footer p {
    color: #666;
  }
  
  .card-footer a {
    font-weight: 500;
  }
  </style>