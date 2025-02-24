import Mock from "mockjs";
import { MockMethod } from "vite-plugin-mock";

const singleObj = {
  // 随机生成id号
  // id: "@id",
  // 随机生成中文姓名
  name: "@cname",
  // 属性 id 是一个自增数，起始值为 1，每次增 1
  // "id|+1": 1,
  // 随机生成ip地址
  ip: "@ip",
  // 随机生成省市区地址
  address: "@county(true)",
  // 随机生成邮政编码
  zip: "@zip",

  // 随机生成18-70之间的年龄
  "age|18-70": 20,
  // 随机生成日期
  date: '@date("yyyy-MM-dd")',
  // 随机生成头像
  avatar: "@image('200x200')",
  startTime: '@date("yyyy-MM-dd HH:mm:ss")',
  "provinceId|1": ["110000", "120000", "130000", "140000"],
  province: "@province()",
  cityId: 131100,
  city: "@city()",
  countyId: 131126,
  county: "@county()",
  networkType: "4G",
  vendorName: "华为",
  siteType: "室分",
  enodebId: 173251,
  siteName: "HS故城青罕模_石东馨居HWFSF",
  coverType: "室内",
  cellId: 18,
  enci: "44352274",
  cellName: "@cname",
  freqBand: "L1800",
  earfcnUl: 0,
  earfcnDl: 1650,
  bandWidth: "20",
  pci: 212,
  tac: 5558,
  // "longitude|35-42.6": 37.08605,
  // "latitude|114-128.6": 116.479604,
  "longitude|1": [115.957386, 115.701707, 115.957386],
  "latitude|1": [37.386925, 37.483066, 37.522227],
  coverArea: "县城",
  resourceRoom: "HEB衡水市故城县青罕局",
  shape:
    "0103000020E61000000100000007000000ED504D41CD025D40E04706B382B2424009DA741DCE025D400778992383B2424006375A75D0025D403F3D9D9183B24240EF978FCED2025D40CD2E0F4383B24240C20095E8D3025D40014C88C282B24240300BE896D0025D400CAC1B6B70B24240ED504D41CD025D40E04706B382B24240",
  operPlmnName: "联通",
  shareOperName: "联通",
};

const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  tmQmMrLteSncellDA: [{ ...singleObj }],
  "tmQmMrLteSncellDB|1-10": [{ ...singleObj }],
  solutionMap: {
    天馈调整:
      "服务小区HS桃城邮电仓库模_衡水学院南区9号楼(扩容)NRT-3-share9664213004电子下倾角为10、机械下倾角为10、总下倾角为3，建议电子下倾角下压3°.邻小区HS桃城明珠花园模_衡水学院西校区(扩容)NRT-2-share9663897614电子下倾角为10、机械下倾角为10、总下倾角为3，建议电子下倾角下压3°",
    功率调整:
      "当前服务小区HS桃城明珠花园模_衡水学院西校区(扩容)NRT-2-share9663897614降低功率，可能会导致弱覆盖。服务小区HS桃城邮电仓库模_衡水学院南区9号楼(扩容)NRT-3-share9664213004当前prb利用率为6.0%，小区功率为40，建议降低服务小区功率3~6dB.",
    方位角调整:
      "当前服务小区HS桃城邮电仓库模_衡水学院南区9号楼(扩容)NRT-3-share9664213004当前方位角为230,邻小区HS桃城明珠花园模_衡水学院西校区(扩容)NRT-2-share9663897614方位角为230,建议人工识别结合现场情况调整方位角，优先调整邻小区方位角，其次调整服务小区方位角。",
    修改频点: "",
    天线挂高调整:
      "服务小区HS桃城邮电仓库模_衡水学院南区9号楼(扩容)NRT-3-share9664213004天线挂高为20,邻小区HS桃城明珠花园模_衡水学院西校区(扩容)NRT-2-share9663897614天线挂高为25,建议人工识别结合现场情况调整调整挂高，优先调整小区挂高，其次调整本小区挂高。",
  },
}) as MockMethod[];

export default [
  {
    url: "/PostgreSQL/tmQmMrLteSncellD/getTmQmMrLteSncellDList",
    method: "get",
    response: () => {
      // console.log(params);
      return {
        resultCode: 200,
        data,
        message: "success",
      };
    },
  },
  {
    url: "/PostgreSQL/tmCellConfig/get5GMod30InterfereList",
    method: "get",
    response: () => {
      // console.log(params);
      return {
        resultCode: 200,
        data,
        message: "success",
      };
    },
  },
  {
    url: "/PostgreSQL/tmCellConfig/get5GOverlappingCoverageList",
    method: "get",
    response: () => {
      // console.log(params);
      return {
        resultCode: 200,
        data,
        message: "success",
      };
    },
  },
];
