import { NOTIFICATION_ACTIONS } from "../actions/notificationActions";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

interface InitialStateType {
  errors: string[];
}

export const initialState: InitialStateType = {
  errors: []
};

interface NotificationReducerAction {
  type: NOTIFICATION_ACTIONS;
  payload: UIServerMessages["messages"];
}

export function notificationReducer(
  state: InitialStateType = initialState,
  action: NotificationReducerAction
) {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.ADD_ERRORS_TO_NOTIFICATION_STATE: {
      return {
        ...state,
        errors: [...state.errors, action.payload]
      };
    }

    default: {
      return state;
    }
  }
}

export const getErrors = (state: InitialStateType) => state.errors;
