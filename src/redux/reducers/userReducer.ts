import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";
import { IUIResponseUser } from "../../api/endpoints/user/userTypes";
import { UserActions, USER_ACTIONS_NAMES } from '../actions/userActions';
import { AppState } from '../store';

interface InitialStateType {
  readonly pending: boolean;
  readonly userData: IUIResponseUser | null;
  readonly errors: UIServerMessages["messages"];
  readonly isAuth: boolean;
}

const initialState: InitialStateType = {
  pending: false,
  userData: null,
  errors: [],
  isAuth: false,
};

export function userReducer(
  state: InitialStateType = initialState,
  action: UserActions
) {
  switch (action.type) {
    case USER_ACTIONS_NAMES.GET_USER_PENDING: {
      return {
        ...state,
        pending: true
      };
    }

    case USER_ACTIONS_NAMES.GET_USER_DATA: {
      return {
        ...state,
        pending: false,
        isAuth: true,
        userData: action.user
      };
    }
    case USER_ACTIONS_NAMES.USER_ERROR: {
      return {
        ...state,
        errors: action.error.messages,
        pending: false,
        isAuth: false,
      };
    }
    case USER_ACTIONS_NAMES.DESTROY_USER_DATA: {
      return {
        ...state,
        isAuth: false,
        userData: null,
      };
    }
    default: {
      return state;
    }
  }
}

export const getUser = (state: AppState) => state.userReducer.userData?.user;
export const isAuth = (state: AppState) => state.userReducer.isAuth;
