<template>
<div id="personnel-kanban-page" class="page">
			    <div class="filter-bar">
			        <div class="filter-item">
			            <label>院系</label>
			            <select>
			                <option>全部院系</option>
			                <option>文学院</option>
			                <option>理学院</option>
			                <option>工学院</option>
			            </select>
			        </div>
			        <div class="filter-item">
			            <label>职务</label>
			            <select>
			                <option>全部职务</option>
			                <option>教师</option>
			                <option>行政人员</option>
			                <option>管理人员</option>
			            </select>
			        </div>
			        <div class="filter-item">
			            <label>职称</label>
			            <select>
			                <option>全部职称</option>
			                <option>教授</option>
			                <option>副教授</option>
			                <option>讲师</option>
			            </select>
			        </div>
			        <button class="btn">查询</button>
			        <button class="btn btn-secondary">重置</button>
			    </div>
			
			    <div class="kanban-view-options">
			        <div class="view-option active" onclick="changeKanbanView('card')">卡片视图</div>
			        <div class="view-option" onclick="changeKanbanView('list')">列表视图</div>
			        <div class="view-option" onclick="changeKanbanView('table')">表格视图</div>
			    </div>
			
			    <!-- 卡片视图 -->
			    <div id="card-view" class="personnel-kanban">
			        <div class="personnel-card">
			            <div class="personnel-card-header">
			                <div class="personnel-avatar">张</div>
			                <div>
			                    <div class="personnel-name">张教授</div>
			                    <div class="personnel-position">文学院 · 教授</div>
			                </div>
			            </div>
			            <div class="personnel-details">
			                <div class="detail-row">
			                    <div class="detail-label">性别</div>
			                    <div>男</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">年龄</div>
			                    <div>45岁</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">入职时间</div>
			                    <div>2005-08-15</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">学历</div>
			                    <div>博士</div>
			                </div>
			            </div>
			            <div class="personnel-tags">
			                <span class="tag tag-teaching">教学名师</span>
			                <span class="tag tag-research">科研骨干</span>
			                <span class="tag tag-innovation">创新能手</span>
			            </div>
			            <div class="view-more">
			                <a href="#" onclick="showPage('profile-detail-page')">查看详情</a>
			            </div>
			        </div>
			
			        <div class="personnel-card">
			            <div class="personnel-card-header">
			                <div class="personnel-avatar">李</div>
			                <div>
			                    <div class="personnel-name">李副教授</div>
			                    <div class="personnel-position">理学院 · 副教授</div>
			                </div>
			            </div>
			            <div class="personnel-details">
			                <div class="detail-row">
			                    <div class="detail-label">性别</div>
			                    <div>女</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">年龄</div>
			                    <div>38岁</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">入职时间</div>
			                    <div>2010-03-20</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">学历</div>
			                    <div>博士</div>
			                </div>
			            </div>
			            <div class="personnel-tags">
			                <span class="tag tag-research">科研骨干</span>
			                <span class="tag tag-teaching">优秀课程负责人</span>
			            </div>
			            <div class="view-more">
			                <a href="#" onclick="showPage('profile-detail-page')">查看详情</a>
			            </div>
			        </div>
			
			        <div class="personnel-card">
			            <div class="personnel-card-header">
			                <div class="personnel-avatar">王</div>
			                <div>
			                    <div class="personnel-name">王主任</div>
			                    <div class="personnel-position">工学院 · 系主任</div>
			                </div>
			            </div>
			            <div class="personnel-details">
			                <div class="detail-row">
			                    <div class="detail-label">性别</div>
			                    <div>男</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">年龄</div>
			                    <div>50岁</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">入职时间</div>
			                    <div>2000-05-10</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">学历</div>
			                    <div>硕士</div>
			                </div>
			            </div>
			            <div class="personnel-tags">
			                <span class="tag tag-management">优秀管理者</span>
			                <span class="tag tag-teaching">教学能手</span>
			            </div>
			            <div class="view-more">
			                <a href="#" onclick="showPage('profile-detail-page')">查看详情</a>
			            </div>
			        </div>
			
			        <div class="personnel-card">
			            <div class="personnel-card-header">
			                <div class="personnel-avatar">赵</div>
			                <div>
			                    <div class="personnel-name">赵教授</div>
			                    <div class="personnel-position">医学院 · 教授</div>
			                </div>
			            </div>
			            <div class="personnel-details">
			                <div class="detail-row">
			                    <div class="detail-label">性别</div>
			                    <div>女</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">年龄</div>
			                    <div>42岁</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">入职时间</div>
			                    <div>2008-07-22</div>
			                </div>
			                <div class="detail-row">
			                    <div class="detail-label">学历</div>
			                    <div>博士</div>
			                </div>
			            </div>
			            <div class="personnel-tags">
			                <span class="tag tag-research">科研领军人才</span>
			                <span class="tag tag-innovation">技术创新先锋</span>
			                <span class="tag tag-teaching">教学创新能手</span>
			            </div>
			            <div class="view-more">
			                <a href="#" onclick="showPage('profile-detail-page')">查看详情</a>
			            </div>
			        </div>
			    </div>
			
			    <!-- 列表视图 (默认隐藏) -->
			    <div id="list-view" class="page" style="display:none;">
			        <div class="card">
			            <div class="card-title">
			                <span>人员列表</span>
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
			                            <th>职务</th>
			                            <th>职称</th>
			                            <th>学历</th>
			                            <th>标签</th>
			                            <th>操作</th>
			                        </tr>
			                    </thead>
			                    <tbody>
			                        <tr>
			                            <td>张教授</td>
			                            <td>男</td>
			                            <td>45</td>
			                            <td>文学院</td>
			                            <td>教师</td>
			                            <td>教授</td>
			                            <td>博士</td>
			                            <td>
			                                <span class="tag tag-teaching">教学名师</span>
			                                <span class="tag tag-research">科研骨干</span>
			                            </td>
			                            <td><a href="#" onclick="showPage('profile-detail-page')">查看</a></td>
			                        </tr>
			                        <tr>
			                            <td>李副教授</td>
			                            <td>女</td>
			                            <td>38</td>
			                            <td>理学院</td>
			                            <td>教师</td>
			                            <td>副教授</td>
			                            <td>博士</td>
			                            <td>
			                                <span class="tag tag-research">科研骨干</span>
			                            </td>
			                            <td><a href="#" onclick="showPage('profile-detail-page')">查看</a></td>
			                        </tr>
			                        <tr>
			                            <td>王主任</td>
			                            <td>男</td>
			                            <td>50</td>
			                            <td>工学院</td>
			                            <td>系主任</td>
			                            <td>教授</td>
			                            <td>硕士</td>
			                            <td>
			                                <span class="tag tag-management">优秀管理者</span>
			                            </td>
			                            <td><a href="#" onclick="showPage('profile-detail-page')">查看</a></td>
			                        </tr>
			                    </tbody>
			                </table>
			            </div>
			            <div class="pagination">
			                <div class="page-item active">1</div>
			                <div class="page-item">2</div>
			                <div class="page-item">3</div>
			                <div class="page-item">...</div>
			                <div class="page-item">10</div>
			            </div>
			        </div>
			    </div>
			
			    <!-- 筛查选项设置 -->
			    <div class="card">
			        <div class="card-title">筛查选项设置</div>
			        <div class="screening-options">
			            <div class="option-group">
			                <div class="option-group-title">教学能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox" checked> 教学名师</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox" checked> 优秀课程负责人</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 教学创新能手</label>
			                </div>
			            </div>
			            <div class="option-group">
			                <div class="option-group-title">科研能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox" checked> 科研领军人才</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 核心期刊高产作者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 专利达人</label>
			                </div>
			            </div>
			            <div class="option-group">
			                <div class="option-group-title">管理能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 优秀管理者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 高效协调者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 战略规划专家</label>
			                </div>
			            </div>
			            <div class="option-group">
			                <div class="option-group-title">创新能力标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 技术创新先锋</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 模式创新开拓者</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 教学方法革新者</label>
			                </div>
			            </div>
			            <div class="option-group">
			                <div class="option-group-title">自定义标签</div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 特定项目负责人</label>
			                </div>
			                <div class="option-item">
			                    <label><input type="checkbox"> 某领域专项人才</label>
			                </div>
			                <div class="option-item">
			                    <input type="text" class="form-control" placeholder="添加新标签" style="width:100%">
			                </div>
			            </div>
			        </div>
			        <div class="form-actions">
			            <button class="btn">应用筛选</button>
			            <button class="btn btn-secondary">保存筛选方案</button>
			        </div>
			    </div>
			
			    <!-- 会议场景适配 -->
			    <div class="card">
			        <div class="card-title">会议场景适配</div>
			        <button class="btn">进入全屏会议模式</button>
			        <div class="meeting-records">
			            <div class="card-title">会议操作记录</div>
			            <div class="record-item">
			                <div>2023-06-20 14:30 - 查看了张教授的详细资料</div>
			                <div class="record-time">2分钟前</div>
			            </div>
			            <div class="record-item">
			                <div>2023-06-20 14:28 - 筛选了"教学名师"标签</div>
			                <div class="record-time">4分钟前</div>
			            </div>
			            <div class="record-item">
			                <div>2023-06-20 14:25 - 进入全屏模式</div>
			                <div class="record-time">7分钟前</div>
			            </div>
			        </div>
			    </div>
			</div>
			
			<!-- 新增页面: 培训筛选 -->
			<div id="training-page" class="page" style="display:none;">
			    <div class="header">
			        <h2>人员培训筛选</h2>
			        <div class="user-info">
			            <div class="user-avatar">管</div>
			            <span>管理员</span>
			        </div>
			    </div>
			
			    <div class="filter-bar">
			        <div class="filter-item">
			            <label>培训类型</label>
			            <select>
			                <option>全部类型</option>
			                <option>教学能力</option>
			                <option>科研能力</option>
			                <option>管理能力</option>
			                <option>创新能力</option>
			            </select>
			        </div>
			        <div class="filter-item">
			            <label>院系</label>
			            <select>
			                <option>全部院系</option>
			                <option>文学院</option>
			                <option>理学院</option>
			                <option>工学院</option>
			            </select>
			        </div>
			        <div class="filter-item">
			            <label>职称</label>
			            <select>
			                <option>全部职称</option>
			                <option>教授</option>
			                <option>副教授</option>
			                <option>讲师</option>
			            </select>
			        </div>
			        <button class="btn">查询</button>
			    </div>
			
			    <div class="card">
			        <div class="card-title">培训需求分析</div>
			        <div class="chart-container" style="height:300px;">
			            [培训需求分析图表]
			        </div>
			        <table>
			            <thead>
			                <tr>
			                    <th>能力维度</th>
			                    <th>需培训人数</th>
			                    <th>推荐课程</th>
			                    <th>操作</th>
			                </tr>
			            </thead>
			            <tbody>
			                <tr>
			                    <td>教学能力</td>
			                    <td>15</td>
			                    <td>教学方法创新、课程设计优化</td>
			                    <td><a href="#">查看详情</a></td>
			                </tr>
			                <tr>
			                    <td>科研能力</td>
			                    <td>22</td>
			                    <td>科研项目申报、论文写作技巧</td>
			                    <td><a href="#">查看详情</a></td>
			                </tr>
			                <tr>
			                    <td>管理能力</td>
			                    <td>8</td>
			                    <td>团队管理、决策能力提升</td>
			                    <td><a href="#">查看详情</a></td>
			                </tr>
			            </tbody>
			        </table>
			    </div>
			
			    <div class="card">
			        <div class="card-title">培训计划</div>
			        <div class="training-list">
			            <div class="training-item">
			                <div class="training-name">教学方法创新培训</div>
			                <div class="training-meta">
			                    <div>时间: 2023-07-10 至 2023-07-12</div>
			                    <div>地点: 行政楼201会议室</div>
			                    <div>讲师: 李教授</div>
			                    <div>课时: 16学时</div>
			                </div>
			                <div class="training-participants">
			                    <div class="card-title">推荐参训人员 (8人)</div>
			                    <span class="participant-tag">张教授</span>
			                    <span class="participant-tag">李副教授</span>
			                    <span class="participant-tag">王讲师</span>
			                    <span class="participant-tag">赵副教授</span>
			                    <span class="participant-tag">钱讲师</span>
			                    <span class="participant-tag">孙教授</span>
			                    <span class="participant-tag">周讲师</span>
			                    <span class="participant-tag">吴副教授</span>
			                </div>
			                <div class="form-actions" style="margin-top:10px;">
			                    <button class="btn">生成培训名单</button>
			                    <button class="btn btn-secondary">调整人员</button>
			                </div>
			            </div>
			
			            <div class="training-item">
			                <div class="training-name">科研项目申报技巧培训</div>
			                <div class="training-meta">
			                    <div>时间: 2023-07-15 至 2023-07-16</div>
			                    <div>地点: 图书馆报告厅</div>
			                    <div>讲师: 王研究员</div>
			                    <div>课时: 12学时</div>
			                </div>
			                <div class="training-participants">
			                    <div class="card-title">推荐参训人员 (12人)</div>
			                    <span class="participant-tag">张教授</span>
			                    <span class="participant-tag">李副教授</span>
			                    <span class="participant-tag">王讲师</span>
			                    <span class="participant-tag">赵副教授</span>
			                    <span class="participant-tag">钱讲师</span>
			                    <span class="participant-tag">孙教授</span>
			                    <span class="participant-tag">周讲师</span>
			                    <span class="participant-tag">吴副教授</span>
			                    <span class="participant-tag">郑讲师</span>
			                    <span class="participant-tag">冯副教授</span>
			                    <span class="participant-tag">陈讲师</span>
			                    <span class="participant-tag">褚教授</span>
			                </div>
			                <div class="form-actions" style="margin-top:10px;">
			                    <button class="btn">生成培训名单</button>
			                    <button class="btn btn-secondary">调整人员</button>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
</template>

<script lang="ts" setup name="person_kb"> 
</script>

<style src="@/components/style.css">

</style>

