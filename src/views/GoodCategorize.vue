<template lang="en">
    <div class="container">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%;">
            <el-table-column
            prop="storeName"
            label="店名"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="menuName"
            label="类别"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="description"
            label="描述"
            align="center"
            >
            </el-table-column>
            <el-table-column
            label="操作"
            align="center" >
            <template slot-scope="scope">
                <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                 <el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 40px;" @click="handleAdd()">添加</el-button>
        <el-dialog :title="dialogType===0?'添加分类':'编辑分类'" :visible.sync="dialogTableVisible" width="40%">
            <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="店名" prop="storeName" >
                    <el-input v-model="store.storeName" disabled></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="menuName">
                    <el-input v-model="formData.menuName" placeholder="请填写类别"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="formData.description" placeholder="请填写描述"></el-input>
                </el-form-item>
                <el-form-item>
                    
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="handleCommit">提交</el-button>
        </el-dialog>
    </div>
</template>
<script>
import {addMenu, delMenu, updateMenu, getMenus} from '../api';
export default {
  data() {
    return {
      dialogType: 0,  //0-添加列表   1-编辑列表   --弹窗类型，
      tableData: [
        // { 
        //   id: '1',
        //   storeName: '小香港店',
        //   menuName: "人气top",
        //   description: "瑞幸必喝款，无限回购",
        // },
      ],
      dialogTableVisible: false,
      formData: {
          id: '',
          storeId: '',
          menuName:'',
          description: ''
        },
        rules:{
            menuName: [
            { required: true, message: '请填写类别', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请填描述', trigger: 'blur' }
          ],
        }
    };
  },
 
  computed :{
    store(){
        return this.$store.state.userInfo.store
    }
  },

  mounted() {
   
    let data = {
            params :{
                storeId : localStorage.getItem("store").id
            }
        }
    getMenus(data).then(res=>{
        
        this.tableData = res.data.data
        this.$message({
                    message: res.data.message,
                    center: true
            });
    }).catch(err=>{
         this.$message({
                    message: "获取商品信息失败！",
                    center: true
            });
    })
  },

  methods: {
    handleEdit(index,row){
        this.formData.storeId = this.store.id
        this.dialogType = 1
        this.dialogTableVisible = true
        this.formData.id = row.id
        this.formData.menuName = row.menuName;
        this.formData.description = row.description 
    },
    handleDelete(index,row){
        let params = {
            params: {
                id : row.id
            }
        }
        delMenu(params).then(res=>{
            
            if(res.data.code===200){
                console.log(res)
                this.tableData = this.tableData.filter(item=>{
                    return item.id != row.id
                })
                
            }
            this.$message({
                    message: res.data.message,
                    center: true
                });
        }).catch(err=>{
            this.$message({
                    message: res.data.message,
                    center: true
                });
        })
        
    },
    handleAdd(){
        this.formData.storeId = this.store.id
        this.dialogType = 0
        this.dialogTableVisible = true
        this.formData.id = ''
        this.formData.menuName = ''
        this.formData.description=''
    },
    handleCommit(){
        // 如果是添加
        if(this.dialogType===0){
            addMenu(this.formData).then((res)=>{
                console.log("添加商品类成功！")
                if(res.data.code===200){
                    this.tableData.push(res.data.data)
                }
                this.$message({
                    message: res.data.message,
                    center: true
                });
                this.dialogTableVisible = false
                
        }).catch((err)=>{
             this.$message({
                message: '添加失败！',
                center: true
            });
             this.dialogTableVisible = false
        })
        }
        //如果是编辑
        if(this.dialogType===1){
            updateMenu(this.formData).then((res)=>{
                if(res.data.code===200){
                    this.tableData.map(item=>{
                        if(item.id===this.formData.id){
                            item.menuName = this.formData.menuName
                            item.description = this.formData.description
                        }
                    })
                }
                this.$message({
                message: res.data.message,
                center: true
                });
                 this.dialogTableVisible = false
            }).catch((err)=>{
                this.$message({
                message: '编辑失败',
                center: true
            });
             this.dialogTableVisible = false
            })
            
        }
    }
  },
};
</script>
<style lang="less" scoped>
    .container{
        text-align: center;
       .demo-ruleForm{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        justify-content: center;
        .el-form-item{
            width:40%;
        }
       }
       
    }
    

</style>
