<template>
  <div>
        <div id="main" />
        <div id="chart" />
  </div>
</template>
<script>
import rowApi from '@/api/rowcloud/row'

export default {
  data() {
    return {
      zhengchang: 0,
      loubo: 0,
      list: [],
      arr: [],
      //总记录数
      total: 0,
      position: "left",

      xData:[100,200], //后台传来的日期
      yData:["244","677"],

      weatherList: {},
    };
  },
  mounted() {
    this.getRow();
    this.setChart();
  },
  methods: {

    getRow() {
      rowApi.getAllRowlist().then(response => {
        this.list = response.data.list
        this.total = this.list.length
         this.list.forEach(element => {
        this.arr.push(element.ftag);
      });
      let result = this.arr.filter(el => el == 1).length;
      this.loubo = result;
      this.zhengchang = this.total - this.loubo;
         // 3.基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "播种率",
          subtext: "漏播-正常",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "播种率",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.loubo, name: "漏播" },
              { value: this.zhengchang, name: "正常" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 2,
                shadowColor: "rgba(0, 0, 0, 0.7)"
              }
            }
          }
        ]
      });
      })
    },

     setChart() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = this.$echarts.init(document.getElementById('chart'));
            var option = {
                title: {
                    text: '数据统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                dataZoom: [{
                    show: true,
                    height: 30,
                    xAxisIndex: [
                        0
                    ],
                    bottom: 30,
                    start: 10,
                    end: 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: '#d3dee5'

                    },
                    textStyle: {
                        color: '#fff'
                    },
                    borderColor: '#90979c'
                    },
                    {
                    type: 'inside',
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                 }],
                // x轴是类目轴（离散数据）,必须通过data设置类目数据
                xAxis: {
                    type: 'category',
                    data: [1,4,9,99]
                },
                // y轴是数据轴（连续数据）
                yAxis: {
                    type: 'value',
                    data: [2,88,99,990]
                },
                // 系列列表。每个系列通过 type 决定自己的图表类型
                series: [{
                    // 系列中的数据内容数组
                    data: this.yData,
                    // 折线图
                    type: 'line'
                }]
            }
            this.chart.setOption(option)
        },

  }
};
</script>

<style>
#main {
  width: 500px !important;
  height: 285px !important;
  top: 30px !important;
  float: left;
}
#chart {
  width: 500px !important;
  height: 300px !important;
  float: left;
}
#weather {
  width: 500px !important;
  height: 300px !important;
}
</style>
