import {service} from "@/api";

export const getToken=(data)=>{
    return service({
        'url': '/token/',
        'method': 'post',
        data
    })
}

export const refreshToken=(data)=>{
    return service({
        'url': '/token/refresh/',
        'method': 'post',
        data
    })
}

function logoutApi() {
    return service({
        'url': '/employee/logout',
        'method': 'post',
    })
}
