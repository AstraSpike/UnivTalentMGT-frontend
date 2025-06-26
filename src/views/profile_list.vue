<template>
	<div id="profile-list-page" class="page">
	  <div class="filter-bar">
		<div class="filter-item">
		  <label>姓名</label>
		  <input type="text" v-model="searchName" placeholder="输入姓名">
		</div>
		<div class="filter-item">
		  <label>院系</label>
		  <select v-model="selectedDepartment">
			<option value="">全部院系</option>
			<option value="文学院">文学院</option>
			<option value="理学院">理学院</option>
		  </select>
		</div>
		<div class="filter-item">
		  <label>职称</label>
		  <select v-model="selectedTitle">
			<option value="">全部职称</option>
			<option value="教授">教授</option>
			<option value="副教授">副教授</option>
		  </select>
		</div>
		<div class="filter-item">
		  <label>标签</label>
		  <select v-model="selectedTag">
			<option value="">全部标签</option>
			<option value="教学名师">教学名师</option>
			<option value="科研骨干">科研骨干</option>
		  </select>
		</div>
		<button class="btn" @click="fetchPersonnelList">查询</button>
		<button class="btn btn-secondary" @click="resetFilters">重置</button>
	  </div>
	  
	  <div class="card">
		<div class="card-title">
		  <span>干部教师列表</span>
		  <button class="btn">导出Excel</button>
		</div>
		<div class="table-container" v-loading="loading">
		  <table>
			<thead>
			  <tr>
				<th>姓名</th>
				<th>性别</th>
				<th>年龄</th>
				<th>院系</th>
				<th>职称</th>
				<th>教学评分</th>
				<th>科研评分</th>
				<th>标签</th>
				<th>操作</th>
			  </tr>
			</thead>
			<tbody>
			  <tr v-for="person in personnelList" :key="person.id">
				<td>{{ person.name }}</td>
				<td>{{ person.gender }}</td>
				<td>{{ person.age }}</td>
				<td>{{ person.department }}</td>
				<td>{{ person.title }}</td>
				<td>{{ person.teaching }}</td>
				<td>{{ person.research }}</td>
				<td>
				  <span 
					class="tag" 
					:class="'tag-' + tag.tagName.toLowerCase().replace(/\s+/g, '-')"
					v-for="tag in person.tags" 
					:key="tag.id"
				  >
					{{ tag.tagName }}
				  </span>
				</td>
				<td>
				  <button 
					class="detail-link" 
					@click="fetchAndShowScores(person)"
				  >
					查看评分
				  </button>
				</td>
			  </tr>
			</tbody>
		  </table>
		</div>
		<div class="pagination" v-if="total > 0">
		  <div class="page-item" @click="goToPage(1)">1</div>
		  <div class="page-item">2</div>
		  <div class="page-item">3</div>
		  <div class="page-item">...</div>
		  <div class="page-item" @click="goToPage(totalPages)">10</div>
		</div>
	  </div>
	</div>
  </template>
  
  <script lang="ts" setup name="profile-list">
  import { ref, onMounted,computed } from 'vue';
  import { RouterLink } from 'vue-router';
  import axios from 'axios';
  // 1. 定义人员数据接口
  interface Person {
    id: number;
    name: string;
    gender: 'male' | 'female';
    age: number;
    position: string;
    title: string;
    department: string;
    entryTime: string;
    education: string;
    degree: string;
    university: string;
    major: string;
    phone: string;
    email: string;
    politicalStatus: string;
    nativePlace: string;
    maritalStatus: string;
    ethnicity: string;
    tags: {
        id: number;
        tagName: string;
        tagType: string;
        createTime: string;
        updateTime: string;
    }[];
    prochance?: number;
    detailInfo?: any;
    // 添加以下两个属性
    research?: number;
    teaching?: number;
}
  
  // 2. 定义API响应接口
  interface PersonnelResponse {
	personnelList: Person[];
	total: number;
	pageSize: number;
	currentPage: number;
  }
  
  // 3. 定义API请求参数接口
  interface PersonnelParams {
	name?: string;
	department?: string;
	title?: string;
	tag?: string;
	page: number;
	pageSize: number;
  }
  
  // 4. 导入并声明人员服务模块
