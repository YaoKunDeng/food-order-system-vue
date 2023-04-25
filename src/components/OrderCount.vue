<template lang="en">
    <div>
      <div class="num">
        <el-card v-for="item in countData" :key=item.name :body-style="{display:'flex',padding:0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background : item.color}"></i>
            <div class="detail">
                <p class="price">￥{{item.value}}</p>
                <p class="desc">{{item.name}}</p>
            </div>
        </el-card>
      </div>
      <el-card style="height: 280px;">
        <!-- 折线图 -->
        <div ref="lineChart" style="height: 280px;"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <div ref="barGraph" style="height: 260px;"></div>
        </el-card>
        <el-card style="height: 260px;">
          <div ref="pieChart" style="height: 240px;"></div>
        </el-card>
      </div>
    </div>
</template>
<script>
import { getSalesTotal, getLineChartData, getBarGraphData } from "../api";
import * as echarts from "echarts";
import {parseDate} from '../utils/timeUtils.js';
export default {
  data() {
    return {
      countData: [
        {
          name: "今日营业额",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月营业额",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "总营业额",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        // {
        //   name: "本月支付订单",
        //   value: 1234,
        //   icon: "success",
        //   color: "#2ec7c9",
        // },
        // {
        //   name: "本月收藏订单",
        //   value: 210,
        //   icon: "star-on",
        //   color: "#ffb980",
        // },
        // {
        //   name: "本月未支付订单",
        //   value: 1234,
        //   icon: "s-goods",
        //   color: "#5ab1ef",
        // },
      ],
    };
  },
  mounted() {
    //获取顶部标签的数据
    getSalesTotal({}).then(res=>{
      console.log(res)
      this.countData[0].value = res.data.data.todaySales
      this.countData[1].value = res.data.data.monthSales
      this.countData[2].value = res.data.data.totalSales
    })

    //获取折线图数据
    getLineChartData({}).then(res=>{
      if(res.data.code===200){
        //基于准备好的dom，初始化echarts实例
        const lineChart = echarts.init(this.$refs.lineChart)
        //指定图标的配置项和数据
        var lineChartOption = {};
        //处理数据XAxis
        const xAxis = res.data.data.map(currentValue=>{
         return parseDate(currentValue.date)
        })
        lineChartOption.xAxis={
          data: xAxis,
          name: '日期'
          
        }
        lineChartOption.tooltip={
          trigger: 'axis',
          axisPointer: { type: 'cross' },
        }
        
        lineChartOption.yAxis={
          type: 'value',
          name: '销售额'
        }
        
        lineChartOption.series =[]
        lineChartOption.series.push({
            data: res.data.data.map(item=>{
              return item.turnover
            }),
            type: "line",
          })
        lineChart.setOption(lineChartOption)
      }else{
        this.$message(res.data.$message)
      }
    }).catch(err=>{
      console.log(err)
    })
    
    //获取折线柱状图信息
    //获取柱状图以及处理扇形图
    getBarGraphData({}).then(res=>{
      if(res.data.code===200){
        //处理柱状图
        const barGraph =echarts.init(this.$refs.barGraph);
        const barGraphOptions = {}
        //处理x轴
        const xAxis = res.data.data.map(currentValue=>{
            return currentValue.dishName
          })
          
        barGraphOptions.xAxis = {
          data : xAxis
        }
        barGraphOptions.tooltip={
            trigger: 'axis',
            axisPointer: { type: 'cross' },
          }
        //处理y轴
        barGraphOptions.yAxis = {}
        //处理y轴数据
        barGraphOptions.series = []
        barGraphOptions.series.push({
          type: 'bar',
          data: res.data.data.map(currentValue=>{
            return currentValue.number
          })
        })
        barGraph.setOption(barGraphOptions)

        //处理饼状图
        const pieChart = echarts.init(this.$refs.pieChart)
        const pieChartOption= {}
        pieChartOption.tooltip={
            trigger: 'item'
          }
        pieChartOption.series = []
        pieChartOption.series.push({
            type: 'pie',
            data: res.data.data.map(currentValue=>{
              return {
                value: currentValue.number,
                name: currentValue.dishName
              }
            })
          })
        
        pieChart.setOption(pieChartOption)
      }else{
        this.$message(res.data.message)
      }
    }).catch(err=>{
      console.log(err)
    })

  },
};
</script>
<style lang="less" scoped>
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    line-height: 80px;
    text-align: center;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
    width: 48%;
  }
}
</style>