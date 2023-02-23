<template lang="en">
    <div class="manage">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="45%"
            :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="dialogVisible = true" type="primary">
                +新增
            </el-button>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{scope.row.sex===0?'女':'男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    >
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期"
                    >
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址"
                    >
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="操作"
                    >
                    <template slot-scope="scope">
                        <div>
                            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getUser } from '../api';

    export default {
        data() {
            return {
                dialogVisible: false,
                form: {
                    name: '',
                    age: '',
                    sex: '',
                    birth: '',
                    addr: '',
                },
                rules:{
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    birth: [
                        { required: true, message: '请选择日期', trigger: 'blur' },
                    ],
                    addr: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                    ]
                },
                tableData: []
            };
        },
        methods:{
            // 弹窗关闭的时候触发
            handleClose(){
                this.$refs.form.resetFields()
                this.dialogVisible = false
            },
            submit(){
                // 重点理解
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        // 后续对表单数据的处理
                        console.log(this.form)
                        //关闭弹窗
                        this.handleClose()
                    }
                })
            },
            
            cancel(){
                this.handleClose()
            },
            handleEdit(){

            },
            handleDel(){

            }
        },
        mounted(){
            
            getUser().then(({data})=>{
                
                this.tableData = data.list
            })
            console.log(this.tableData)
           
        }
    };
</script>
<style lang="css">
    .manage{
        text-align: left;
    }
</style>
