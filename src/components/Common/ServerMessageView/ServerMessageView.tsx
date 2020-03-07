import * as React from "react";
import * as Styled from "./ServerMessageViewStyles";
import * as Types from "./ServerMessageViewTypes";

const ServerMessageViewComponent = ({
  isError,
  messages
}: Types.ServerMessageView) => {
  return (
    <Styled.ServerMessageViewList data-testid="messagesList">
      {messages.map((message: string) => (
        <Styled.ServerMessageSingleMessage isError={isError} key={message}>
          {message}
        </Styled.ServerMessageSingleMessage>
      ))}
    </Styled.ServerMessageViewList>
  );
};

export default ServerMessageViewComponent;
