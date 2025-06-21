<template>
  <div 
    class="drawing-overlay" 
    v-if="isDrawingEnabled"
    @mousedown.stop 
    @mousemove.stop 
    @mouseup.stop
    @touchstart.stop
    @touchmove.stop
    @touchend.stop
  >
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <div class="drawing-tools">
      <div class="tool-group">
        <label>颜色:</label>
        <input type="color" v-model="brushColor" @change="changeBrushColor">
      </div>
      <div class="tool-group">
        <label>粗细:</label>
        <input type="range" min="1" max="20" v-model="brushSize" @input="changeBrushSize">
        <span>{{ brushSize }}</span>
      </div>
      <div class="tool-group">
        <button @click="clearCanvas" class="tool-button">
          <i class="fa fa-eraser"></i> 清除
        </button>
      </div>
      <div class="tool-group">
        <button @click="toggleDrawing" class="tool-button close-button">
          <i class="fa fa-times"></i> 关闭
        </button>
      </div>
    </div>
    <div class="drawing-hint" v-show="showHint">
      <p>在画布上拖动鼠标进行涂画</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch} from 'vue';

const props = defineProps({
  isDrawingEnabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggleDrawing']);

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const isDrawing = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const brushColor = ref('#000000');
const brushSize = ref(5);
const canvasWidth = ref(window.innerWidth);
const canvasHeight = ref(window.innerHeight);
const showHint = ref(true);

const toggleDrawing = () => {
  emit('toggleDrawing');
};

const changeBrushColor = () => {
  if (ctx.value) {
    ctx.value.strokeStyle = brushColor.value;
  }
};

const changeBrushSize = () => {
  if (ctx.value) {
    ctx.value.lineWidth = brushSize.value;
  }
};

const clearCanvas = () => {
  if (ctx.value && canvas.value) {
    ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  }
};

// 计算鼠标在画布上的位置
const getCanvasPosition = (e: MouseEvent | TouchEvent) => {
  if (!canvas.value) return { x: 0, y: 0 };
  
  const rect = canvas.value.getBoundingClientRect();
  
  // 处理鼠标和触摸事件
  if ('clientX' in e) {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  } else {
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    return { x, y };
  }
};

// 初始化画布和事件监听
const initCanvas = () => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    if (ctx.value) {
      ctx.value.strokeStyle = brushColor.value;
      ctx.value.lineWidth = brushSize.value;
      ctx.value.lineCap = 'round';
    }

    // 设置画布尺寸为窗口大小
    canvas.value.width = canvasWidth.value;
    canvas.value.height = canvasHeight.value;

    // 绑定事件监听器
    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getCanvasPosition(e);
      isDrawing.value = true;
      [lastX.value, lastY.value] = [x, y];
      showHint.value = false; // 开始绘画时隐藏提示
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawing.value && ctx.value) {
        const { x, y } = getCanvasPosition(e);
        ctx.value.beginPath();
        ctx.value.moveTo(lastX.value, lastY.value);
        ctx.value.lineTo(x, y);
        ctx.value.stroke();
        [lastX.value, lastY.value] = [x, y];
      }
    };

    const handleMouseUp = () => {
      isDrawing.value = false;
    };

    const handleMouseOut = () => {
      isDrawing.value = false;
    };

    // 触摸事件支持
    const handleTouchStart = (e: TouchEvent) => {
      const { x, y } = getCanvasPosition(e);
      isDrawing.value = true;
      [lastX.value, lastY.value] = [x, y];
      showHint.value = false;
      e.preventDefault(); // 阻止默认触摸行为
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDrawing.value && ctx.value) {
        const { x, y } = getCanvasPosition(e);
        ctx.value.beginPath();
        ctx.value.moveTo(lastX.value, lastY.value);
        ctx.value.lineTo(x, y);
        ctx.value.stroke();
        [lastX.value, lastY.value] = [x, y];
      }
      e.preventDefault(); // 阻止默认触摸行为
    };

    const handleTouchEnd = () => {
      isDrawing.value = false;
    };

    // 添加事件监听器
    canvas.value.addEventListener('mousedown', handleMouseDown);
    canvas.value.addEventListener('mousemove', handleMouseMove);
    canvas.value.addEventListener('mouseup', handleMouseUp);
    canvas.value.addEventListener('mouseout', handleMouseOut);
    
    canvas.value.addEventListener('touchstart', handleTouchStart);
    canvas.value.addEventListener('touchmove', handleTouchMove);
    canvas.value.addEventListener('touchend', handleTouchEnd);

    // 移除事件监听器的函数
    return () => {
      canvas.value?.removeEventListener('mousedown', handleMouseDown);
      canvas.value?.removeEventListener('mousemove', handleMouseMove);
      canvas.value?.removeEventListener('mouseup', handleMouseUp);
      canvas.value?.removeEventListener('mouseout', handleMouseOut);
      
      canvas.value?.removeEventListener('touchstart', handleTouchStart);
      canvas.value?.removeEventListener('touchmove', handleTouchMove);
      canvas.value?.removeEventListener('touchend', handleTouchEnd);
    };
  }
  
  return () => {};
};

// 监听isDrawingEnabled变化，动态初始化和销毁画布
let removeEventListeners: () => void = () => {};

watch(() => props.isDrawingEnabled, (newVal) => {
  if (newVal) {
    // 当启用涂画时，初始化画布并显示提示
    nextTick(() => {
      removeEventListeners = initCanvas();
      showHint.value = true;
      
      // 3秒后自动隐藏提示
      setTimeout(() => {
        showHint.value = false;
      }, 3000);
    });
  } else {
    // 当禁用涂画时，移除事件监听器
    removeEventListeners();
  }
});

onMounted(() => {
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
  
  // 如果初始状态就是启用涂画，则初始化画布
  if (props.isDrawingEnabled) {
    nextTick(() => {
      removeEventListeners = initCanvas();
    });
  }
});

onBeforeUnmount(() => {
  // 移除所有事件监听器
  removeEventListeners();
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  if (canvas.value) {
    canvasWidth.value = window.innerWidth;
    canvasHeight.value = window.innerHeight;
    canvas.value.width = canvasWidth.value;
    canvas.value.height = canvasHeight.value;
    if (ctx.value) {
      ctx.value.strokeStyle = brushColor.value;
      ctx.value.lineWidth = brushSize.value;
      ctx.value.lineCap = 'round';
    }
  }
};
</script>

<style scoped>
.drawing-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: auto;
  touch-action: none;
  transition: opacity 0.3s ease;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  cursor: crosshair;
}

.drawing-tools {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  animation: fadeIn 0.3s ease;
}

.tool-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

input[type="color"] {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
}

input[type="range"] {
  width: 100px;
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1890ff;
  cursor: pointer;
}

.tool-button {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;
}

.tool-button:hover {
  background-color: #e0e0e0;
}

.close-button {
  background-color: #ff4d4f;
  color: white;
}

.close-button:hover {
  background-color: #f5222d;
}

.drawing-hint {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 10000;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards, fadeOut 0.5s ease 3s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translate(-50%, 0); }
  to { opacity: 0; transform: translate(-50%, -20px); }
}
</style>