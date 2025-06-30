import axios from 'axios';

// Create a trainingService instance
const trainingService = axios.create();
/**
 * 根据干部能力评估和岗位胜任力模型生成培训推荐
 * @param {string} staffId - 干部ID
 * @param {Object} capabilities - 干部能力评估
 * @param {number} capabilities.teaching - 教学能力评分
 * @param {number} capabilities.research - 科研能力评分
 * @param {number} capabilities.management - 管理能力评分
 * @param {number} capabilities.innovation - 创新
 * @param {Object} positionRequirements - 岗位要求
 * @param {Array<string>} positionRequirements.requiredSkills - 岗位所需技能
 * @param {number} positionRequirements.minimumExperience - 最低工作经验
 * @returns {Promise<Object>} - 包含培训需求和计划的响应
 */
async function generateTrainingRecommendation({
  staffId,
  capabilities,
  positionRequirements
}) {
  try {
    const response = await axios.post('/api/training/records', {
      staffId,
      capabilities,
      positionRequirements
    });
    
    console.log('[API Response]', response.data); // 调试日志
    return response.data;
  } catch (error) {
    console.error('生成培训推荐失败:', error);
    throw new Error('获取培训推荐失败，请重试');
  }
}

/**
 * 处理培训需求数据，转换为前端可用格式
 * @param {Object} data - API返回的原始数据
 * @returns {Object} - 格式化后的培训需求数据
 */
function processTrainingData(response) {
  const data = response.data || response;
  
  console.log('[processTrainingData] 原始数据:', JSON.stringify(data, null, 2));
  
  // 基础数据验证
  if (!data || typeof data !== 'object') {
    console.error('[processTrainingData] 无效的API数据格式:', data);
    return {
      staffId: '',
      trainingNeeds: [],
      trainingCourses: []
    };
  }

  // 提取并验证trainingNeeds
  const trainingNeeds = Array.isArray(data.trainingNeeds) 
    ? data.trainingNeeds.map(need => ({
        skill: need.skill || '未知技能',
        priority: need.priority || '未知优先级'
      }))
    : [];

  // 提取并验证trainingPlan（关键修改：处理数组类型的trainingPlan）
  let trainingCourses = [];

  if (Array.isArray(data.trainingPlan)) {
    // 如果trainingPlan是数组，直接将其作为课程列表
    trainingCourses = data.trainingPlan.map(course => ({
      courseName: course.courseName || '未命名课程',
      courseId: course.courseId || '未知课程ID'
    }));
  } else {
    // 兼容原有的对象格式
    const trainingPlan = data.trainingPlan || {};
    trainingCourses = Array.isArray(trainingPlan.courses)
      ? trainingPlan.courses.map(course => ({
          courseName: course.courseName || '未命名课程',
          courseId: course.courseId || '未知课程ID'
        }))
      : [];
  }

  // 检查是否缺少关键数据
  if (trainingNeeds.length === 0) {
    console.warn('[processTrainingData] 培训需求列表为空');
  }
  if (trainingCourses.length === 0) {
    console.warn('[processTrainingData] 推荐课程列表为空');
  }

  return {
    staffId: data.staffId || '',
    trainingNeeds,
    trainingCourses
  };
}

export { generateTrainingRecommendation, processTrainingData, trainingService };