interface IComponent {
    VIV_ID: string;
    PTR_ID: string;
    VES_ID: string;
    PTR_NAME: string;
    SerialNumber: any;
    MakerId: string;
    Maker: string;
    DesignType: string;
    IsCriticalComponent: number;
    ComponentNotes: string;
    WarrantyEndDate: any;
    VIV_NAME: string;
    Par_Id: string;
    VIV_MakersRef: string;
    VIV_DrawingPos: string;
    MUN_ID: string;
    VIV_Critical: boolean;
    VIV_ROB: number;
    VIV_MinStock: number;
    ComponentType: string;
    VIV_DangerousGoods?: boolean | null;
    Viv_CertificateRequired?: boolean | null;
    VIV_Comment: string;
    PendingOrders: number;
    EstimatePrice: number;
    IsMarketPlacePart: number;
    IsMarketPlaceComponent: number;
    SpareParts: IComponent[]
  }