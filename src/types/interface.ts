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
  Password: string;
  Email: string;
  DatePicker: {
    $d: Date;
  };
  Gender: string;
}

export interface ICounselorOnFinishProps {
  Name: string;
  License: [];
  Certification: string;
  Email: string;
  Password: string;
}
