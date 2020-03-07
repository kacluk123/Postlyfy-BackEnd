import * as React from "react";
import * as Types from "./PostInputActionsTypes";
import * as Styled from "./PostInputActionsStyles";
import Button from "../../../../Common/Button";
import { isAuth } from '../../../../../redux/reducers/userReducer';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

const PostInputActions = ({
  onSendPostButtonClick,
  postInputValue,
  isSendPostButtonDisabled
}: Types.PostInputActions) => {
  const isUserAuth = useSelector(isAuth);

  return (
    <Styled.PostInputActions>
      <div 
        data-tip="You've must be logged in to add a post"
        data-for="add-post-button-tooltip"
      >
        <Button
          onClick={onSendPostButtonClick}
          disabled={isSendPostButtonDisabled}
        >
          Send
        </Button>
      </div>
      {!isUserAuth && <ReactTooltip id="add-post-button-tooltip"/>}
    </Styled.PostInputActions>
  );
};

export default PostInputActions;
