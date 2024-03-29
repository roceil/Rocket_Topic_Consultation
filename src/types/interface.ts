import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { StaticImageData } from 'next/image';

export interface ITopicCardProps {
  type: string;
  text: string;
  img: string;
  imgSM: string;
  gap?: string;
}
export interface ISuggestCounselorCardProps {
  name: string;
  rankTag: string;
  img: string;
  skillsAry: ITopicCardProps[];
  id:number
}

export interface ISearchCapsuleProps {
  colorPrimary?: string;
  borderRadius?: number;
  controlHeight?: number;
  colorBgContainer?: string;
  placeholder?: string;
}

export interface IUserOnFinishProps {
  Name: string;
  Sex: string;
  DatePicker: {
    $d: Date;
  };
  Account: string;
  Password: string;
  ConfirmPassword: string;
}

export interface ICounselorOnFinishProps {
  Name: string;
  License: any;
  Certification: string;
  Account: string;
  Password: string;
  ConfirmPassword: string;
}

export interface IUserCenterLayoutProps {
  children: React.ReactNode;
}

export interface IReservationStepCardProps {
  step: string;
  img: StaticImageData;
  extraStyle: string | null;
}

export interface ICounselorListCardProps {
  className: string;
  counselorName: string;
  subtitle: string;
  description: string;
  img: string;
  id: number;
}

export interface IUserDataProps {
  data: { Data: [{ Account: string; BirthDate: string; Name: string; Sex: string }]; Message: string; Success: boolean };
}

// 諮商師 > 會員中心 > 個人資料 > 課程資訊 API
export interface ICoursesDataProps {
  Success: boolean;
  Message: string;
  Data: {
    FieldIds: number[];
    Courses: ICoursesProps[];
  };
}

export interface ICoursesProps {
  Courses: {
    FieldId: number;
    Course: ICourseItem[];
    Feature: string[];
  }[];
}

export interface IupdateFeatures {
  Feature1: string,
  Feature2: string,
  Feature3: string,
  Feature4: string,
  Feature5: string,
}

export interface IemptyCourseForm {
  Price0: string,
  Price1: string,
  Price2: string,
  Price3: string,
  Availability0: boolean,
  Availability1: boolean,
  Availability2: boolean,
  Availability3: boolean,
  Feature1: string,
  Feature2: string,
  Feature3: string,
  Feature4: string,
  Feature5: string,
}

export interface ICourseItem {
  Item: string;
  Quantity: number;
  Price: number;
  Availability: boolean;
}

// 諮商師 > 會員中心 > 個人資料 > 基本資料 API
export interface ICounselorInfo {
  Success: boolean;
  Message: string;
  Data: ICounselorInfoData[];
}

export interface ICounselorInfoData {
  Account: string;
  CounselorName: string;
  LicenseImg: string;
  CertNumber: string;
  Photo: string | null;
  SellingPoint: string | null;
  SelfIntroduction: string | null;
  VideoLink: string | null;
  IsVideoOpen: boolean;
  AccountStatus: boolean;
}

export interface ICounselorInfoOnFinish {
  CounselorName: string;
  HeadShot: undefined;
  IsVideoOpen: boolean;
  LicenseImg: undefined;
  SelfIntroduction: string;
  SellingPoint: string;
  VideoLink: string;
}

export interface ICounselorInformationProps {
  counselorPageBreadcrumb: ItemType[];
  Photo: string;
  Name: string;
  SelfIntroduction: string;
  FieldTags: string[];
  CertNumber: string;
}

export interface ICounselorPageProps {
  Data: {
    Name: string;
    FieldTags: string[];
    Photo: string;
    SelfIntroduction: string;
    Fields: any;
    VideoLink: string | null;
    CertNumber: string;
    IsVideoOpen: boolean;
  };
}
export interface ICourses {
  Item: string;
  Price: number;
}
export interface IFilterCases {
  label: string;
  value: number;
}

export interface IResetPasswordModalProps {
  showResetPassword: boolean;
  setShowResetPassword: (showResetPassword: boolean) => void;
}

export interface IUserLoginRes {
  Message: string;
  Authorization: string;
  Identity: string;
  UserID: string;
  Validation: boolean;
}

export interface ICartList {
  CartId: number;
  Counselor: string;
  Field: string;
  Item: string;
  Price: number;
}

export interface IShoppingCartProps {
  data: {
    Data: { CartList: ICartList[]; TotalAmount: number };
  };
  token: string;
}

export interface ICartItem {
  Counselor: string;
  Field: string;
  Item: string;
  Price: number;
  CartId: number;
}

export interface IShoppingFormProps {
  renderDate: ICartItem[];
  setRenderDate: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  TotalAmount: number;
}

export interface IChatList {
  Content: string;
  CounselorId: number;
  CounselorRead: boolean;
  Id: number;
  InitDate: string;
  OutName: string;
  Photo: string;
  Type: string;
  UserId: number;
  UserRead: boolean;
}

export interface ICaseRenderData {
  Name: string;
  Field: string;
  AppointmentDate: string;
  AppointmentId: number;
  AppointmentTime: string;
}

export interface IRecordRenderData {
  AppointmentDate: string;
  AppointmentId: number;
  CounsellingRecord: string;
  Field: string;
  LastRecordDate: string;
  Name: string;
  RecordDate: string;
}

export interface ICounselorWaitReplyProps {
  AppointmentId: number;
  Field: string;
  OrderId: number;
  Time: string;
  User: string;
}

export interface IAppointmentTime {
  Success: boolean;
  Message: string;
  Data: {
    PageNum: number;
    Pagination: IPagination[];
    Hours: IHours[];
  };
}

export interface IHours {
  AppointmentTimeId: number;
  Time: string;
  Availability: boolean;
}

export interface IPagination {
  Year: string;
  Month: string;
  Date: string;
  WeekDay: string;
  Hours: IHours[];
}

export interface IRateModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  comment?: string;
  AppointmentId: number;
  rate: number;
  setRateLevel: (value: number) => void;
  setComment: (value: string) => void;
  refetch: () => void;
}

export interface IAppointment {
  AppointmentId: number;
  Counselor: string;
  Field: string;
  Time?: string;
  CounselorId: number;
}

export interface OrderIdMap<T> {
  [orderId: number]: T[];
}

export interface ListItem {
  OrderId: number;
  AppointmentId: number;
  Counselor: string;
  Field: string;
  CounselorId: number;
}

export interface IAppointmentWithOrderProps {
  AppointmentId: number;
  AppointmentTime: string;
  CounselorName: string;
  InitDate: string;
  ReserveStatus: string;
  UserName: string;
  ZoomLink: string;
}

export interface IAlertProps {
  appointmentsWithOrder: IAppointmentWithOrderProps[];
  isHaveUrl: boolean
  spanNowTime: string
}

export interface IAppointmentWithOrder {
  isHaveUrl: boolean
  spanNowTime: string
  url: string
}

export interface ICounselorRenderList {
  Name:string;
  Field:string;
  AppointmentTime:string;
  AppointmentId:number;
  AppointmentDate:string;
}

export interface IGroupRenderData {
  OrderId: number,
  AppointmentId: number,
  CounselorId: number,
  Counselor: string,
  Field: string
}

// 諮商師 > 會員中心 > 個人資料 > 預約時段
export interface IApiTimetablesHours {
  Time: string;
  DefaultAvail: boolean;
}

export interface IApiTimetablesWeekData {
  WeekDay: string;
  Hours: IApiTimetablesHours[];
}

export interface IApiTimetables {
  StartDate: string;
  EndDate: string;
  WeekData: IApiTimetablesWeekData[];
}
