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
		        <!-- 为班子结构雷达图准备 DOM -->
		        <div ref="structureChart" class="chart-container" style="height:400px;"></div>
		        <div class="card-title">分析结果</div>
		        <p>当前校级领导班子年龄结构合理，专业背景覆盖全面，但管理经验分布不均，部分成员学术成果较为薄弱。建议补充1-2名具有丰富管理经验和突出学术成果的成员。</p>
		    </div>
		
		    <div class="card">
		        <div class="card-title">绩效与协同评估</div>
		        <!-- 为绩效协同热力图准备 DOM -->
		        <div ref="performanceChart" class="chart-container" style="height:300px;"></div>
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
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

// 定义图表的 ref
const structureChart = ref(null);
const performanceChart = ref(null);

onMounted(() => {
    // 班子结构雷达图
    if (structureChart.value) {
        const chart = echarts.init(structureChart.value);
        const option = {
            radar: {
                indicator: [
                    { name: '年龄结构', max: 100 },
                    { name: '专业背景', max: 100 },
                    { name: '管理经验', max: 100 },
                    { name: '学术成果', max: 100 },
                    { name: '团队协作', max: 100 }
                ]
            },
            series: [{
                type: 'radar',
                data: [{
                    value: [80, 90, 60, 70, 85],
                    name: '校级领导班子'
                }]
            }]
        };
        chart.setOption(option);
    }

    // 绩效协同热力图
    if (performanceChart.value) {
        const chart = echarts.init(performanceChart.value);
        const data = [];
        const indicators = ['决策效率', '学科建设成果', '团队凝聚力', '资源分配', '对外合作'];
        const timePeriods = ['Q1', 'Q2', 'Q3', 'Q4'];

        for (let i = 0; i < indicators.length; i++) {
            for (let j = 0; j < timePeriods.length; j++) {
                data.push([j, i, Math.floor(Math.random() * 100)]);
            }
        }

        const option = {
            tooltip: {},
            visualMap: {
                min: 0,
                max: 100,
                calculable: true,
                orient: 'vertical',
                left: 'left',
                top: 'center'
            },
            xAxis: {
                type: 'category',
                data: timePeriods
            },
            yAxis: {
                type: 'category',
                data: indicators
            },
            series: [{
                name: '绩效协同',
                type: 'heatmap',
                data: data
            }]
        };
        chart.setOption(option);
    }
});
</script>

<style src="../components/style.css">
</style>