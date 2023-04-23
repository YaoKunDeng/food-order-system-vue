<template lang="en">
    <div class="manage">
        <div class="manage-header">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="nickname"
                    label="账号"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    prop="avatarUrl"
                    label="头像"
                    align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatarUrl" min-width="70" height="70"/>
                        
                    </template>
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别"
                    align="center"
                    >
                    <template slot-scope="scope">
                       <span>{{scope.row.gender===0?'男':'女'}}</span>
                        
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机"
                    align="center"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDel(scope.row)">删除</el-button>
                      </template>
                </el-table-column>
                
            </el-table>
            <!-- <el-button @click="dialogVisible = true" type="primary" style="margin-top: 60px;">
                新增
            </el-button> -->
        </div>
    </div>
</template>
<script>
import { getWxUser, delWxUser } from '../api';

    export default {
        data() {
            return {
                tableData: [
                
                ],
                
            };
        },
        methods:{
            
            handleDel(row){
                let data = {
                    params : {
                        openId : row.openId
                    }
                }
                delWxUser(data).then(res=>{
                    if(res.data.code==200){
                        this.tableData = this.tableData.filter(item=>{
                            return item.openId != row.openId
                        })
                    }
                    this.$message(res.data.message)
                }).catch(err=>{
                    console.log(err)
                    this.$message("删除用户信息失败！")
                })
            }
        },
        mounted(){
            
            getWxUser().then(res=>{
                console.log(res)
                if(res.data.code===200){
                    this.tableData = res.data.data
                }
                this.$message(res.data.message);
            }).catch(err=>{
                console.log(err)
                this.$message("获取用户信息失败！")
            })
            
        } 
    };
</script>
<style lang="css">
    .manage{
        text-align: center;
    }
</style>
