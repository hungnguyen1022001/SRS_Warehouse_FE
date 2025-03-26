import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosConfig from "@/services/api";
import { API } from "@/utils/api";
import JwtService from "@/services/jwt.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JwtService.getUserData(),
    accessToken: JwtService.getToken(),
    refreshToken: JwtService.getRefreshToken(),
    isAuthenticated: !!JwtService.getToken(),
  }),

  actions: {
    async login(payload: any) {
      try {
        const { data } = await axiosConfig.post(API.LOGIN, payload);
        if (data?.status === 1) {
          this.setAuthState(data.accessToken, data.refreshToken, {
            userId: data.userId,
            name: data.username,
            warehouseId: data.warehouseId,
          });
          useRouter().push("/");
        }
        return data;
      } catch (error) {
        throw error;
      }
    },


    logout() {
      JwtService.destroyToken();
      JwtService.destroyUserData();
      this.$reset();
      useRouter().push("/login");
    },

    setAuthState(accessToken: string, refreshToken: string, user: any) {
      this.user = user;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isAuthenticated = true;
      JwtService.saveToken(accessToken, refreshToken);
      JwtService.saveUserData(user);
    },
  },
});
