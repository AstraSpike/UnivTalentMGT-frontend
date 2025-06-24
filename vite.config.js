import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 代理到端口 8084 的后端，对应 /users/login 等路径
      '/users/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // 假设还有一个后端在端口 5002，处理 /api/assessment/tags 开头的请求
      '/api/assessment/tags': {
        target: 'http://127.0.0.1:5002',
        changeOrigin: true,
        configure: (proxy, options) => {
        proxy.on('proxyReq', (proxyReq, req, res) => {
          console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
        });
        proxy.on('proxyRes', (proxyRes, req, res) => {
          console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
        });
      }
    }
  }
}
    }
  );