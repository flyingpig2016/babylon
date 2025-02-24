declare module TableData {
  type CellTableData = {
    tmQmMrLteSncellDA: Request.ICell[];
    tmQmMrLteSncellDB: Request.ICell[];
    solutionMap?: Request.ISolutionMap;
  };

  type AlarmList = {
    alaramList: Request.ICell[];
    neighboralaramList: Request.ICell[];
  };

  // city_id,start_time,cell_name,enci，network_type(4G,5G),recognition_type(1:重叠覆盖,  2.MOD3干扰,  3. 弱覆盖)

  type QueryData = {
    city_id: string;
    start_time: string;
    cell_name: string;
    enci: string;
    network_type: string;
    recognition_type: string;
    tab?: string;
  };

  type WeakData = {
    coverType?: string;
    positionResult?: string;
    minimumStation?: string;
    area?: string;
    plan?: string;
  };

  type TiltAndSapcingTb = {
    cellName?: string;
    height?: string;
    tilt?: string;
    targetCellName?: string;
    siteBtDistance?: string;
  };

  type TiltAndSapcing = {
    solutionMap?: { 方案?: string };
    tmCellConfig?: TiltAndSapcingTb;
    localMap?: { 核查定位?: string };
  };

  type SelectData = {
    label: string;
    value: string;
  };
}
