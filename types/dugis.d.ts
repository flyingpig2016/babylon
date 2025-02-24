declare const BMap: any;
declare const BMapGL: any;
declare const mapvgl: any;

declare module BMapGL {
  type Point = {
    latitude: number;
    longitude: number;
  };
  type EllipseOptions = {
    center: Point; // 圆心坐标
    radiusX: number; // 水平半径，
    radiusY: number; // 垂直半径，
    startAngle?: number; //起始角度
    rotation?: number; // 旋转角度，单位：度，默认值：0，取值范围[0-360]
    direction?: boolean; //绘制方向
    fillColor?: string; // 填充颜色
    selectedColor?: string; //选中颜色
    strokeColor?: string; // 边框颜色
    strokeWeight?: number; // 边框宽度
    strokeStyle?: string; // 边框样式
    offset?: number;
    data?: any;
    clickCallback?: (e: any) => void;
  };
}
declare module Dugis {
  type PointShare = {
    lon: number; //经度
    lat: number; //纬度
    radius: number; //半径
    azimuth: number; //方向角
    jiaodu: number; //扇形的夹角
  };

  type ColorType = {
    // mainColor: [number, number, number];
    // secondColor: [number, number, number];
    mainColor?: string;
    secondColor?: string;
    thirdColor?: string;
    forthColor?: string;
    selectedColor?: string;
    errorColor?: string;
  };

  type ColorRange = {
    value1Color: string;
    value2Color: string;
    value3Color: string;
    value4Color: string;
    value5Color?: string;
    value6Color?: string;
  };

  interface Position {
    left: number;
    top: number;
  }

  type IOptions = {
    centerX: number;
    centerY: number;
    radiusX: number;
    radiusY: number;
    rotation?: number;
    stroke?: boolean;
    fill?: boolean;
    lineWidth?: number;
    strokeStyle?: string;
    fillStyle?: string;
  };
}
