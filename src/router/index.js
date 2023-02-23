import Vue from 'vue'
import VueRouter from 'vue-router'

// 1、创建路由组件
// 2、引入组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'

// 3、将路由与组件进行映射
// 4、创建Router实例，将映射路径放进去
// 5、暴露router实例
// 6、将router挂载到根节点上
Vue.use(VueRouter)

const routes = [
    // 主路由
    {path: '/',
    component: Main,
    redirect: '/home',  //重定向到Home
    children :[
        // 子路由
        {path: 'home', component: Home}, //首页
        {path: 'user', component: User}, //用户管理
        {path: 'mall', component: Mall}, //商品管理
        {path: 'page1', component: PageOne}, //页面1
        {path: 'page2', component: PageTwo} //页面2
    ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
    
    
]

export default new VueRouter({
    routes
})