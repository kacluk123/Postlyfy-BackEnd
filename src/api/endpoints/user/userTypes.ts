export interface IServerResponseUser {
  isError: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    userPicture: string | null;
  };
}

export interface IUIResponseUser {
  isError: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    userPicture: string | null;
  };
}