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
        <div ref="echarts1" style="height: 280px;"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <div ref="echarts2" style="height: 260px;"></div>
        </el-card>
        <el-card style="height: 260px;">
          <div ref="echarts3" style="height: 240px;"></div>
        </el-card>
      </div>
    </div>
</template>
<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      // 基于准备好的dom。 初始化echarts实例
      const echats1 = echarts.init(this.$refs.echarts1);
      // 指定图表的配置项和数据
      var echarts1Option = {};
      // 处理数据XAxis
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      echarts1Option.xAxis = {
        data: xAxis,
      };
      echarts1Option.yAxis = {};
      echarts1Option.legend = {
        data: xAxis,
      };
      echarts1Option.tooltip = {};
      echarts1Option.series = [];
      // 如果想返回一个对象，那么就直接用对象的方式去写
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });

      // 使用刚指定的配置和数据显示图标
      echats1.setOption(echarts1Option);

      // 柱状图
      // 基于准备好的dom。 初始化echarts实例
      const echats2 = echarts.init(this.$refs.echarts2);

      
      //数据处理
      const xAxis1 = userData.map((value) => {
        return value.date;
      });

      // 配置echat2Options
      var echats2Options = {
        tooltip: {},
        legend: {
          data: ['新增用户','活跃用户'],
        },
        xAxis: {
          type: 'category',
          data: xAxis1,
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLable: {
            interval: 0,
            color : '#333'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: '#17b3a3'
          }
        },
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: "新增用户",
            type: 'bar',
            data: userData.map((item) => item.new),
          },
          {
            name: "活跃用户",
            type: 'bar',
            data: userData.map((item) => item.active),
          },
        ],
      };

      echats2.setOption(echats2Options)

      // 扇形图
      // 初始化echats
      const echarts3 = echarts.init(this.$refs.echarts3)
      
      var echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: 'pie',
            data: videoData,
            
          }
        ]
      }
      echarts3.setOption(echarts3Option)
    });
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