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
import Register from '../views/Register.vue'
import GoodsList from '../views/GoodsList.vue'
import GoodCategorize from '../views/GoodCategorize.vue';

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
        {path: 'home', name: 'home', component: Home}, //首页
        {path: 'user', name: 'user', component: User}, //用户管理
        {
            path: 'mall', 
            name: 'mall', 
            component: Mall,
            redirect: '/mall/goodsList',
            children: [
                { path: 'goodsList', name: 'goodsList', component:  GoodsList},
                { path: 'goodsCategorize', name: 'goodsCategorize', component:  GoodCategorize}
            ]
        }, //商品管理
        {path: 'page1', name: 'page1', component: PageOne}, //页面1
        {path: 'page2', name: 'page2', component: PageTwo} //页面2
    ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
    
]



const router =  new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{
    console.log(to)
    console.log(from)
    next()
    
})


export default router