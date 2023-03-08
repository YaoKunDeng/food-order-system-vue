<template lang="en">
    <el-form label-width="80px"  ref="form" class="login-container" :inline="true" :model="form" :rules="rules">
        <h3 class="login-title">注册</h3>
        <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>


        <!-- 注册成功弹窗 -->
    
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <span>{{message}}</span>
    
</el-dialog>

    </el-form>

    
</template>
<script>
import { addUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            message: '',
            form:{
                username: '',
                password: '',
                confirmPassword: '',
            },
            rules: {
                username: [
                    {required: true, trigger: 'blur', message: '请输入账号'}
                ],
                password: [
                    {required: true, trigger: 'blur', message: '请输入密码'}
                ],
                confirmPassword: [
                    {required: true, trigger: 'blur', message: '确认密码'}
                ]
            }
        }
    },
    methods: {
        register(){
            this.$refs.form.validate((valid,promise)=>{
                if(valid){
                    if(this.form.confirmPassword!==this.form.password)
                        this.$confirm("两次密码不一致！")
                    else{
                        // 发起后端请求，并提示登录成功
                        console.log("发出后端请求")
                        
                    }
                }
            })
            console.log(this.form)
            
            addUser(this.form).then((response)=>{
                
                if(response.data.code===200){
                    
                    var num = 5
                    this.message = '注册成功，5秒后将跳转登录页面....'
                    this.dialogVisible = true
                   let timer =  setInterval(()=>{
                        num = num -1;
                        this.message = '注册成功，'+num+'秒后将跳转登录页面....'
                        if(num==0){
                            clearInterval(timer)
                            this.$router.replace('/login')
                            this.dialogVisible = false  
                        }
                    },1000)
                }
                else{
                    this.message = response.data.message==='' ? '服务器出错，请联系管理员' :  response.data.message
                    this.dialogVisible = true
                }
            }).catch(err=>{
                this.message = '服务器出错，请联系管理员'
                this.dialogVisible = true
            })
        }
    },
}
</script>
<style lang="less">
    .login-container{
        width: 400px;
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
        .el-form-item {
            margin-bottom: 10x;
        }
        .el-dialog__headerbtn{
            display: none;
        }
    }
</style>