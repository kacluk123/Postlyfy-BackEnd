export interface SingleServerMessage {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ServerMessagesResponse {
  isError: boolean;
  messages: SingleServerMessage[];
}

export interface UIServerMessages {
  isError: boolean;
  messages: string[];
}

export const serverMessageUnpacker = (
  serverMessageList: ServerMessagesResponse
): UIServerMessages => {
  return {
    isError: serverMessageList.isError,
    messages: serverMessageList.messages.map(
      (message: SingleServerMessage) => message.msg
    )
  };
};

interface Error {
  isError: boolean;
}

type apiResponse<T> = Error & T;

export function isApiResonseHasError<T>(
  data: apiResponse<T> | UIServerMessages
): data is apiResponse<T> {
  return !data.isError;
}
