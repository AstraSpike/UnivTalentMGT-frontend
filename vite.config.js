import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 代理到端口 8080 的网关，对应 /users/login 等路径
      '/users/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      //人员信息接口代理
      '/basic': {
        target: 'http://localhost:9086/personnel',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      '^/detail/\\d+': {
        target: 'http://localhost:9086/personnel',
        changeOrigin: true,
        rewrite: (path) => {
          const match = path.match(/^\/detail\/(\d+)/);
          if (match) {
            const id = match[1];
            // 正确转发到 /personnel/detail/{id}
            const newPath = `/detail/${id}`;
            console.log(`路径重写: ${path} → ${newPath}`);
            return newPath;
          }
          return path;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('/api', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
        '^/analyze/\\d+': {
        target: 'http://localhost:8086/portrait',
        changeOrigin: true,
        rewrite: (path) => {
          const match = path.match(/^\/analyze\/(\d+)/);
          if (match) {
            const id = match[1];
            // 正确转发到 /portrait/{id}
            const newPath = `/analyze/${id}`;
            console.log(`路径重写: ${path} → ${newPath}`);
            return newPath;
          }
          return path;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      //部门对接接口代理
       '/api/tasks': {
        target: 'http://localhost:9087',
        changeOrigin: true,
        secure: false,
        // 关键配置：保留请求头并添加日志
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('[Vite Proxy Log] 请求即将转发到: ', options.target);
            console.log('[Vite Proxy Log] 请求方法: ', req.method);
            console.log('[Vite Proxy Log] 请求路径: ', req.url);
            const authHeader = req.headers['authorization'];
            if (authHeader) {
              proxyReq.setHeader('Authorization', authHeader);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('[Vite Proxy Log] 收到来自目标服务器的响应状态码: ', proxyRes.statusCode);
          });
        },
        // 允许携带凭证
        credentials: 'include'
      },
      '/api/tasks/receiver/\\d+': {
        target: 'http://localhost:9087',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const match = path.match(/^\/api\/tasks\/receiver\/(\d+)/);
          if (match) {
            const id = match[1];
            const newPath = `/api/tasks/receiver/${id}`;
            console.log(`Path rewrite: ${path} → ${newPath}`);
            return newPath;
          }
          return path;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('[Vite Proxy Log] 请求即将转发到: ', options.target);
            console.log('[Vite Proxy Log] 请求方法: ', req.method);
            console.log('[Vite Proxy Log] 请求路径: ', req.url);
            const authHeader = req.headers['authorization'];
            if (authHeader) {
              proxyReq.setHeader('Authorization', authHeader);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('[Vite Proxy Log] 收到来自目标服务器的响应状态码: ', proxyRes.statusCode);
          });
        },
      },
      '/api/tasks/\\d+': {
        target: 'http://localhost:9087',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const match = path.match(/^\/api\/tasks\/(\d+)/); 
          if (match) {
            const id = match[1];
            const newPath = `/api/tasks/${id}`;
            console.log(`路径重写: ${path} → ${newPath}`);
            return newPath;
          }
          return path;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      //更新状态
      '/api/tasks/\\d+/status': {
        target: 'http://localhost:9087',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          const match = path.match(/^\/api\/tasks\/(\d+)\/status/);
          if (match) {
            const id = match[1];
            // 正确转发到 /tasks/{id}
            const newPath = `/api/tasks/${id}/status`;
            console.log(`路径重写: ${path} → ${newPath}`);
            return newPath;
          }
          return path;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      //echarts接口代理
        '/statistics/age': {
        target: 'http://localhost:9086',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
        '/statistics/title': {
        target: 'http://localhost:9086',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
        '/statistics/degree': {
        target: 'http://localhost:9086',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
        '/statistics/political-status': {
        target: 'http://localhost:9086',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      //培训接口代理
        '/api/training/analyses/\d+': {
        target: 'http://localhost:9088',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      '/api/training/analyses/batch':{  
        target: 'http://localhost:9088',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
        '/api/training/screened-personnel':{  
        target: 'http://localhost:9088',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
        '/api/training/training-list':{  
        target: 'http://localhost:9088',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
        '/api/training/records':{  
        target: 'http://localhost:9088',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
      
    }
  }
});