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
				                    <tr>
				                        <td>张教授</td>
				                        <td>男</td>
				                        <td>45</td>
				                        <td>文学院</td>
				                        <td>教授</td>
				                        <td>92</td>
				                        <td>88</td>
				                        <td>
				                            <span class="tag tag-teaching">教学名师</span>
				                            <span class="tag tag-research">科研骨干</span>
				                        </td>
				                        <td><a href="#" onclick="showPage('profile-detail-page')">查看详情</a></td>
				                    </tr>
				                    <tr>
				                        <td>李副教授</td>
				                        <td>女</td>
				                        <td>38</td>
				                        <td>理学院</td>
				                        <td>副教授</td>
				                        <td>85</td>
				                        <td>95</td>
				                        <td>
				                            <span class="tag tag-research">科研骨干</span>
				                        </td>
				                        <td><a href="#" onclick="showPage('profile-detail-page')">查看详情</a></td>
				                    </tr>
				                    <tr>
				                        <td>王主任</td>
				                        <td>男</td>
				                        <td>50</td>
				                        <td>工学院</td>
				                        <td>教授</td>
				                        <td>78</td>
				                        <td>82</td>
				                        <td>
				                            <span class="tag tag-management">管理能手</span>
				                        </td>
				                        <td><a href="#" onclick="showPage('profile-detail-page')">查看详情</a></td>
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
				
				<!-- 页面4: 干部教师画像详情 -->
				<div id="profile-detail-page" class="page" style="display:none;">
				    <div class="header">
				        <h2>干部教师画像详情</h2>
				        <div class="user-info">
				            <div class="user-avatar">管</div>
				            <span>管理员</span>
				        </div>
				    </div>
				
				    <div class="card">
				        <div class="profile-header">
				            <div class="profile-avatar">张</div>
				            <div class="profile-info">
				                <div class="profile-name">张教授</div>
				                <div class="profile-meta">
				                    <div class="meta-item">
				                        <div class="meta-label">性别</div>
				                        <div class="meta-value">男</div>
				                    </div>
				                    <div class="meta-item">
				                        <div class="meta-label">年龄</div>
				                        <div class="meta-value">45岁</div>
				                    </div>
				                    <div class="meta-item">
				                        <div class="meta-label">院系</div>
				                        <div class="meta-value">文学院</div>
				                    </div>
				                    <div class="meta-item">
				                        <div class="meta-label">职称</div>
				                        <div class="meta-value">教授</div>
				                    </div>
				                    <div class="meta-item">
				                        <div class="meta-label">入职时间</div>
				                        <div class="meta-value">2005-08-15</div>
				                    </div>
				                    <div class="meta-item">
				                        <div class="meta-label">学历</div>
				                        <div class="meta-value">博士</div>
				                    </div>
				                </div>
				                <div>
				                    <span class="tag tag-teaching">教学名师</span>
				                    <span class="tag tag-research">科研骨干</span>
				                    <span class="tag tag-management">学科带头人</span>
				                </div>
				            </div>
				        </div>
				
				        <div class="tabs">
				            <div class="tab active">综合能力</div>
				            <div class="tab">教学成果</div>
				            <div class="tab">科研业绩</div>
				            <div class="tab">培训记录</div>
				            <div class="tab">项目参与</div>
				        </div>
				
				        <div class="card">
				            <div class="card-title">能力评估报告</div>
				            <div class="chart-container" style="height:300px;">
				                [能力雷达图]
				            </div>
				            <table>
				                <thead>
				                    <tr>
				                        <th>能力维度</th>
				                        <th>评分</th>
				                        <th>评价</th>
				                    </tr>
				                </thead>
				                <tbody>
				                    <tr>
				                        <td>教学能力</td>
				                        <td>92</td>
				                        <td>优秀</td>
				                    </tr>
				                    <tr>
				                        <td>科研能力</td>
				                        <td>88</td>
				                        <td>良好</td>
				                    </tr>
				                    <tr>
				                        <td>管理能力</td>
				                        <td>85</td>
				                        <td>良好</td>
				                    </tr>
				                    <tr>
				                        <td>创新能力</td>
				                        <td>90</td>
				                        <td>优秀</td>
				                    </tr>
				                    <tr>
				                        <td>团队协作</td>
				                        <td>87</td>
				                        <td>良好</td>
				                    </tr>
				                </tbody>
				            </table>
				        </div>
				
				        <div class="card">
				            <div class="card-title">潜力分析报告</div>
				            <p>张教授在教学和科研方面表现突出，具有较高的学术影响力，适合作为学科带头人培养。未来3-5年内有潜力晋升为二级教授或担任院级领导职务。</p>
				            <div class="form-actions">
				                <button class="btn">生成培养计划</button>
				                <button class="btn btn-secondary" onclick="showPage('profile-list-page')">返回列表</button>
				            </div>
				        </div>
				    </div>
				</div>
</template>

<script lang="ts" setup name="profile_list">

</script>

<style src="@/components/style.css">

</style>