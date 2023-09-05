import {createRouter, createWebHistory} from 'vue-router'
import NotFound from "@/components/NotFound.vue";
import {getNavigation} from "@/API/navigation";
import {dnfStore} from "@/store/pinia-store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/dnf',
            name: 'navigation',
            component: () => import('../components/navigation.vue'),
            meta: {
                requiresAuth: true
            },
            children: []
        },
        {
            path: '/login',
            alias: '/',
            name: 'login',
            component: () => import('../components/Login.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../components/Register.vue'),
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/:paths(.*)*',
            component: NotFound
        },
    ]
})
let load = 0
router.beforeEach(async (to, from, next) => {

        const isLogin = Boolean(localStorage.getItem("access"))
        if (isLogin && load === 0) {
            load++
            await getNavigation().then(res => {
                if (!Array.isArray(res.data)){
                    next()
                    return
                }
                dnfStore().route = res.data
                res.data.map(i => {
                    router.options.routes[0].children.push({
                        name: i.name,
                        path: '/dnf' + i.path,
                        meta: {
                            requiresAuth: true
                        },
                        component: () => import(`../components/${i.component}.vue`)
                    })
                })
                router.addRoute(router.options.routes[0])
                console.log(router)
                next({path: to.fullPath})
            })
            return
        }
        if (to.path === "/dnf/" || to.path === "/dnf") {
            next({path: "/dnf/host_list/"})
            return
        }
        if (!isLogin && Object.keys(to.meta).length === 0) {
            next({path: "/login"})
            return
        }
        next()
    }
)

export default router
