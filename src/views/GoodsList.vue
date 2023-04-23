<template lang="en">
    <div class="container">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%;">
          
          <el-table-column
          prop="dishName"
          label="菜品"
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
          prop="image"
          label="图片"
          align="center"
          >
          <template slot-scope="scope">
               <!-- <img :src="scope.row.image" min-width="70" height="70"/> -->
               <img src="https://i.postimg.cc/V6KfmDRX/food.png" min-width="70" height="70"/>
       </template>
        </el-table-column>
          <el-table-column
          prop="oldPrice"
          label="原价"
          align="center"
          >
          </el-table-column>
          <el-table-column
          prop="newPrice"
          label="现价"
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
          label="操作"
          align="center" >
          <template slot-scope="scope">
              <div>
                <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </div>
          </template>
          </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top: 40px;" @click="handleAdd">添加</el-button>
      <el-dialog :title="dialogType===0?'添加商品':'编辑商品'" :visible.sync="dialogTableVisible" width="40%">
          <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
              <el-form-item label="菜品" prop="dishName" >
                  <el-input v-model="formData.dishName" placeholder="请填写菜品"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="description">
                  <el-input v-model="formData.description" placeholder="请填写描述"></el-input>
              </el-form-item>
              
              <el-form-item label="类别" prop="menuName">
                <el-select v-model="formData.menuName" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="现价" prop="newPrice">
                <el-input v-model="formData.newPrice" type="number" placeholder="请填写现价"></el-input>
                </el-form-item>
              <el-form-item label="原价" prop="oldPrice">
                <el-input v-model="formData.oldPrice" type="number" placeholder="请填写原价"></el-input>
              </el-form-item>
              <el-form-item label="图片" width="100%"  prop="image">
                <el-upload
                class="upload-demo"
                action="/api/mall/upload"
                :on-remove="handleRemove"
                :on-change="handleChange"
                :on-success= "handleSuccess"
                :on-error = "handleErr"
                :file-list="fileList"
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">点击上传</el-button>
               
              </el-upload>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="handleCommit">提交</el-button>
      </el-dialog>
  </div>
