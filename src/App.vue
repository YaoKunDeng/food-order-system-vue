<template>
  <div id="app">
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row> -->

    <router-view></router-view>
    
  </div>
</template>

<script>

import { validTicket } from './api'
export default {
  name: 'App',
  
  mounted() {
    let token = this.$store.state.userInfo.token
    
    if(token===null||token===''){
      this.$router.replace("/login")
    }
    
    if(token!=null || token !=''){
      validTicket({}).then((response)=>{
        console.log("APP",response)
        //如果session过期，就跳转登录页面
        if(response.data.code!=200)
          this.$router.replace("/login")
      })
    }
  },
}
</script>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  html,body,h3,p{
    margin: 0;
    padding: 0;
  }

</style>
