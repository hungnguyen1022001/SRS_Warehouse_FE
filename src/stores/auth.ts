import { defineStore } from "pinia";
import axiosConfig from "../services/api.js";
import { API } from "@/utils/api.ts";
import JwtService from "@/services/jwt.service.ts";

interface User {
    userId: string;
    name: string;
    warehouseId: string;
}

interface Auth {
    user: User | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
    state: (): Auth => ({
        user: null,
        isAuthenticated: !!JwtService.getToken(),
    }),

    getters: {
        userId: (state) => state.user?.userId || null,
        warehouseId: (state) => state.user?.warehouseId || null,
    },

    actions: {
        /** 🔐 Đăng nhập */
        async login(payload: any, router: any) {
            try {
                const { data } = await axiosConfig.post(API.LOGIN, payload);
                console.log("🚀 API Response:", data);

                if (data && data.status === 1) {
                    this.user = {
                        userId: data.userId,
                        name: data.username,
                        warehouseId: data.warehouseId,
                    };

                    JwtService.saveToken(data.accessToken, data.refreshToken);
                    JwtService.saveUserData(data.username, data.userId, data.warehouseId);
                    this.isAuthenticated = true;

                    await router.push("/"); // ✅ Chuyển hướng sau khi đăng nhập
                }
                return data;
            } catch (error) {
                console.error("❌ Login API Error:", error);
                throw error;
            }
        },

        /** 🚪 Đăng xuất */
        logout(router: any) {
            JwtService.destroyToken();
            JwtService.destroyUserData();
            this.user = null;
            this.isAuthenticated = false;
            router.push("/login"); // ✅ Chuyển hướng về login
        },

        /** 🔄 Kiểm tra trạng thái đăng nhập */
        checkAuth() {
            this.isAuthenticated = !!JwtService.getToken();
        },
    },
});
