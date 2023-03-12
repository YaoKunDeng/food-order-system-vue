import { getToken, getUserInfo, getStore } from "@/utils/auth"


export default{
    state:{
        token: ''|| getToken(),
        userInfo: getUserInfo() || {},
        store: getStore() || {}
    },
    mutations:{
        setUserInfo(state,value){
            state.userInfo = JSON.parse(value)
        },
        setToken(state,value){
            state.session = value
        },
        setStore(state, value){
            state.store = JSON.parse(value)
        }
    },
    
}