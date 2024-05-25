export interface ProfileModel {
  createdAt: string;
  email: string;
  username: string;
  photoUrl: string;
  updatedAt: string;
  id: string;
  fullname: string;
  filename: string;
  type?: 'Organizer' | 'Personal' | undefined;
}
