import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: (): User.AppState => ({
    token: "111111",
    curRoute: "",
    userInfo: {
      token: "",
      account: "",
      name: "",
      phoneNumber: "",
      cityId: "",
      cityName: "",
      countyId: "",
      countyName: "",
      menuRoleUuid: "",
    },
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setCurRoute(page: string) {
      this.curRoute = page;
    },
    setUserInfo(state: any) {
      this.userInfo = state;
    },
  },
  getters: {
    // 获取用户信息，返回一个对象
    getUserInfo: (state) => {
      return state.userInfo;
    },
  },
  persist: true,
});
