import {service} from "@/api";

export const getNavigation = () => {
    return service({
        url: `/navigation/`,
        method: 'get'
    })
}