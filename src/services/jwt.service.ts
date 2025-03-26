import Cookies from "js-cookie";

const TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER_DATA = "userData";
const USERNAME = "username"; // 🔥 Thêm key riêng cho username

/** 🔐 Lấy Access Token */
export const getToken = (): string | undefined => Cookies.get(TOKEN);

/** 🔄 Lấy Refresh Token */
export const getRefreshToken = (): string | undefined => Cookies.get(REFRESH_TOKEN);

/** 🔍 Lấy dữ liệu user */
export const getUserData = (): any | null => JSON.parse(localStorage.getItem(USER_DATA) || "null");

/** 💾 Lưu Access Token + Refresh Token */
export const saveToken = (accessToken: string, refreshToken: string) => {
    Cookies.set(TOKEN, accessToken, { expires: 1 });
    Cookies.set(REFRESH_TOKEN, refreshToken, { expires: 7 });
};

/** ❌ Xóa Access Token */
export const destroyToken = () => {
    Cookies.remove(TOKEN);
    Cookies.remove(REFRESH_TOKEN);
};

/** 💾 Lưu thông tin user */
export const saveUserData = (userData: { userId: string; name: string; warehouseId: string }) => {
    localStorage.setItem(USER_DATA, JSON.stringify(userData));
    localStorage.setItem(USERNAME, userData.name); // 🔥 Lưu username riêng biệt
};

/** ❌ Xóa toàn bộ thông tin user */
export const destroyUserData = () => {
    localStorage.removeItem(USER_DATA);
    localStorage.removeItem(USERNAME); // 🔥 Xóa username khi logout
};

/** ❌ Xóa username riêng biệt */
export const destroyUsername = () => {
    localStorage.removeItem(USERNAME);
};

/** 🔍 Lấy userId từ userData */
export const getUserId = (): string | null => getUserData()?.userId || null;

/** 🔍 Lấy username từ userData */
export const getUsername = (): string | null => getUserData()?.name || null;

/** 🔍 Lấy warehouseId từ userData */
export const getWarehouseId = (): string | null => getUserData()?.warehouseId || null;

export default {
    getToken,
    getRefreshToken,
    saveToken,
    destroyToken, 
    saveUserData,
    destroyUserData, 
    destroyUsername,
    getUserData,
    getUserId,
    getUsername,
    getWarehouseId,
};
