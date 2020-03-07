import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

export enum NOTIFICATION_ACTIONS {
  ADD_ERRORS_TO_NOTIFICATION_STATE = "FETCH_PRODUCTS_PENDING"
}

export function addErrorToNotificationState(errors: UIServerMessages["messages"]) {
  return {
    type: NOTIFICATION_ACTIONS.ADD_ERRORS_TO_NOTIFICATION_STATE,
    payload: errors
  };
}
