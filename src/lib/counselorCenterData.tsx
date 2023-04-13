import { ICoursesDataProps } from '../types/interface';

export const classTopic:{ topicName:string; id:number }[] = [
  { topicName: '職場議題', id: 1 },
  { topicName: '伴侶關係', id: 2 },
  { topicName: '人際關係', id: 3 },
  { topicName: '負面情緒', id: 4 },
  { topicName: '個人發展', id: 5 },
  { topicName: '家庭議題', id: 6 }];

export const coursesData:ICoursesDataProps = {
  Success: true,
  Message: '成功取得課程資訊',
  Data: {
    FieldIds: [2, 4],
    Courses: [
      {
        FieldId: 2,
        Course: [
          {
            Item: '一堂',
            Quantity: 1,
            Price: 1600,
            Availability: true,
          },
          {
            Item: '三堂',
            Quantity: 3,
            Price: 0,
            Availability: false,
          },
          {
            Item: '五堂',
            Quantity: 5,
            Price: 0,
            Availability: false,
          },
          {
            Item: '體驗課一堂',
            Quantity: 1,
            Price: 1000,
            Availability: true,
          },
        ],
        Feature: [
          'a', 'aa', 'aaa', 'aaaa', 'aaaaa',
        ],
      },
      {
        FieldId: 4,
        Course: [
          {
            Item: '一堂',
            Quantity: 1,
            Price: 1800,
            Availability: true,
          },
          {
            Item: '三堂',
            Quantity: 3,
            Price: 0,
            Availability: false,
          },
          {
            Item: '五堂',
            Quantity: 5,
            Price: 0,
            Availability: false,
          },
          {
            Item: '體驗課一堂',
            Quantity: 1,
            Price: 1200,
            Availability: true,
          },
        ],
        Feature: [
          'b', 'bb', 'bbb', 'bbbb', 'bbbbb',
        ],
      },
    ],
  },
};
