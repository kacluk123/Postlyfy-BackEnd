import * as Types from './userTypes';

export const userUnpacker = (
  response: Types.IServerResponseUser
): Types.IUIResponseUser => ({
  isError: response.isError,
  user: {
    id: response.user._id,
    email: response.user.email,
    name: response.user.name,
    userPicture: response.user.userPicture
  }
});