// 为了解决找不到模块声明文件的问题，显式指定导入模块的类型为 any
import personnelService from '../service/personnelService.js';
import { number } from 'echarts';
  // 确保TypeScript知道personnelService的结构
//   declare module '../service/personnelService.js' {
// 	export function getList(params: PersonnelParams): Promise<{ data: PersonnelResponse }>;
//   }
  
  // 5. 定义响应式数据
  const personnelList = ref<Person[]>([]);
  const loading = ref(false);
  const searchName = ref('');
  const selectedDepartment = ref('');
  const selectedTitle = ref('');
  const selectedTag = ref('');
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  interface personnelAnalysisData {
    stuffId: number;
    // 这里根据实际返回的数据结构添加字段
    overallScore: number;
	dimensionScores: Array<{
		innovation: number;
		management: number;
		research: number;
		teaching: number;
	}>;
}
  // 计算总页数
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));
  
  // 获取干部教师列表
  const fetchPersonnelList = async () => {
	loading.value = true;
	try {
	  const params: PersonnelParams = {
		name: searchName.value,
		department: selectedDepartment.value,
		title: selectedTitle.value,
		tag: selectedTag.value,
		page: currentPage.value,
		pageSize: pageSize.value
	  };
	  const response = await personnelService.getPersonnelList(params);
	  personnelList.value = response.data.personnelList;
	  total.value = response.data.total;
  
	  // 为每个人员获取分析数据并赋值
	  for (const person of personnelList.value) {
	      try {
	          const analyzeResponse = await axios.get(`/analyze/${person.id}`);
	          if (analyzeResponse.data.code === 200) {
	              const analysisData = analyzeResponse.data.data;
	              person.research = analysisData.dimensionScores.research;
	              person.teaching = analysisData.dimensionScores.teaching;
	          }
	      } catch (error) {
	          console.error(`获取人员 ${person.id} 分析数据失败`, error);
	      }
	  }
	} catch (error: any) {
	  console.error('获取干部教师列表失败', error.message);
	} finally {
	  loading.value = false;
	}
  };
// 获取人员数据
const fetchPersonnel = async () => {
    loading.value = true;
    // personnelService.getPersonnelList();
    try {
        const response = await axios.get('/basic');
        if (response.status === 200) {
            personnelList.value = response.data.map((person: Person) => ({
                ...person,
                // 确保prochance存在
                prochance: person.prochance || 0,
            }));
        } else {
        }
        personnelList.value = response.data,
        console.log('人员数据:', personnelList.value);
    } catch (error: any) {
        console.error('获取人员数据失败:', error);
    } finally {
        loading.value = false;
    }
};
 const fetchAndShowScores = async (person: Person) => {
      try {
        const analyzeResponse = await axios.get(`/analyze/${person.id}`);
        if (analyzeResponse.data.code === 200) {
          const analysisData = analyzeResponse.data.data;
          person.research = analysisData.dimensionScores.research;
          person.teaching = analysisData.dimensionScores.teaching;
        }
      } catch (error) {
        console.error(`获取人员 ${person.id} 分析数据失败`, error);
      }
    };
  // 重置筛选条件
  const resetFilters = () => {
	searchName.value = '';
	selectedDepartment.value = '';
	selectedTitle.value = '';
	selectedTag.value = '';
	currentPage.value = 1;
	fetchPersonnelList();
  };
  
  // 跳转到指定页面
  const goToPage = (page: number) => {
	if (page >= 1 && page <= totalPages.value) {
	  currentPage.value = page;
	  fetchPersonnelList();
	}
  };
  
  // 生命周期钩子
  onMounted(() => {
	fetchPersonnelList();
	fetchPersonnel();
  });
  console.log('人员列表:', personnelList.value);
  </script>

<style src="../components/style.css">
.detail-link {
    color: #1890ff;
    text-decoration: none;
}

.detail-link:hover {
    text-decoration: underline;
}
</style>