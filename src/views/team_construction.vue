<script lang='ts' setup name="team_construction">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 定义接口类型
interface Person {
  id: number;
  name: string;
  // 可根据实际情况添加更多字段
}

// 响应式数据
const personList = ref<Person[]>([]);
const selectedPersons = ref<Person[]>([]);

// 模拟从 /basic 获取人员数据
const fetchPersons = async () => {
  try {
    // 实际项目中替换为真实的 API 请求
    // const response = await fetch('/basic');
    // personList.value = await response.json();
    personList.value = [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' },
    ];
  } catch (error) {
    ElMessage.error('获取人员数据失败');
  }
};

// 创建团队
const createTeam = () => {
  if (selectedPersons.value.length === 0) {
    ElMessage.warning('请至少选择一名成员');
    return;
  }
  // 这里添加实际创建团队的逻辑
  ElMessage.success('团队创建成功');
};

fetchPersons();
</script>

<template>
  <div class="team-construction">
    <h1>团队建设</h1>
    <el-checkbox-group v-model="selectedPersons">
      <el-checkbox
        v-for="person in personList"
        :key="person.id"
        :label="person"
      >
        {{ person.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-button type="primary" @click="createTeam">创建团队</el-button>
  </div>
</template>

<style scoped>
.team-construction {
  padding: 20px;
}
</style>