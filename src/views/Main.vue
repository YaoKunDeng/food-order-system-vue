<template lang="en">
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside/>
                
            </el-aside>
            <el-container>
              <el-header>
                <!-- 头部 -->
                <common-header/>
            </el-header>
              <el-main>
                
                <router-view></router-view>
              </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  name: "Main",
  data() {
    return {};
  },
  components: {
    CommonAside,
    CommonHeader,
  },
};
</script>
<style lang="less">
    .el-header{
        padding: 0;
    }

</style>
