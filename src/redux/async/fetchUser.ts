import {
  getUser,
  getUserError,
} from "../actions/userActions";

import { getUser as getUserData } from "../../api/endpoints/user/user";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  isApiResonseHasError
} from "../../api/endpoints/common/errorDataUnpacker";

export const fetchUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const user = await getUserData();
    if (isApiResonseHasError(user)) {
      dispatch(getUser(user));
    } else {
      dispatch(getUserError(user));
    }
  };
};