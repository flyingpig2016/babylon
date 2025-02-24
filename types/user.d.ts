declare module User {
  interface AppState {
    token: string;
    curRoute: string;
    userInfo: Request.UserInfo;
  }
}
