export default{
    state:{
        isCollapse : false  //控制菜单的展开还是收起
    },
    mutations:{
        // 修改菜单展开收起方法
        collaseMenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}