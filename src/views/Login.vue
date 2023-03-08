<template lang="en">
    <el-form label-width="70px" class="login-container" :inline="true" :model="form" :rules="rules">
        <h3 class="login-title">登录</h3>
        <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>{{message}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </el-form>
</template>
<script>
import { use } from 'echarts';
import { login } from '../api';
export default {
    data() {
        return {
            form:{
                username:'',
                password:'',
            },
            rules: {
                username: [
                    {required: true, trigger: 'blur', message: '请输入账号'}
                ],
                password: [
                    {required: true, trigger: 'blur', message: '请输入密码'}
                ]
            },
            centerDialogVisible: false,
            message: ''
        }
    },
    methods: {
        login(){
            let num = 5;
            let message = "登录成功，5秒后跳转登录页面......"
            
            login(this.form).then((response)=>{
                console.log("login:",response)
                this.message = message;
                if(response.data.code === 200){
                    this.centerDialogVisible = true
                    localStorage.setItem("token",response.data.data.token)
                    localStorage.setItem("userInfo",JSON.stringify(response.data.data.userInfo))
                    this.$store.commit("setUserInfo",JSON.stringify(response.data.data.userInfo))
                    this.$store.commit("setToken",response.data.data.token)
                    
                   let timer = setInterval(()=>{
                        num = num -1
                        this.message = '登录成功，'+num+'秒后跳转登录页面......'
                        if(num==0){
                            clearInterval(timer)
                            this.$router.replace('/home')
                            this.centerDialogVisible = false  
                        }
                    },1000)
                }else{
                    this.message = response.data.message
                    this.centerDialogVisible = true;
                }
                
            }).catch(err=>{
                console.log(err)
                this.message = '服务器出错，请联系管理员'
                this.centerDialogVisible = true
            })
        }
    }
}
</script>
<style lang="less">
    .login-container{
        width: 350px;
        margin: 180px auto;
        border: 1px solid #eaeaea;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        .login-title{
            text-align: center;
            margin-bottom: 40px;
            color: #505458;
        }
        .el-input{
            width: 198px;
        }
    }
</style>