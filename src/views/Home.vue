<template lang="en">
    <div >
        <el-row>
            <el-col :span="8" style="padding-right:10px">
                <el-card class="box-card">
                    <div class="user">
                        <img src="../assets/images/user.jpg" alt="">
                        <div class="user-info">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <!-- <p>上次登录时间：<span>2023-2-18</span></p>
                        <p>上次登录地点：<span>广东</span></p> -->
                        <p>欢饮使用后台管理系统</p>
                    </div>
                  </el-card>
                  <!-- table -->
                  <el-card style="margin-top: 20px; height: 340px; overflow-y: scroll;">
                    
                        <el-table
                            :data="tableData"
                            style="width: 100%;">
                            <el-table-column
                                prop="dishName"
                                label="菜品"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="todaySales"
                                label="今日购买"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="monthSales"
                                label="本月购买"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="totalSales"
                                label="总购买"
                               >
                            </el-table-column>
                        </el-table>
                  </el-card>
            </el-col>
            <el-col :span="16" style="padding-left:10px"><OrderCount/></el-col>
        </el-row>
    </div>
</template>
<script>
    import OrderCount from '../components/OrderCount.vue';
    import { getSalesTable } from '../api';
    
export default {
    components:{
        OrderCount
    },
    data() {
        return {
            tableData: []
        }
    },
    mounted(){
        // getData().then(({data})=>{
        //     const {tableData} = data.data
        //     this.tableData = tableData
        // })
        getSalesTable({}).then(res=>{
            if(res.data.code===200){
                this.tableData = res.data.data
            }else{
                this.$message(res.data.message)
            }
        }).catch(err=>{
            console.log(err)
            this.$message("获取售卖数据表格汇总失败")
        })
        
        
        
    }
}
</script>
<style lang="less" scoped>
    .user{
        display: flex;
        align-items: center;
        margin-left: 20px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        img {
            margin-right: 40px;
            width : 150px;
            height : 150px;
            border-radius: 50%;
        }
        .user-info{
            .name{
                font-size: 32px;
                margin-bottom: 10px;
            }
            .access{
                color: #999999;
            }
        }
    }
    .login-info{
        p{
            line-height: 28px;
            font-size: 14px;
            color: #999999;
            text-align: left;
            margin-left: 20px;
            span {
                color: #666666;
                margin-left: 60px;
            }
        }
    }
</style>