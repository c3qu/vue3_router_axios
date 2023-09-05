import axios from "axios";
import {refreshToken} from "@/API/login";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
export const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://localhost:8000/',
    // 超时
    timeout: 10000
})

function getToken(key) {
    return localStorage.getItem(key)
}

service.interceptors.request.use(
    (config) => {
        const token = getToken("access")
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            if (err.response.status === 401 && originalConfig.url !== '/token/refresh/') {
                originalConfig._retry = true;
                try {
                    const rs = await refreshToken({
                        refresh: getToken("refresh"),
                    });
                    const accessToken = rs.data.access;
                    localStorage.setItem("access", accessToken)
                    originalConfig.headers.Authorization = 'Bearer ' + accessToken
                    return service(originalConfig);
                } catch (_error) {
                    localStorage.removeItem("access")
                    localStorage.removeItem("refresh")
                    // alert(`${err.response.status}: 作業逾時或無相關使用授權，請重新登入`)
                    window.location.href = '/login'
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
//
// service.interceptors.request.use(config => {
//     // 是否需要设置 token
//     // const isToken = (config.headers || {}).isToken === false
//     if (getToken("access")) {
//         config.headers.Authorization = 'Bearer ' + getToken("access")
//
//         // refreshToken({refresh: getToken("refresh")}).then(
//         //     res => {
//         //         localStorage.setItem("access", res.access)
//         //         config.headers['Authorization'] = 'Bearer ' + res.access
//         //     }
//         // )
//     }
//     // get请求映射params参数
//     if (config.method === 'get' && config.params) {
//         let url = config.url + '?';
//         for (const propName of Object.keys(config.params)) {
//             const value = config.params[propName];
//             var part = encodeURIComponent(propName) + "=";
//             if (value !== null && typeof (value) !== "undefined") {
//                 if (typeof value === 'object') {
//                     for (const key of Object.keys(value)) {
//                         let params = propName + '[' + key + ']';
//                         var subPart = encodeURIComponent(params) + "=";
//                         url += subPart + encodeURIComponent(value[key]) + "&";
//                     }
//                 } else {
//                     url += part + encodeURIComponent(value) + "&";
//                 }
//             }
//         }
//         url = url.slice(0, -1);
//         config.params = {};
//         config.url = url;
//     }
//     return config
// }, error => {
//     console.log(error)
//     Promise.reject(error)
// })
//
// // 响应拦截器
// service.interceptors.response.use(res => {
//         if (res.data.code === 0 && res.data.msg === 'NOTLOGIN') {// 返回登录页面
//             console.log('---/backend/page/login/login.html---')
//             localStorage.removeItem('userInfo')
//             window.top.location.href = '/backend/page/login/login.html'
//         } else {
//             return res.data
//         }
//     },
//     error => {
//         if (error.response) {
//             // server responded status code falls out of the range of 2xx
//             switch (error.response.status) {
//                 case 400: {
//                     const {message} = error.response.data
//                     alert(`${error.response.status}: ${message || '資料錯誤'}。`)
//                 }
//
//                     break
//
//                 case 401: {
//                     // 當不是 refresh token 作業發生 401 才需要更新 access token 並重發
//                     // 如果是就略過此刷新 access token 作業，直接不處理(因為 catch 已經攔截處理更新失敗的情況了)
//                     const refreshTokenUrl = `/token/refresh/`
//                     if (error.config.url !== refreshTokenUrl) {
//                         // 原始 request 資訊
//                         const originalRequest = error.config
//
//                         // 依據 refresh_token 刷新 access_token 並重發 request
//                         return refreshToken({refresh: getToken("refresh")}) // refresh_toke is attached in cookie
//                             .then((response) => {
//                                 localStorage.setItem("access", response.access)
//                                 // 刷新原始 request 的 access_token
//                                 originalRequest.headers.Authorization = 'Bearer ' + response.access
//
//                                 // 重送 request (with new access_token)
//                                 // location.reload()
//                                 return axios(originalRequest)
//                             })
//                             .catch((err) => {
//                                 // [更新 access_token 失敗] ( e.g. refresh_token 過期無效)
//                                 localStorage.removeItem("access")
//                                 localStorage.removeItem("refresh")
//                                 // alert(`${err.response.status}: 作業逾時或無相關使用授權，請重新登入`)
//                                 window.location.href = '/login'
//                                 return Promise.reject(error)
//                             })
//                     }
//                 }
//
//                     break
//
//                 case 404:
//                     alert(`${error.response.status}: 資料來源不存在`)
//                     break
//
//                 case 500:
//                     alert(`${error.response.status}: 內部系統發生錯誤`)
//                     break
//
//                 default:
//                     alert(`${error.response.status}: 系統維護中，造成您的不便，敬請見諒。`)
//                     break
//             }
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             if (error.code === 'ECONNABORTED' && error.message && error.message.indexOf('timeout') !== -1) {
//                 // request time out will be here
//                 alert('網路連線逾時，請點「確認」鍵後繼續使用。')
//             } else {
//                 // shutdonw api server
//                 alert('網路連線不穩定，請稍候再試')
//             }
//         }
//         return Promise.reject(error)
//     }
// )
