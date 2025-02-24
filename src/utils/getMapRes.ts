export const loadJScript = (callback?: () => any) => {
  const promise = new Promise((resolve, reject) => {
    const script: HTMLScriptElement = document.createElement("script");
    // script.src = import.meta.env.VITE_MAP_URL;
    // console.log(import.meta.env.VITE_MAP_URL);

    // script.src = "/dugis/baidumap/jsapi/api.js";
    script.src = "/public/dugis/booter.js";
    script.defer = true;

    script.type = "text/javascript";

    document.body.appendChild(script);

    script.onload = () => {
      console.log("百度地图加载成功!");

      resolve(callback?.());
    };

    script.onerror = () => {
      console.log("百度地图加载失败!");
      reject();
    };
  });

  return promise;
};

export const getMapCenter = (dataMap: {
  tmQmMrLteSncellDA?: any[];
  tmQmMrLteSncellDB?: any[];
  data2?: any[];
  data3?: any[];
}) => {
  //默认石家庄坐标
  let centerPoint = {
    longitude: "114.5",
    latitude: "38",
  };
  const tmQmMrLteSncellDA = dataMap.tmQmMrLteSncellDA || [];
  const tmQmMrLteSncellDB = dataMap.tmQmMrLteSncellDB || [];
  const data2 = dataMap.data2 || [];
  const data3 = dataMap.data3 || [];
  if (tmQmMrLteSncellDA.length) {
    centerPoint.longitude = tmQmMrLteSncellDA[0].longitude;
    centerPoint.latitude = tmQmMrLteSncellDA[0].latitude;
  } else if (tmQmMrLteSncellDB.length) {
    centerPoint.longitude = tmQmMrLteSncellDB[0].longitude;
    centerPoint.latitude = tmQmMrLteSncellDB[0].latitude;
  } else if (data2.length) {
    centerPoint.longitude = data2[0].longitude;
    centerPoint.latitude = data2[0].latitude;
  } else if (data3.length) {
    centerPoint.longitude = data3[0].longitude;
    centerPoint.latitude = data3[0].latitude;
  }
  return centerPoint;
};
