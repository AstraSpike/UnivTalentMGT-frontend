<template>
        <div id="dashboard-page" class="page">
            <div class="filter-bar">
                <div class="filter-item">
                    <label>院系</label>
                    <select>
                        <option>全部院系</option>
                        <option>文学院</option>
                        <option>理学院</option>
                        <option>工学院</option>
                        <option>医学院</option>
                    </select>
                </div>
                <div class="filter-item">
                    <label>岗位类别</label>
                    <select>
                        <option>全部类别</option>
                        <option>教学岗</option>
                        <option>科研岗</option>
                        <option>管理岗</option>
                    </select>
                </div>
                <div class="filter-item">
                    <label>时间范围</label>
                    <select>
                        <option>近一年</option>
                        <option>近三年</option>
                        <option>近五年</option>
                    </select>
                </div>
                <button class="btn">查询</button>
                <button class="btn btn-secondary">重置</button>
            </div>

            <div class="grid">
                <div class="card">
                    <div class="card-title">干部教师年龄分布</div>
                    <div ref="ageChart" class="chart-container"></div>
                </div>
                <div class="card">
                    <div class="card-title">职称分布</div>
                    <div ref="titleChart" class="chart-container"></div>
                </div>
                <div class="card">
                    <div class="card-title">教学成果分布</div>
                    <div ref="teachingChart" class="chart-container"></div>
                </div>
                <div class="card">
                    <div class="card-title">科研业绩分布</div>
                    <div ref="researchChart" class="chart-container"></div>
                </div>
                <div class="card">
                    <div class="card-title">晋升趋势</div>
                    <div ref="promotionChart" class="chart-container"></div>
                </div>
                <div class="card">
                    <div class="card-title">绩效等级对比</div>
                    <div ref="performanceChart" class="chart-container"></div>
                </div>
            </div>
        </div>
</template>

<script lang="ts" setup name="dashboard">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

// 定义图表的 ref
const ageChart = ref(null);
const titleChart = ref(null);
const teachingChart = ref(null);
const researchChart = ref(null);
const promotionChart = ref(null);
const performanceChart = ref(null);

onMounted(() => {
    // 干部教师年龄分布柱状图
    if (ageChart.value) {
        const chart = echarts.init(ageChart.value);
        const option = {
            xAxis: {
                type: 'category',
                data: ['20-30', '31-40', '41-50', '51-60']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80],
                type: 'bar'
            }]
        };
        chart.setOption(option);
    }

    // 职称分布饼图
    if (titleChart.value) {
        const chart = echarts.init(titleChart.value);
        const option = {
            series: [{
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: '教授' },
                    { value: 735, name: '副教授' },
                    { value: 580, name: '讲师' },
                    { value: 484, name: '助教' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        chart.setOption(option);
    }

    // 教学成果雷达图
    if (teachingChart.value) {
        const chart = echarts.init(teachingChart.value);
        const option = {
            radar: {
                indicator: [
                    { name: '论文', max: 100 },
                    { name: '著作', max: 100 },
                    { name: '奖项', max: 100 },
                    { name: '课程', max: 100 },
                    { name: '项目', max: 100 }
                ]
            },
            series: [{
                type: 'radar',
                data: [{
                    value: [80, 90, 70, 85, 95],
                    name: '教学成果'
                }]
            }]
        };
        chart.setOption(option);
    }

    // 科研业绩热力图
    if (researchChart.value) {
        const chart = echarts.init(researchChart.value);
        const data = [];
        const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a',
            '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'
        ];
        const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 7; j++) {
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
                data: days
            },
            yAxis: {
                type: 'category',
                data: hours
            },
            series: [{
                name: 'Punch Card',
                type: 'heatmap',
                data: data
            }]
        };
        chart.setOption(option);
    }

    // 晋升趋势折线图
    if (promotionChart.value) {
        const chart = echarts.init(promotionChart.value);
        const option = {
            xAxis: {
                type: 'category',
                data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 132, 101, 134, 90, 230, 210],
                type: 'line'
            }]
        };
        chart.setOption(option);
    }

    // 绩效等级对比条形图
    if (performanceChart.value) {
        const chart = echarts.init(performanceChart.value);
        const option = {
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['A', 'B', 'C', 'D', 'E']
            },
            series: [{
                type: 'bar',
                data: [120, 200, 150, 80, 70]
            }]
        };
        chart.setOption(option);
    }
});
</script>

<style src="@/components/style.css">
</style>