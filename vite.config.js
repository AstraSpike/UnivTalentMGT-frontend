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
         configure: (proxy, options) => {
        proxy.on('proxyReq', (proxyReq, req, res) => {
          console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
        });
        proxy.on('proxyRes', (proxyRes, req, res) => {
          console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
        });
      }
      },
      '/api/assessment/capability': {
        target: 'http://127.0.0.1:5001',
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
    },
    '/api/team/recommend': {
      target: 'http://127.0.0.1:5003',
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
  '/api/training/recommend': {
    target: 'http://127.0.0.1:5004',
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
'/api/team/monitor': {
  target: 'http://127.0.0.1:5005',
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
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('/detail', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
  '/demand/submit': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    secure: false,
        // 关键配置：保留请求头
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            const authHeader = req.headers['authorization'];
            if (authHeader) {
              proxyReq.setHeader('Authorization', authHeader);
            }
          });
        },
        // 允许携带凭证
        credentials: 'include',
  //   configure: (proxy, options) => {
  //   proxy.on('proxyReq', (proxyReq, req, res) => {
  //     console.log(`[Proxy] 转发请求: ${req.method} ${req.url} -> ${options.target}${req.url.replace('/api', '')}`);
  //   });
  //   proxy.on('proxyRes', (proxyRes, req, res) => {
  //     console.log(`[Proxy] 收到响应: ${proxyRes.statusCode} ${req.url}`);
  //   });
  // }
},
  '/demand/myDemands': {
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
  '/demand/todoTasks': {
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
  '/demand/^/detail/\\d+': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => {
          const match = path.match(/^\/detail\/(\d+)/);
          if (match) {
            const id = match[1];
            // 正确转发到 /demand/detail/{id}
            const newPath = `/detail/${id}`;
            console.log(`路径重写: ${path} → ${newPath}`);
            return newPath;
          }
          return path;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('/detail', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
  '^/process/\\d+': {
        target: 'http://localhost:8080/process',
        changeOrigin: true,
        rewrite: (path) => {
          const match = path.match(/^\/process\/(\d+)/);
          if (match) {
            const id = match[1];
            // 正确转发到 /demand/process/{id}
            const newPath = `/process/${id}`;
            console.log(`路径重写: ${path} → ${newPath}`);
            return newPath;
          }
          return path;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('/detail', '')}`);
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
            console.log(`[代理请求] ${req.method} ${req.url} → ${options.target}${req.url.replace('/detail', '')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[代理响应] ${proxyRes.statusCode} ${req.url}`);
          });
        }
      },
}
    }
  })