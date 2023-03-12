<template lang="en">
    <div class="container">
        <div class="menu-item">
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
           
        },
        goodsCategorize(){
            console.log(this.$router)
            this.$router.push("/mall/goodsCategorize")
        }
    },
}
</script>
<style lang="less" scoped>
    .el-main{
        padding: 0;
    }
    .container{
        text-align: left;
        .menu-item{
            margin-bottom: 20px;
        }
    }
</style>