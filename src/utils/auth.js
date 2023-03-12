export const getToken = function getToken(params) {
    return localStorage.getItem("token")
}

export const getUserInfo = function getUserInfo(){
    return JSON.parse(localStorage.getItem("userInfo"))
}

export const getStore = function getStore(){
    return JSON.parse(localStorage.getItem("store"))
}

export const isAuthentic = function isAuthentic(that){
     let userInfo = that.$store.state.userInfo.userInfo
     if(JSON.stringify(userInfo)=='{}')
        return false
    return true
}