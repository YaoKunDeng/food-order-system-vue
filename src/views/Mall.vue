<template lang="en">
    <div class="container">
        <div class="categorize">
            <el-button type="primary" @click="goodsList">商品列表</el-button>
            <el-button type="primary" @click="goodsCategorize">商品分类</el-button>
        </div>
        <router-view></router-view>
    </div>
    
</template>
<script>
export default {
    methods: {
        goodsList(){
            console.log(this.$router)
        }
    },
}
</script>
<style lang="less" scoped>
    .el-main{
        padding: 0;
    }
    .container{
        display: flex;
        .categorize{
            font-size: 16px;
            margin: 0 5px;
            font-weight: 500;
        }
        .categorize:hover{
            color: aqua;
            
        }
    }
</style>