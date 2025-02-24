import { defineStore } from "pinia";

interface AppState {
  globalOrderId: string;
  operateState: string; //是否是创建
  currentRowData: Request.BadQualityConfig;
}

export const useRobotStore = defineStore({
  id: "robotManage",
  state: (): AppState => ({
    globalOrderId: "",
    operateState: "add",
    currentRowData: {},
  }),
  actions: {
    setGlobalOrderId(state: string) {
      this.globalOrderId = state;
    },
    setOperateState(state: string) {
      this.operateState = state;
    },
    setCurrentRowData(state: any) {
      this.currentRowData = state;
    },
  },
  getters: {
    // 获取用户信息，返回一个对象
    getGloblaOrderId: (state) => {
      return {
        token: state.globalOrderId,
      };
    },
    getOperateState: (state) => {
      return state.operateState;
    },
    getCurrentRowData: (state) => {
      return state.currentRowData;
    },
  },
  persist: true,
});
