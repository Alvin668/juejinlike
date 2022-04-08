import axios from 'axios'
//创建新的axios实例
let http = axios.create({
    baseURL: '/api', // 设置baseURL
    headers: { //设置头信息
        "Content-Type": 'application/json;charset=UTF-8'
    }
});

//设置响应拦截
http.interceptors.response.use(response => {
    return response.data;
})


//设置请求拦截(暂时用不到，可以不用设置)
http.interceptors.request.use(config => {
    return config;
})

export default http;