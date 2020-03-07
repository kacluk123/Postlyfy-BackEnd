import { mainApi } from "../../axios-instances";
import { userUnpacker } from './userMapper';
import {
  serverMessageUnpacker,
  UIServerMessages
} from "../common/errorDataUnpacker";
import * as Types from './userTypes';

const getUserURL = () => '/users/get-user-data';

export const getUser = async (): Promise<Types.IUIResponseUser | UIServerMessages> => {
  try {
    const { data } = await mainApi.get(getUserURL(), {
      withCredentials: true
    });

    return userUnpacker(data);
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
}