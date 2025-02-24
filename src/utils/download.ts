export const downloadHanlder = (response: any) => {
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
