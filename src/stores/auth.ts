import { defineStore } from "pinia";
import axiosConfig from "../services/api.js";
import { API } from "@/utils/api.ts";
import JwtService from "@/services/jwt.service.ts";

interface User {
    userId: string;
    name: string;
    warehouseId: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

interface LoginResponse {
    status: number;
    accessToken: string;
    refreshToken: string;
    userId: string;
    username: string;
    warehouseId: string;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: !!JwtService.getToken(),
    }),

    getters: {
        userId: (state) => state.user?.userId || null,
        warehouseId: (state) => state.user?.warehouseId || null,
    },

    actions: {
        async login(payload: any, router: any) {
            try {
                const response = await axiosConfig.post<LoginResponse>(API.LOGIN, payload);
                const data = response.data;
                const user =response.data.data;

                if (data?.status === 1) {
                    this.user = {
                        userId: user.userId,
                        name: user.username,
                        warehouseId: user.warehouseId,
                    };

                    JwtService.saveToken(user.accessToken, user.refreshToken);
                    JwtService.saveUserData({
                        userId: user.userId,
                        name: user.username,
                        warehouseId: user.warehouseId,
                    });
                    this.isAuthenticated = true;

                    await router.push("/");
                }
                return data;
            } catch (error) {
                console.error("❌ Login API Error:", error);
                throw error;
            }
        },

        logout(router: any) {
            JwtService.destroyToken();
            JwtService.destroyUserData();
            this.user = null;
            this.isAuthenticated = false;
            router.push("/login");
        },

        checkAuth() {
            this.isAuthenticated = !!JwtService.getToken();
        },
    },
});
