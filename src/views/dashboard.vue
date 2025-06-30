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
                    <div class="card-title">政治面貌</div>
                    <div ref="politicalChart" class="chart-container"></div>
                </div>
                <div class="card">
                    <div class="card-title">学位</div>
                    <div ref="degreeChart" class="chart-container"></div>
                </div>
                <div class="card">
                    <div class="card-title">行政人员/科研人员</div>
                    <div ref="staffTypeChart" class="chart-container"></div>
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
const politicalChart = ref(null);
const degreeChart = ref(null);
const staffTypeChart = ref(null);

// 定义科研人员职称
const researchTitles = ['副教授', '教授', '助教', '科员'];
// 定义数据 ref
const ageData = ref({});
const titleData = ref({});
const politicalStatusData = ref({});
const degreeData = ref({});

// 获取统计数据
const fetchData = async () => {
    try {
        // 获取年龄分布统计
        const ageResponse = await fetch('/statistics/age');
        ageData.value = await ageResponse.json();

        // 获取职称统计
        const titleResponse = await fetch('/statistics/title');
        titleData.value = await titleResponse.json();

        // 获取政治面貌统计
        const politicalStatusResponse = await fetch('/statistics/political-status');
        politicalStatusData.value = await politicalStatusResponse.json();

        // 获取学历统计
        const degreeResponse = await fetch('/statistics/degree');
        degreeData.value = await degreeResponse.json();
        // 更新图表
        updateCharts();
    } catch (error) {
        console.error('获取统计数据失败:', error);
    }
};

// 更新图表
const updateCharts = () => {
    // 干部教师年龄分布柱状图
    if (ageChart.value) {
        const chart = echarts.init(ageChart.value);
        const data = Object.entries(ageData.value).map(([name, value]) => ({ name, value }));
        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: '{b} 岁区间: {c} 人'
            },
            xAxis: {
                type: 'category',
                data: Object.keys(ageData.value)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: Object.values(ageData.value),
                type: 'bar'
            }]
        };
        chart.setOption(option);
    }

    // 职称分布饼图
    if (titleChart.value) {
        const chart = echarts.init(titleChart.value);
        const data = Object.entries(titleData.value).map(([name, value]) => ({ name, value }));
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params: any) {
                    return params.name + ': ' + params.value + ' 人';
                }
            },
            series: [{
                type: 'pie',
                radius: '50%',
                data: data,
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

    // 政治面貌饼图
    if (politicalChart.value) {
        const chart = echarts.init(politicalChart.value);
        const data = Object.entries(politicalStatusData.value).map(([name, value]) => ({ name, value }));
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params: any) {
                    return params.name + ': ' + params.value + ' 人';
                }
            },
            series: [{
                type: 'pie',
                radius: '50%',
                data: data,
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

    // 学位柱状图
    if (degreeChart.value) {
        const chart = echarts.init(degreeChart.value);
        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c} 人'
            },
            xAxis: {
                type: 'category',
                data: Object.keys(degreeData.value)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: Object.values(degreeData.value),
                type: 'bar'
            }]
        };
        chart.setOption(option);
    }
        if (staffTypeChart.value) {
        const chart = echarts.init(staffTypeChart.value);
        let researchCount = 0;
        let adminCount = 0;

        // 遍历职称数据，按职称划分人员
        for (const [title, count] of Object.entries(titleData.value)) {
            if (researchTitles.includes(title)) {
                researchCount += Number(count);
            } else {
                adminCount += Number(count);
            }
        }

        const data = [
            { value: adminCount, name: '行政人员' },
            { value: researchCount, name: '科研人员' }
        ];
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params: any) {
                    return params.name + ': ' + params.value + ' 人';
                }
            },
            series: [{
                type: 'pie',
                radius: '50%',
                data: data,
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
};

onMounted(() => {
    fetchData();

    // 教学成果雷达图和行政人员/科研人员饼图因无对应 API，保持原有静态数据
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

    // if (staffTypeChart.value) {
    //     const chart = echarts.init(staffTypeChart.value);
    //     const data = [
    //         { value: 120, name: '行政人员' },
    //         { value: 200, name: '科研人员' }
    //     ];
    //     const option = {
    //         tooltip: {
    //             trigger: 'item',
    //             formatter: function(params) {
    //                 return params.name + ': ' + params.value + ' 人';
    //             }
    //         },
    //         series: [{
    //             type: 'pie',
    //             radius: '50%',
    //             data: data,
    //             emphasis: {
    //                 itemStyle: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                 }
    //             }
    //         }]
    //     };
    //     chart.setOption(option);
    // }
});

// 删除原有的图表初始化代码
// if (teachingChart.value) {
// ...
// }
// if (staffTypeChart.value) {
// ...
// }
</script>

<style src="../components/style.css">
</style>
