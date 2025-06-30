<script lang='ts' setup name="team_analysis">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';

// 添加路由实例
const router = useRouter();

// 定义接口类型
interface Person {
  id: number;
  name: string;
  // 可根据实际情况添加更多字段
}

interface Team {
  id: number;
  name: string;
  type: string;
  members: Person[];
  // 可根据实际情况添加更多字段
}

// 响应式数据
const teamList = ref<Team[]>([]);
const personList = ref<Person[]>([]);
const selectedPersons = ref<Person[]>([]);
const isCreateTeamDialogVisible = ref(false);
const isTeamDetailDialogVisible = ref(false);
const currentTeam = ref<Team | null>(null);

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

// 模拟获取团队列表数据
const fetchTeams = async () => {
  try {
    // 实际项目中替换为真实的 API 请求
    // const response = await fetch('/teams');
    // teamList.value = await response.json();
    teamList.value = [
      { id: 1, name: '开发团队', type: '技术', members: [{ id: 1, name: '张三' }] },
      { id: 2, name: '测试团队', type: '质量保障', members: [{ id: 2, name: '李四' }] },
    ];
  } catch (error) {
    ElMessage.error('获取团队列表失败');
  }
};

// 打开创建团队模态框
const openCreateTeamDialog = () => {
  selectedPersons.value = [];
  isCreateTeamDialogVisible.value = true;
};

// 创建团队
const createTeam = () => {
  if (selectedPersons.value.length === 0) {
    ElMessage.warning('请至少选择一名成员');
    return;
  }
  
  // 模拟创建团队逻辑
  const newTeam: Team = {
    id: teamList.value.length + 1,
    name: `新团队${teamList.value.length + 1}`,
    type: '新建类型',
    members: selectedPersons.value,
  };
  
  teamList.value.push(newTeam);
  isCreateTeamDialogVisible.value = false;
  ElMessage.success('团队创建成功');
};

// 查看团队详情
const viewTeamDetail = (team: Team) => {
  currentTeam.value = team;
  isTeamDetailDialogVisible.value = true;
};

// 智能分析
const smartAnalysis = () => {
  if (currentTeam.value) {
    ElMessageBox.alert('这里显示智能分析结果', '智能分析', {
      confirmButtonText: '确定',
    });
  }
};

// 跳转到团队建设页面
const navigateToTeamConstruction = () => {
  router.push({ name: 'team_construction' });
};

onMounted(() => {
  fetchPersons();
  fetchTeams();
});
</script>

<template>
  <div class="team-analysis">
    <h1>团队分析</h1>
    
    <!-- 修改团队建设按钮 -->
    <el-button type="primary" @click="navigateToTeamConstruction">团队建设</el-button>

    <!-- 团队分析卡片 -->
    <div class="team-cards">
      <el-card
        v-for="team in teamList"
        :key="team.id"
        class="team-card"
        shadow="hover"
        @click="viewTeamDetail(team)"
      >
        <template #header>
          <div class="card-header">
            <span>{{ team.name }}</span>
            <el-tag size="small">{{ team.type }}</el-tag>
          </div>
        </template>
        <div>
          <p><strong>团队ID:</strong> {{ team.id }}</p>
          <p><strong>团队成员:</strong> {{ team.members.map(member => member.name).join(', ') }}</p>
        </div>
      </el-card>
    </div>

    <!-- 创建团队模态框 -->
    <el-dialog v-model="isCreateTeamDialogVisible" title="团队建设">
      <el-checkbox-group v-model="selectedPersons">
        <el-checkbox
          v-for="person in personList"
          :key="person.id"
          :label="person"
        >
          {{ person.name }}
        </el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isCreateTeamDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="createTeam">创建团队</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 团队详情模态框 -->
    <el-dialog v-model="isTeamDetailDialogVisible" title="团队详情" v-if="currentTeam">
      <el-descriptions :column="1">
        <el-descriptions-item label="团队ID">{{ currentTeam.id }}</el-descriptions-item>
        <el-descriptions-item label="团队名称">{{ currentTeam.name }}</el-descriptions-item>
        <el-descriptions-item label="团队类型">{{ currentTeam.type }}</el-descriptions-item>
        <el-descriptions-item label="团队成员">
          {{ currentTeam.members.map(member => member.name).join(', ') }}
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isTeamDetailDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="smartAnalysis">智能分析</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.team-analysis {
  padding: 20px;
}

.team-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.team-card {
  width: 300px;
  cursor: pointer;
  transition: all 0.3s;
}

.team-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>