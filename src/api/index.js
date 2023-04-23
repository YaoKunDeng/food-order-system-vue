import http from "../utils/request";

// // 请求首页数据
// export const getData = ()=>{
//     // 返回一个promise对象
//     return http.get('/home/getData')
// }

// export const getUser = (params)=>{
//     // 返回用户列表
//     return http.get('/user/getUser',params)
// }

// export const addUser = (data)=>{
//     return http.post('/user/add',data)
// }

// export const editUser = (data)=>{
//     return http.post('/user/edit',data)
// }

// export const delUser = (data)=>{
//     return http.post('/user/del',data)
// }

// 注册localhost:8081/register
export const addUser = (params)=>{
    return http.post('/register',params)
}
//更改店铺用户信息
export const updateUser =(params)=>{
    return http.post('/update/user',params)
}

// 注册
export const login =(params)=>{
    return http.post('/login',params)
}

// 验证session
export const validTicket = (params)=>{
    return http.get('/expired',params)
}

//获取店铺信息
export const getStore = (params)=>{
    return http.get('/store/get',params)
}

//更改店铺信息
export const updateStore = (params)=>{
    return http.post('/store/update',params)
}

//添加商品类别
export const addMenu = (params)=>{
    return http.post('/mall/add/menu',params)
}

//删除商品类别
export const delMenu = (params)=>{
    return http.get('/mall/delete/menu',params)
}
//更新商品类别
export const updateMenu = (params)=>{
    return http.post('/mall/update/menu',params)
}
//获取所有商品类别
export const getMenus = (params)=>{
    return http.get('/mall/get/menus',params)
}
//获取所有商品列别id和类别名字
export const getMenusIdAndName = (params)=>{
    return http.get('/mall/get/id/name',params)
}

//获取商品列表
export const getDishes = (params)=>{
    return http.get('/mall/get/dishes',params)
}
//添加商品
export const addDish = (params) =>{
    return http.post('/mall/add/dish',params)
}
//更新商品
export const updateDish = (params) => {
    return http.post("/mall/update/dish", params)
}

//删除商品
export const delDish = (params) => {
    return http.get("/mall/del/dish", params)
}

//获取所有微信用户
export const getWxUser = (params) => {
    return http.get("/wx/users")
}

//删除指定用户
export const delWxUser = (params) =>{
    return http.get('/wx/delUser',params)
}