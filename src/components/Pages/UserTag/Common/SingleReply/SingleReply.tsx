import * as React from "react";
import * as Styled from "./SingleReplyStyles";
import * as Types from "./SingleReplyTypes";
import * as Icon from "../../../../Common/Icons/Icons";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CircularProgress from "@material-ui/core/CircularProgress";
import { REPLY_TYPE } from "./SingleReplyTypes";
import ReactTooltip from 'react-tooltip';

const SingleReply = ({
  author,
  createdAt,
  content,
  children,
  type,
  avatar,
  isAuth,
  isLiked = false,
  likesCount,
  onLikeButtonClick,
  isPostDeleting = false,
  isPostDeleted = false,
  handleAnimationEnd
}: Types.ISingleReply) => {
  const isLikeDisabled = !isAuth || !isLiked;
  const [isAnimateRunning, setAnimationRunning] = React.useState<boolean>(false);
  return (
    <Styled.SingleReply
      type={type}
      isPostDeleting={isPostDeleting}
      isPostDeleted={isPostDeleted}
      onAnimationEnd={(event: React.AnimationEvent<HTMLDivElement>) => {
        if (event.animationName === 'deecreseHeight' && isAuth) {
          if (handleAnimationEnd) {
            handleAnimationEnd();
          }
        }
      }}
    >
      {children}
      <Styled.SingleReplyUserName>{author}</Styled.SingleReplyUserName>
      <Styled.SingleReplyUserAvatarContainer type={type}>
        {avatar ? <Styled.SingleReplyUserAvatar src={avatar}/> : <Icon.User height="80%" width="80%" />}
      </Styled.SingleReplyUserAvatarContainer>
      <Styled.SingleReplyLikeButton>
        {type === REPLY_TYPE.POST && (
          <Styled.SingleReplyLikeButtonIcon
            onAnimationEnd={() => setAnimationRunning(false)}
            isAnimateRunning={isAnimateRunning}>
              {!isAuth && <ReactTooltip place="left" id="like-tooltip" />}
              <ThumbUpIcon
                data-for="like-tooltip"
                data-tip="You've must be logged in to like a post"
                onClick={() => {
                  if (isAuth) {
                    setAnimationRunning(true);
                    if (onLikeButtonClick) {
                      onLikeButtonClick();
                    }
                  }
              }} color={isLikeDisabled ? "disabled" : "primary"} />
          </Styled.SingleReplyLikeButtonIcon>
        )}
        <Styled.SingleReplyLikeCount
          isLiked={isLiked}
          isAnimateRunning={isAnimateRunning}
          onClick={() => {
            setAnimationRunning(true);
        }}>
          {likesCount}
        </Styled.SingleReplyLikeCount>
      </Styled.SingleReplyLikeButton>
      <Styled.SingleReplyDate>{createdAt}</Styled.SingleReplyDate>
      <Styled.SingleReplyContent>{content}</Styled.SingleReplyContent>
      {isPostDeleting && (
        <Styled.SingleReplyLoader>
          <CircularProgress />
        </Styled.SingleReplyLoader>
      )}
    </Styled.SingleReply>
  );
};

export default SingleReply;
