export interface ITopicCardProps {
  type: string;
  text: string;
  gap?: string;
}
export interface ISuggestCounselorCardProps {
  name: string;
  rankTag: string;
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
