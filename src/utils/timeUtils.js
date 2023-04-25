export const parseDate = function(params){
    const date = new Date(params)
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate().toString().padStart(2, "0"); // 获取日期，补零
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
}