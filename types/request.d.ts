declare module Request {
  type data = {
    data: any;
  };

  type WktParse = {
    type: string;
    coordinates: number[][];
  };

  type solutionMapList = {
    [string]: string;
  };
  type ICell = {
    cellTypeName?: string;
    cellName?: string;
    cellId?: string;
    earfcnDl?: string;
    pci?: string;
    azimuth?: string;
    tiltE?: string;
    tiltM?: string;
    tilt?: string;
    avgRsrp?: string;
    disRsrp?: string;
    ncellRSrpNum?: string;
    gridId?: string;
    scellOverlapNum?: string;
    longitude?: string | number;
    latitude?: string | number;
    nrncSsrsrpNum?: string;
    avgNrsrp?: string;
    isOvershoot?: string;
    isOverlap?: string;
    startTime?: string;
    provinceId?: string;
    province?: string;
    cityId?: string;
    city?: string;
    countyId?: string;
    county?: string;
    networkType?: string;
    vendorName?: string;
    siteType?: string;
    cellStatus?: string;
    enodebId?: string;
    siteName?: string;
    siteAddress?: string;
    streetId?: string;
    streetName?: string;
    coverType?: string;
    coverScene?: string;
    localcellId?: string;
    enci?: string;
    freqBand?: string;
    freqMode?: string;
    earfcnUl?: string;
    bandWidth?: string;
    tac?: string;
    rsPower?: string;
    duplexMode?: string;
    rruTr?: string;
    height?: string;
    isPullstation?: string;
    remark?: string;
    createTime?: string;
    cellLifeStatus?: string;
    unitId?: string;
    unitName?: string;
    coverArea?: string;
    resourceRoom?: string;
    managedelementDn?: string;
    enbfunctionDn?: string;
    dn?: string;
    identity?: string;
    administrativeState?: string;
    cellCoverRange?: string;
    maximumTransmissionPower?: string;
    sfassignment?: string;
    specialsfpatterns?: string;
    enbLatitude?: string;
    enbLongitude?: string;
    softwareVersion?: string;
    patchinfo?: string;
    pb?: string;
    bandindicator?: string;
    subcarrierspacing?: string;
    cellType?: string;
    cgi?: string;
    omcIp?: string;
    omcId?: string;
    omcName?: string;
    prachRootsequenceindex?: string;
    earfcnSsb?: string;
    shape?: string;
    operPlmn?: string;
    operPlmnName?: string;
    shareOperPlmn?: string;
    shareOperName?: string;
    mod3?: string;
  };

  type WeakData = {
    coverType?: string;
    positionResult?: string;
    minimumStation?: string;
    area?: string;
    plan?: string;
  };

  type WeakCell = {
    nrscSsrsrpNumArray?: any;
    gridLatitude?: any;
    gridLongitude?: any;
    polygon?: string;
    rsrp?: number;
  };

  type BadQualityConfig = {
    cityId?: string; //筛选条件
    city?: string; //筛选条件
    countyId?: string; //筛选条件
    county?: string; //筛选条件
    sceneType?: string; //筛选条件  场景划分
    cellType?: string; //1、筛选小区 2、自定义导入小区关联orderId
    badQualifyType?: number; //1、默认质差类型  2、自定义质差类型关联orderid
    badQuality?: []; // 1:选择  2 否 默认质差类型 1、高负荷 2、覆盖质差
    causeAnalysis?: []; // 1:选择  2 否  根因分析(如果质差类型是自定义小时则隐藏)  1、高负荷 2、覆盖质差
    createBy?: string;
    createTime?: string;
    status?: number | string;
    orderId?: string;
    orderNum?: string;
    id?: any;
    cellTypeName?: string;
    params?: any;
    badQualifyTypeName?: string;
    badQualityName?: string;
    causeAnalysisName?: string;
    chatId?: string;
    signature?: string;
    webHook?: string;
    openConversationId?: string;
  };
  type MessageListConfig = {
    attachments?: string;
    createdAt?: string;
    dataTime?: string;
    enci?: string;
    enciName?: string;
    finishType?: string;
    isDel?: string;
    messageContent?: string;
    messageId?: string;
    messageTitle?: string;
    receiverUserId?: string;
    receiverUserName?: string;
    sceneType?: string;
    senderUserId?: string;
    senderUserName?: string;
    typeResult?: string;
    updatedAt?: string;
  }
  type UserInfo = {
    token?: string;
    account?: string;
    name?: string;
    phoneNumber?: string;
    cityId?: string;
    cityName?: string;
    countyId?: string;
    countyName?: string;
    menuRoleUuid?: string;
  };
}
