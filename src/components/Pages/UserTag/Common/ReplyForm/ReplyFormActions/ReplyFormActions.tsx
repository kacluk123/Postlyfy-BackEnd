import * as React from "react";
import * as Types from "./ReplyFormActionsTypes";
import * as Styled from "./ReplyFormActionsStyles";
import Button from "../../../../../Common/Button";

const ReplyFormActions = ({
  isButtonDisabled,
  onClick
}: Types.PostInputActions) => {
  return (
    <Styled.ReplyFormActions>
      <Button onClick={onClick} disabled={isButtonDisabled}>
        Send
      </Button>
    </Styled.ReplyFormActions>
  );
};

export default ReplyFormActions;
