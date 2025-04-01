import Cookies from "js-cookie";

const TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER_DATA = "userData";
const USERNAME = "username";

export const getToken = (): string | undefined => Cookies.get(TOKEN);

export const getRefreshToken = (): string | undefined => Cookies.get(REFRESH_TOKEN);

export const getUserData = (): any | null => JSON.parse(localStorage.getItem(USER_DATA) || "null");

export const saveToken = (accessToken: string, refreshToken: string) => {
    Cookies.set(TOKEN, accessToken, { expires: 1 });
    Cookies.set(REFRESH_TOKEN, refreshToken, { expires: 7 });
};

export const destroyToken = () => {
    Cookies.remove(TOKEN);
    Cookies.remove(REFRESH_TOKEN);
};

export const saveUserData = (userData: { userId: string; name: string; warehouseId: string }) => {
    localStorage.setItem(USER_DATA, JSON.stringify(userData));
    localStorage.setItem(USERNAME, userData.name);
};

export const destroyUserData = () => {
    localStorage.removeItem(USER_DATA);
    localStorage.removeItem(USERNAME);
};

export const destroyUsername = () => {
    localStorage.removeItem(USERNAME);
};

export const getUserId = (): string | null => getUserData()?.userId || null;

export const getUsername = (): string | null => getUserData()?.name || null;

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
