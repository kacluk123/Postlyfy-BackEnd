import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";
import { IUIResponseUser } from '../../api/endpoints/user/userTypes'
 
export enum USER_ACTIONS_NAMES {
  GET_USER_DATA = "GET_USER_DATA",
  GET_USER_PENDING = "GET_USER_PENDING",
  USER_ERROR = "USER_ERROR",
  DESTROY_USER_DATA = "DESTROY_USER_DATA"
}

export interface IUserBaseAction {
  type: USER_ACTIONS_NAMES;
}

export interface IUserError extends IUserBaseAction {
  error: UIServerMessages;
  type: USER_ACTIONS_NAMES.USER_ERROR;
}

export interface IUserPending extends IUserBaseAction {
  type: USER_ACTIONS_NAMES.GET_USER_PENDING;
}

export interface IUserDestroy extends IUserBaseAction {
  type: USER_ACTIONS_NAMES.DESTROY_USER_DATA;
}

export interface IGetUserData extends IUserBaseAction {
  type: USER_ACTIONS_NAMES.GET_USER_DATA;
  user: IUIResponseUser;
}

export type UserActions =
  | IUserError
  | IUserPending
  | IGetUserData
  | IUserDestroy;

export function getUser(payload: IUIResponseUser) {
  return {
    type: USER_ACTIONS_NAMES.GET_USER_DATA,
    user: payload
  };
}

export function getUserPending(): IUserPending {
  return {
    type: USER_ACTIONS_NAMES.GET_USER_PENDING
  };
}

export function destroyUserData(): IUserDestroy {
  return {
    type: USER_ACTIONS_NAMES.DESTROY_USER_DATA
  };
}

export function getUserError(
  error: UIServerMessages
): IUserError {
  return {
    type: USER_ACTIONS_NAMES.USER_ERROR,
    error
  };
}
