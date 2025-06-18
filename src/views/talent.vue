<template>
<div id="talent-page" class="page">
				
				                <div class="filter-bar">
				                    <div class="filter-item">
				                        <label>梯队类型</label>
				                        <select>
				                            <option>学科带头人梯队</option>
				                            <option>教学名师梯队</option>
				                            <option>管理干部梯队</option>
				                        </select>
				                    </div>
				                    <div class="filter-item">
				                        <label>院系</label>
				                        <select>
				                            <option>全部院系</option>
				                            <option>文学院</option>
				                            <option>理学院</option>
				                        </select>
				                    </div>
				                    <button class="btn">查询</button>
				                </div>
				
				                <div class="card">
				                    <div class="card-title">队伍现状分析</div>
				                    <div class="chart-container" style="height:300px;">
				                        [梯队结构图]
				                    </div>
				                    <p>当前学科带头人梯队年龄结构呈现"两头小中间大"的特点，35-45岁中青年教师占比60%，但45岁以上资深专家和35岁以下青年骨干比例偏低，存在潜在断层风险。</p>
				                </div>
				
				                <div class="card">
				                    <div class="card-title">梯队规划</div>
				                    <table>
				                        <thead>
				                            <tr>
				                                <th>梯队层级</th>
				                                <th>目标人数</th>
				                                <th>现有人数</th>
				                                <th>缺口</th>
				                                <th>后备人选</th>
				                                <th>操作</th>
				                            </tr>
				                        </thead>
				                        <tbody>
				                            <tr>
				                                <td>第一梯队(领军人才)</td>
				                                <td>10</td>
				                                <td>6</td>
				                                <td>4</td>
				                                <td>8</td>
				                                <td><a href="#">查看</a></td>
				                            </tr>
				                            <tr>
				                                <td>第二梯队(骨干人才)</td>
				                                <td>30</td>
				                                <td>25</td>
				                                <td>5</td>
				                                <td>15</td>
				                                <td><a href="#">查看</a></td>
				                            </tr>
				                            <tr>
				                                <td>第三梯队(青年后备)</td>
				                                <td>50</td>
				                                <td>40</td>
				                                <td>10</td>
				                                <td>30</td>
				                                <td><a href="#">查看</a></td>
				                            </tr>
				                        </tbody>
				                    </table>
				                </div>
				
				                <div class="card">
				                    <div class="card-title">培养计划管理</div>
				                    <table>
				                        <thead>
				                            <tr>
				                                <th>姓名</th>
				                                <th>当前岗位</th>
				                                <th>培养方向</th>
				                                <th>培养措施</th>
				                                <th>开始时间</th>
				                                <th>预计完成</th>
				                                <th>状态</th>
				                                <th>操作</th>
				                            </tr>
				                        </thead>
				                        <tbody>
				                            <tr>
				                                <td>李副教授</td>
				                                <td>理学院副教授</td>
				                                <td>学科带头人</td>
				                                <td>国内外访学、重大课题参与</td>
				                                <td>2023-01-15</td>
				                                <td>2025-12-31</td>
				                                <td><span class="status-badge status-approved">进行中</span></td>
				                                <td><a href="#">调整</a></td>
				                            </tr>
				                            <tr>
				                                <td>王讲师</td>
				                                <td>工学院讲师</td>
				                                <td>骨干教师</td>
				                                <td>教学能力培训、科研项目主持</td>
				                                <td>2023-03-10</td>
				                                <td>2024-12-31</td>
				                                <td><span class="status-badge status-approved">进行中</span></td>
				                                <td><a href="#">调整</a></td>
				                            </tr>
				                        </tbody>
				                    </table>
				                    <div class="form-actions">
				                        <button class="btn">新增培养计划</button>
				                        <button class="btn">导出梯队报告</button>
				                    </div>
				                </div>
</div>
</template>

<script lang="ts" setup name="talent">

</script>

<style src="@/components/style.css">

</style>