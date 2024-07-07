export interface NotificationModel {
  body: string;
  createdAt: number;
  id: string;
  isRead: boolean;
  taskId: string;
  title: string;
  uid: string;
  updatedAT: number;
  from: string;
  eventId: string;
  content: string;
}


export interface NotificationTaskModel {
  body: string;
  createdAt: number;
  id: string;
  isRead: boolean;
  taskId: string;
  taskDetail: {
    title: string;
  };
  title: string;
  uid: string;
  updatedAT: number;
}
