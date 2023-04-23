<template lang="">
    <div>
        <el-descriptions title="用户信息" :column="2">
            <el-descriptions-item label="用户名">{{userInfo.userInfo.username}}</el-descriptions-item>
            <el-descriptions-item label="密码">xxxx</el-descriptions-item>
            <el-descriptions-item label="手机号">{{userInfo.userInfo.phone}}</el-descriptions-item>
            <el-descriptions-item label="联系地址">{{userInfo.userInfo.address}}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" style="margin-bottom: 40px; margin-top: 20px;" @click="infoDialogVisible = true">编辑</el-button>
        <el-dialog
            title="编辑个人信息"
            :visible.sync="infoDialogVisible"
            width="40%"
            >
            <el-form :inline="true" :rules="infoRules" :model="infoForm" label-width="60px">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="infoForm.username"  placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="infoForm.password" type="password" placeholder="密码"></el-input>
                  </el-form-item>
                  <el-form-item label="手机" prop="phone">
                    <el-input v-model="infoForm.phone" placeholder="手机号"></el-input>
                  </el-form-item>
                  <el-form-item label="地址" prop="address">
                    <el-input v-model="infoForm.address" placeholder="联系地址"></el-input>
                  </el-form-item>
              </el-form>
            <span slot="footer" class="dialog-footer">
                
                <el-button type="primary" @click="infoSubmit">提交</el-button>
            </span>
            </el-dialog>
        <el-descriptions title="店铺信息" :column="2">
            <el-descriptions-item label="店铺名称">{{userInfo.store.storeName}}</el-descriptions-item>
            <el-descriptions-item label="店铺地址">{{userInfo.store.address}}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" style="margin-top: 20px;" @click="storeDialogVisible = true">编辑</el-button>
        <el-dialog
        title="编辑个人信息"
        :visible.sync="storeDialogVisible"
        width="40%">
        <el-form :inline="true" :rules="storeRules" :model="storeForm" label-width="80px">
            <el-form-item label="店铺名" prop="storeName">
              <el-input v-model="storeForm.storeName" placeholder="店铺名"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="storeForm.address"  placeholder="店铺地址"></el-input>
              </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
            
            <el-button type="primary" @click="storeSubmit">提交</el-button>
        </span>
        </el-dialog>
        
    </div>
</template>
<script>
    import {updateUser, updateStore} from '../api';
 export default {
    data() {
      return {
        userInfo:{},
        infoDialogVisible: false,
        storeDialogVisible: false,
        infoForm: {
            username: '',
            password: '',
            phone: '',
            address: ''
        },
        storeForm:{
            storeName:'',
            address: ''
        },
        // infoRules: {
        //   username: [
        //     { required: true, message: '请输入用户名', trigger: 'blur' },
        //     { min: 6, message: '长度在6个字符字符以上', trigger: 'blur' }
        //   ],
        //   password: [
        //     { required: true, message: '请输入密码', trigger: 'blur' },
        //     { min: 6, message: '长度在6个字符字符以上', trigger: 'blur' }
        //   ],
        //   phone: [
        //     { required: true, message: '请输入手机号码', trigger: 'blur' },
        //     { min: 6, max: 11,message: '长度为11个字符', trigger: 'blur' }
        //   ],
          
        // },
        // storeRules:{
        //     storeName: [
        //     { required: true, message: '请输店铺名', trigger: 'blur' },
        //     { min: 2, message: '长度在2个字符字符以上', trigger: 'blur' }
        //   ],
        //     address: [
        //     { required: true, message: '请输入店铺地址', trigger: 'blur' },
        //     { min: 6,message: '长度在6个字符字符以上', trigger: 'blur' }
        //   ]
        // }
         }
    },
    methods: {
        infoSubmit(){
            
            updateUser(this.infoForm).then(res=>{
                console.log(res)
            })
            this.infoDialogVisible  =false
        },
        storeSubmit(){
            updateStore(this.storeForm).then(res=>{
                if(res.data.code ===200){
                    this.$store.commit('setStore',JSON.stringify(res.data.data))
                    this.storeDialogVisible = false
                }else{
                    this.$message.error(res.data.message);
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    beforeMount() {
        let userInfo = this.$store.state.userInfo   
        this.userInfo = userInfo
        this.infoForm = userInfo.userInfo
        this.infoForm.createTime = null
        this.infoForm.updateTime = null
        this.storeForm = userInfo.store
        this.storeForm.createTime = null
        this.storeForm.updateTime = null
        console.log(this.infoForm)
    },
  }
</script>
<style lang="less">
   .el-descriptions__header{
    display: block;
    margin-top: 20px;
   
   }
   .el-dialog__footer{
    text-align: center;
   }
</style>