</template>
<script>
import { getMenusIdAndName, getDishes, addDish , updateDish, delDish} from "../api";
export default {
  data() {
    return {
      dialogType: 0,  //0-添加商品   1-编辑商品   --弹窗类型，
      tableData: [
        // {
        //   id: 'aaaaa',
        //   storeId: 'bbbb',
        //   dishName: '圣夜拿铁',
        //   description: '清香可口，入喉不腻',
        //   image: 'www.baidu.com.png',
        //   oldPrice: 26.8,
        //   newPrice: 18.8,
        //   menuName:'人气top'
        // }
      ],
      dialogTableVisible: false,
      formData: {
          id: '',
          storeId: '',
          dishName: '',
          description: '',
          image: '',
          // oldPrice: 0,
          // newPrice: 0,
          menuId:''
        },
      options: [
      //   {
      //   value: '选项1',
      //   label: '黄金糕'
      // }, {
      //   value: '选项2',
      //   label: '双皮奶'
      // }, {
      //   value: '选项3',
      //   label: '蚵仔煎'
      // }, {
      //   value: '选项4',
      //   label: '龙须面'
      // }, {
      //   value: '选项5',
      //   label: '北京烤鸭'
      // }
      ],
      fileList: [
        ],
      rules:{
        dishName: [
          { required: true, message: '请填写菜品', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        menuName: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ],
        newPrice: [
          { required: true, message: '请选择现价', trigger: 'blur' },
          // { type: 'number', message: '价格必须为数字值'}
        ]
        // oldPrice: [
        //   { type: 'number', message: '价格必须为数字值',trigger: 'blur'}
        // ],
      }
    }
  },
  computed :{
    store(){
        return this.$store.state.userInfo.store
    }
  },
  mounted() {
     
    let data = {
      params :{
        storeId: this.store.id
      }
    }
    console.log(data)
    getDishes(data).then((res)=>{
      console.log(res)
      this.tableData = res.data.data
      this.$message({
        message : res.data.message,
        center: true
      })
    }).catch((err)=>{
       this.$message({
        message : "获取商品列表失败！",
        center: true
      })
    })
  },
  methods: {
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
     handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
    // 文件上传成功钩子
    handleSuccess(response, file, fileList){
      if(response.code===200){
        this.formData.image = response.data
        this.rules.image = undefined
      }
      console.log(this.fileList)
      this.$message({
        message: response.message,
        center: true
      })
    },
    //文件上传错误钩子
    handleErr(err, file, fileList){
      this.$message({
        message: '上传文件失败！'
      })
    },
    handleRemove(){
      this.rules.image = [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ]
    },
    handleAdd(){
      this.dialogType = 0
      this.dialogTableVisible=true
      console.log(this.store.id)
      let data = {
        params:{
          storeId: this.store.id
        }
      }
      getMenusIdAndName(data).then((res)=>{
        if(res.data.code===200){
          this.options = res.data.data
        }
        this.$message({
          message: res.data.message,
          center: true
        })
      }).catch(err=>{
        this.$message({
          message: res.data.message,
          center: true
        })
      })
    },
   
    handleEdit(index, row){
      this.dialogTableVisible = true
      this.dialogType = 1
      console.log(row)
      this.formData = row
      this.fileList.push({
        name:row.image.substr(row.image.length-15,row.image.length),
        url:row.image
      })
      let data = {
        params:{
          storeId: this.store.id
        }
      }
      getMenusIdAndName(data).then((res)=>{
        if(res.data.code===200){
          this.options = res.data.data
        }
        this.$message({
          message: res.data.message,
          center: true
        })
      }).catch(err=>{
        this.$message({
          message: res.data.message,
          center: true
        })
      })
      
    },
     handleDelete(index, row){
      let data = {
        params:{
          id : row.id
        }
      }
      delDish(data).then(res=>{
        if(res.data.code===200){
          this.tableData = this.tableData.filter(item=>{
                  return item.id != row.id
              })
              console.log(this.tableData)
                
        }
        this.$message({
          message: res.data.message,
          center: true
        })
      }).catch(err=>{
        this.$message({
          message: '删除失败！',
          center: true
        })
      })
      
     },
    handleCommit(){
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          if(this.dialogType === 0){
            this.formData.storeId = this.store.id
            this.formData.menuId = this.formData.menuName
            let option = this.options.filter(item=>{
              return item.value===this.formData.menuId
            })
            console.log(option)
            this.formData.menuName = option[0].label
            
            addDish(this.formData).then(res=>{
              console.log(this.formData)
              if(res.data.code===200){
                this.tableData.push(this.formData)
              }
              this.$message({
                message: res.data.message,
                center: true
              })
              this.formData = {}
              this.fileList = []
              this.dialogTableVisible = false
              
            }).catch(err=>{
              console.log(err)
              this.$message({
                 message: "添加商品失败！",
                center: true
              })
              this.fileList = []
              this.dialogTableVisible = false
              this.formData = {}
            })
          }
          if(this.dialogType === 1){
            updateDish(this.formData).then(res=>{
              if(res.data.code===200){
                this.tableData.map(item=>{
                if(item.id===res.data.data.id){
                  item = res.data.data
                }
              })
              this.$message({
                message: res.data.message,
                center: true
              })
              }
            }).catch(err=>{
              console.log(err)
              this.$message({
                message: "更新失败！",
                center: true
              })
          })
            this.formData = {}
            this.fileList = []
            this.dialogTableVisible = false
          }
        }
      })
    }
  }
    
}
</script>
<style lang="less" scoped>
  .container{
        text-align: center;
       .demo-ruleForm{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        .el-form-item{
          width: 40%;
        }
       }
    }
</style>