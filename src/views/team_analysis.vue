<template>
<div id="team-analysis-page" class="page">
		    <div class="filter-bar">
		        <div class="filter-item">
		            <label>班子类型</label>
		            <select>
		                <option>校级领导班子</option>
		                <option>院级领导班子</option>
		                <option>系级领导班子</option>
		            </select>
		        </div>
		        <div class="filter-item">
		            <label>分析维度</label>
		            <select>
		                <option>结构分析</option>
		                <option>绩效评估</option>
		                <option>协同效果</option>
		            </select>
		        </div>
		        <button class="btn">分析</button>
		    </div>
		
		    <div class="card">
		        <div class="card-title">校级领导班子结构分析</div>
		        <div class="chart-container" style="height:400px;">
		            [班子结构雷达图]
		        </div>
		        <div class="card-title">分析结果</div>
		        <p>当前校级领导班子年龄结构合理，专业背景覆盖全面，但管理经验分布不均，部分成员学术成果较为薄弱。建议补充1-2名具有丰富管理经验和突出学术成果的成员。</p>
		    </div>
		
		    <div class="card">
		        <div class="card-title">绩效与协同评估</div>
		        <div class="chart-container" style="height:300px;">
		            [绩效协同热力图]
		        </div>
		        <table>
		            <thead>
		                <tr>
		                    <th>指标</th>
		                    <th>得分</th>
		                    <th>评价</th>
		                </tr>
		            </thead>
		            <tbody>
		                <tr>
		                    <td>决策效率</td>
		                    <td>85</td>
		                    <td>良好</td>
		                </tr>
		                <tr>
		                    <td>学科建设成果</td>
		                    <td>78</td>
		                    <td>中等</td>
		                </tr>
		                <tr>
		                    <td>团队凝聚力</td>
		                    <td>82</td>
		                    <td>良好</td>
		                </tr>
		            </tbody>
		        </table>
		    </div>
		
		    <div class="card">
		        <div class="card-title">优化建议与方案</div>
		        <h4>建议调整方案：</h4>
		        <ol>
		            <li>引进1名具有10年以上高校管理经验的副校长</li>
		            <li>调整2名班子成员的分工，加强学科建设职能</li>
		            <li>组织班子成员参加管理能力提升培训</li>
		        </ol>
		        <div class="form-actions">
		            <button class="btn">导出分析报告</button>
		            <button class="btn">生成调整方案</button>
		        </div>
		    </div>
</div>
</template>

<script lang="ts" setup name="team_analysis">

</script>

<style src="@/components/style.css">

</style>