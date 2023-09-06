import axios from "axios"
const baseURL="https://shop-backend-8m1h.onrender.com"

function get(url){
    return axios.get(baseURL+url,{ validateStatus: false });
}
function post (url,obj){
    return axios.post(baseURL+url,obj);
}

function put(url,obj){
    return axios.put(baseURL+url,obj);  
}
function deleteApi(url){
   
    return axios.delete(baseURL+url,{ validateStatus: false })

}
export default{
    get,
    post,
    deleteApi,
    put,
};