<template>
 <div id="department-communication-page" class="page">
                    <div class="tabs">
                        <div class="tab active" onclick="showCommunicationTab('create-demand')">发起需求</div>
                        <div class="tab" onclick="showCommunicationTab('my-demands')">我的需求</div>
                        <div class="tab" onclick="showCommunicationTab('todo-list')">待办任务</div>
                        <div class="tab" onclick="showCommunicationTab('completed-tasks')">已完成任务</div>
                    </div>

                    <!-- 领导发起需求 -->
                    <div id="create-demand" class="communication-tab">
                        <div class="card">
                            <div class="card-title">新建人才需求</div>
                            <form id="demand-form">
                                <div class="form-group">
                                    <label class="form-label">需求标题</label>
                                    <input type="text" class="form-control" placeholder="例如：大数据专业建设人才需求">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">需求类型</label>
                                    <select class="form-control">
                                        <option>新专业建设</option>
                                        <option>学科发展</option>
                                        <option>岗位补充</option>
                                        <option>人才梯队</option>
                                        <option>其他</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">需求部门</label>
                                    <input type="text" class="form-control" value="大数据学院" readonly>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">需求负责人</label>
                                    <input type="text" class="form-control" value="张院长" readonly>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">需求详情</label>
                                    <textarea class="form-control" rows="5" placeholder="请详细描述人才需求..."></textarea>
                                </div>

                                <div class="card">
                                    <div class="card-title">人才需求明细</div>
                                    <table id="position-table">
                                        <thead>
                                            <tr>
                                                <th>岗位类型</th>
                                                <th>岗位级别</th>
                                                <th>需求人数</th>
                                                <th>专业要求</th>
                                                <th>其他要求</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select class="form-control">
                                                        <option>专业负责人</option>
                                                        <option>骨干教师</option>
                                                        <option>普通教师</option>
                                                        <option>实验员</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select class="form-control">
                                                        <option>教授</option>
                                                        <option>副教授</option>
                                                        <option>讲师</option>
                                                    </select>
                                                </td>
                                                <td><input type="number" class="form-control" value="1"></td>
                                                <td><input type="text" class="form-control" placeholder="计算机、大数据相关"></td>
                                                <td><input type="text" class="form-control" placeholder="5年以上经验"></td>
                                                <td><button type="button" class="btn btn-secondary" onclick="removePosition(this)">删除</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type="button" class="btn" onclick="addPosition()">添加岗位</button>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">期望完成时间</label>
                                    <input type="date" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label class="form-label">附件</label>
                                    <input type="file" class="form-control">
                                    <small class="text-muted">可上传会议纪要、建设方案等相关文件</small>
                                </div>

                                <div class="form-actions">
                                    <button type="button" class="btn" onclick="submitDemand()">提交需求</button>
                                    <button type="button" class="btn btn-secondary">保存草稿</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- 我的需求 -->
                    <div id="my-demands" class="communication-tab" style="display:none;">
                        <div class="filter-bar">
                            <div class="filter-item">
                                <label>状态</label>
                                <select>
                                    <option>全部</option>
                                    <option>待处理</option>
                                    <option>处理中</option>
                                    <option>已完成</option>
                                    <option>已关闭</option>
                                </select>
                            </div>
                            <div class="filter-item">
                                <label>时间范围</label>
                                <input type="date"> 至 <input type="date">
                            </div>
                            <button class="btn">查询</button>
                        </div>

                        <div class="card">
                            <div class="card-title">我发起的需求</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>需求编号</th>
                                        <th>需求标题</th>
                                        <th>需求类型</th>
                                        <th>提交时间</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>XQ202306001</td>
                                        <td>大数据专业建设人才需求</td>
                                        <td>新专业建设</td>
                                        <td>2023-06-10</td>
                                        <td><span class="status-badge status-approved">处理中</span></td>
                                        <td><a href="#" onclick="showDemandDetail('XQ202306001')">查看</a></td>
                                    </tr>
                                    <tr>
                                        <td>XQ202305015</td>
                                        <td>人工智能实验室人才补充</td>
                                        <td>岗位补充</td>
                                        <td>2023-05-20</td>
                                        <td><span class="status-badge status-approved">已完成</span></td>
                                        <td><a href="#" onclick="showDemandDetail('XQ202305015')">查看</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="pagination">
                                <div class="page-item active">1</div>
                                <div class="page-item">2</div>
                                <div class="page-item">3</div>
                            </div>
                        </div>
                    </div>

                    <!-- 待办任务 -->
                    <div id="todo-list" class="communication-tab" style="display:none;">
                        <div class="filter-bar">
                            <div class="filter-item">
                                <label>优先级</label>
                                <select>
                                    <option>全部</option>
                                    <option>高</option>
                                    <option>中</option>
                                    <option>低</option>
                                </select>
                            </div>
                            <div class="filter-item">
                                <label>需求类型</label>
                                <select>
                                    <option>全部类型</option>
                                    <option>新专业建设</option>
                                    <option>学科发展</option>
                                    <option>岗位补充</option>
                                </select>
                            </div>
                            <button class="btn">查询</button>
                        </div>

                        <div class="card">
                            <div class="card-title">待办任务</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>需求编号</th>
                                        <th>需求标题</th>
                                        <th>需求部门</th>
                                        <th>提交时间</th>
                                        <th>期望完成</th>
                                        <th>优先级</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>XQ202306001</td>
                                        <td>大数据专业建设人才需求</td>
                                        <td>大数据学院</td>
                                        <td>2023-06-10</td>
                                        <td>2023-09-01</td>
                                        <td><span class="status-badge status-approved">高</span></td>
                                        <td><a href="#" onclick="processDemand('XQ202306001')">处理</a></td>
                                    </tr>
                                    <tr>
                                        <td>XQ202306005</td>
                                        <td>英语专业师资补充</td>
                                        <td>外国语学院</td>
                                        <td>2023-06-15</td>
                                        <td>2023-08-30</td>
                                        <td><span class="status-badge status-pending">中</span></td>
                                        <td><a href="#" onclick="processDemand('XQ202306005')">处理</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 已完成任务 -->
                    <div id="completed-tasks" class="communication-tab" style="display:none;">
                        <div class="filter-bar">
                            <div class="filter-item">
                                <label>完成时间</label>
                                <input type="date"> 至 <input type="date">
                            </div>
                            <div class="filter-item">
                                <label>需求部门</label>
                                <select>
                                    <option>全部部门</option>
                                    <option>大数据学院</option>
                                    <option>外国语学院</option>
                                    <option>文学院</option>
                                </select>
                            </div>
                            <button class="btn">查询</button>
                        </div>

                        <div class="card">
                            <div class="card-title">已完成任务</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>需求编号</th>
                                        <th>需求标题</th>
                                        <th>需求部门</th>
                                        <th>提交时间</th>
                                        <th>完成时间</th>
                                        <th>处理人</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>XQ202305015</td>
                                        <td>人工智能实验室人才补充</td>
                                        <td>计算机学院</td>
                                        <td>2023-05-20</td>
                                        <td>2023-06-05</td>
                                        <td>李人事</td>
                                        <td><a href="#" onclick="showCompletedDetail('XQ202305015')">查看</a></td>
                                    </tr>
                                    <tr>
                                        <td>XQ202304012</td>
                                        <td>管理学院领导班子调整</td>
                                        <td>管理学院</td>
                                        <td>2023-04-10</td>
                                        <td>2023-05-15</td>
                                        <td>王人事</td>
                                        <td><a href="#" onclick="showCompletedDetail('XQ202304012')">查看</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="pagination">
                                <div class="page-item active">1</div>
                                <div class="page-item">2</div>
                                <div class="page-item">3</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 页面10: 需求详情 - 领导查看 -->
                <div id="demand-detail-page" class="page" style="display:none;">
                    <div class="header">
                        <h2>需求详情</h2>
                        <div class="user-info">
                            <div class="user-avatar">管</div>
                            <span>管理员</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">
                            <span>大数据专业建设人才需求</span>
                            <span class="status-badge status-approved">处理中</span>
                        </div>
                    </div>
                </div>
</template>

<script lang="ts" setup name="department_communication">

</script>

<style src="@/components/style.css">

</style>