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
  name: string;
  password: string;
  email: string;
  datePicker: {
    $d: Date;
  };
  gender: string;
}

export interface ICounselorOnFinishProps {
  name: string;
  license: [];
  certification: string;
  email: string;
  password: string;
}
