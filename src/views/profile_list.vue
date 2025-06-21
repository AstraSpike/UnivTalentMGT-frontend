<template>
<div id="profile-list-page" class="page">
				    <div class="filter-bar">
				        <div class="filter-item">
				            <label>姓名</label>
				            <input type="text" placeholder="输入姓名">
				        </div>
				        <div class="filter-item">
				            <label>院系</label>
				            <select>
				                <option>全部院系</option>
				                <option>文学院</option>
				                <option>理学院</option>
				            </select>
				        </div>
				        <div class="filter-item">
				            <label>职称</label>
				            <select>
				                <option>全部职称</option>
				                <option>教授</option>
				                <option>副教授</option>
				            </select>
				        </div>
				        <div class="filter-item">
				            <label>标签</label>
				            <select>
				                <option>全部标签</option>
				                <option>教学名师</option>
				                <option>科研骨干</option>
				            </select>
				        </div>
				        <button class="btn">查询</button>
				        <button class="btn btn-secondary">重置</button>
				    </div>
				
				    <div class="card">
				        <div class="card-title">
				            <span>干部教师列表</span>
				            <button class="btn">导出Excel</button>
				        </div>
				        <div class="table-container">
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
				                        <td>{{ person.teachingScore }}</td>
				                        <td>{{ person.researchScore }}</td>
				                        <td>
				                            <span 
				                                class="tag" 
				                                :class="'tag-' + tag.toLowerCase().replace(/\\s+/g, '-')"
				                                v-for="tag in person.tags" 
				                                :key="tag"
				                            >
				                                {{ tag }}
				                            </span>
				                        </td>
				                        <td>
				                            <RouterLink 
				                                :to="`/person/detail/${person.id}`"
				                                class="detail-link"
				                            >
				                                查看详情
				                            </RouterLink>
				                        </td>
				                    </tr>
				                </tbody>
				            </table>
				        </div>
				        <!-- <div class="pagination">
				            <div class="page-item active">1</div>
				            <div class="page-item">2</div>
				            <div class="page-item">3</div>
				            <div class="page-item">...</div>
				            <div class="page-item">10</div>
				        </div>-->
				    </div>
				</div>
</template>

<script lang="ts" setup name="profile-list">
import { ref,onMounted } from 'vue';
// 为了解决找不到模块声明文件的问题，显式指定类型为 any
import personnelService from '../service/personnelService';
const typedPersonnelService: any = personnelService;
// const personnelList = ref([
//     {
//         id: 1,
//         name: '张教授',
//         gender: '男',
//         age: 45,
//         department: '文学院',
//         title: '教授',
//         teachingScore: 92,
//         researchScore: 88,
//         tags: ['教学名师', '科研骨干']
//     },
//     // 其他人员数据...
// ]);

//定义响应式数据
const personnelList = ref([])
const loading = ref(false)
const searchName = ref('')
const selectedDepartment = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 获取干部教师列表
const fetchPersonnelList = async () => {
  loading.value = true
  try {
    const params = {
      name: searchName.value,
      department: selectedDepartment.value,
      page: currentPage.value,
      pageSize: pageSize.value
    }
    
    const { data } = await personnelService.getList(params)
    personnelList.value = data.personnelList
  } catch (error) {
    console.error('获取干部教师列表失败', error)
  } finally {
    loading.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  fetchPersonnelList()
})
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
