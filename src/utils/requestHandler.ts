import { ElMessage } from "element-plus";

export const handleCode = async (error: any) => {
  switch (error.response.status) {
    case 400:
      error.message = "错误请求";
      break;
    case 401:
      error.message = "未授权，请重新登录";
      break;
    case 403:
      error.message = "拒绝访问";
      break;
    case 404:
      error.message = "请求错误,未找到该资源";
      break;
    case 405:
      error.message = "请求方法未允许";
      break;
    case 408:
      error.message = "请求超时";
      break;
    case 500:
      error.message = "服务器端出错";
      break;
    case 501:
      error.message = "网络未实现";
      break;
    case 502:
      error.message = "网络错误";
      break;
    case 503:
      error.message = "服务不可用";
      break;
    case 504:
      error.message = "网络超时";
      break;
    case 505:
      error.message = "http版本不支持该请求";
      break;
    default:
      error.message = `未知错误${error.response.status}`;
  }

  ElMessage.error(error.message || "后端接口未知异常");
};

export const handleMessage = (error: any) => {
  let { message } = error;

  if (message === "Network Error") {
    message = "后端接口连接异常";
  }
  if (message.includes("timeout")) {
    message = "后端接口请求超时";
  }
  if (message.includes("Request failed with status code")) {
    const code = message.substr(message.length - 3);
    message = "后端接口" + code + "异常";
  }
  ElMessage.error(message || `后端接口未知异常`);
};

export const download = (response: any) => {
  const blob = new Blob([response.data], {
    type: response.headers["content-type"] || "application/vnd.ms-excel",
  });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  const fileNames = response.headers["content-disposition"].split("=");
  const name = decodeURIComponent(fileNames[1]);
  if (name) {
    link.setAttribute("download", name); // 设置下载下来的文件名
  } else {
    link.setAttribute("download", "模板");
  }
  document.body.appendChild(link);
  link.click();
  link.remove();
};
