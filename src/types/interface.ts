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
  img: StaticImageData;
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
