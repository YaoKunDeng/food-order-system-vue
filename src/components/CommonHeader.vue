<template lang="en">
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <span class="text">{{navigatorTitle}}</span>
            
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img v-if="JSON.stringify(userInfo)!=='{}'" class="user" src="../assets/images/user.jpg" alt="">
                    <el-button v-else type="info" @click="login">登录</el-button>
                </span>
                <el-dropdown-menu :slot="JSON.stringify(userInfo)=='{}'? '':dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        handleMenu(){
            this.$store.commit('collaseMenu')
            console.log(JSON.stringify(userInfo)=='{}')
        },
        login(){
            this.$router.replace("/login")
        }
    },
    
    computed: {
        navigatorTitle(){
           return this.$store.state.tab.navigatorTitle
        },
        userInfo(){
            return this.$store.state.userInfo.userInfo
        }
    }
}
</script>
<style lang="less" scoped>
    .header-container{
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        .text{
            color: #fff;
            font-size: 14px;
            margin-left: 10px;
        }
        .r-content{
            .user{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
</style>