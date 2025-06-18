<template>
<div class="main-content">
						<div id="training-page" class="page">
						
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
            </div>>     
</template>

<script lang="ts" setup name="training">


</script>

<style src="@/components/style.css">

</style>