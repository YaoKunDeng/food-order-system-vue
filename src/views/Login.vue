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
           <el-button type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
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
            }
        }
    },
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