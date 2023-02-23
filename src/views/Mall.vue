<template lang="en">
    <div class="container">
        <div class="categorize">商品列表</div>
        <div class="categorize">商品分类</div>
    </div>
</template>
<script>
export default {
    
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