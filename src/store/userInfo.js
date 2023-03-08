import { getToken, getUserInfo } from "@/utils/auth"


export default{
    state:{
        token: ''|| getToken(),
        userInfo: getUserInfo() || {}
    },
    mutations:{
        setUserInfo(state,value){
            state.userInfo = JSON.parse(value)
        },
        setToken(state,value){
            state.session = value
        }
    },
    
}