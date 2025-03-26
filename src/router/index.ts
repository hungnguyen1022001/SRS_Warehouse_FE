import { createWebHistory, createRouter } from "vue-router";
import JwtService from "@/services/jwt.service.ts";
import { useAuthStore } from "@/stores/auth.ts";

const list_routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/Login.vue"),
        meta: { layout: "LayoutAuth", key: "login", requiresAuth: false },
    },
    {
        path: "/",
        name: "dashboard",
        component: () => import("../views/Home.vue"),
        meta: { layout: "LayoutDefault", key: "dashboard", requiresAuth: true },
    },
    {
        path: "/order",
        name: "Order",
        component: () => import("../views/order/List.vue"),
        meta: { layout: "LayoutDefault", key: "order", requiresAuth: true },
    },
    {
        path: "/order/create",
        name: "Order-create",
        component: () => import("../views/order/New.vue"),
        meta: { layout: "LayoutDefault", key: "order-create", requiresAuth: true },
    },
    {
        path: "/order/detail/:id",
        name: "Order-detail",
        component: () => import("../views/order/Detail.vue"),
        meta: { layout: "LayoutDefault", key: "order-detail", requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: list_routes,
});

router.beforeEach(async (to, _, next) => {
    const authStore = useAuthStore();
    const token = JwtService.getToken();

    if (token) {
        if (to.name === "login") return next({ name: "dashboard" });

        if (!authStore.isAuthenticated) authStore.checkAuth();
        return next();
    } else {
        if (to.meta.requiresAuth) return next({ name: "login" });

        return next();
    }
});

export default router;
