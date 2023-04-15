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

export interface ICounselorInformationProps {
  counselorPageBreadcrumb: ItemType[];
  Photo: string;
  Name: string;
  SelfIntroduction: string;
  FieldTags: string[];
}

export interface ICounselorPageProps {
  Data: {
    Name: string;
    FieldTags: string[];
    Photo: string;
    SelfIntroduction: string;
    Fields: any;
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
