import styled, { css } from "styled-components";
import { REPLY_TYPE } from "./SingleReplyTypes";

const getGridAreas = (type: string) => {
  const gridAreas = {
    [REPLY_TYPE.POST]: css`
      grid-template-areas:
        "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate SingleReplyLikeButton"
        "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent SingleReplyContent"
        "SingleReplyUserAvatar SinglePostActions SinglePostActions SinglePostActions SinglePostActions"
        "SingleReplyUserAvatar Comments Comments Comments Comments";

      @media (max-width: 500px) {
        & {
          grid-template-areas:
            "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate SingleReplyLikeButton"
            "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent SingleReplyContent"
            "SingleReplyUserAvatar SinglePostActions SinglePostActions SinglePostActions SinglePostActions"
            "Comments Comments Comments Comments Comments";
        }

      };
    `,
    [REPLY_TYPE.DEFAULT]: css`
      grid-template-areas:
        "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate SingleReplyLikeButton"
        "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent SingleReplyContent";
    `
  };

  return gridAreas[type];
};

export const SingleReplyLoader = styled.div.attrs({
  className: 'SingleReplyLoader'
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const SingleReply = styled.div.attrs({
  className: "SingleReply"
})<{ type: string, isPostDeleting: boolean, isPostDeleted: boolean }>`
  @keyframes slide-fwd-bottom {
    0% {
      opacity: 0;
      transform: translateY(0px);
    }
    100% {
      opacity: 1;
      transform: translateY(10px);
    }
  }
  @keyframes deecreseHeight {
    0% {
      height: 100%;
    }

    100% {
      height: 0%;
    }
  }
  animation: slide-fwd-bottom 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  width: 100%;
  position: relative;
  padding: 10px 20px 10px 20px;
  display: grid;
  background: #edecea;
  border-radius: 2px;
  min-height: 140px;
  grid-template-columns: 70px max-content 10% 1fr max-content;
  grid-auto-rows: max-content;
  grid-row-gap: 10px;
  ${(props: { type: string }) => getGridAreas(props.type)}
  
  ${(props: { isPostDeleting: boolean }) => props.isPostDeleting && css`
    transition: .5s ease;
    filter: opacity(.3);
  `}

  ${(props: { isPostDeleted: boolean }) => props.isPostDeleted && css`
    min-height: 0px;
    overflow: hidden;
    animation: deecreseHeight .6s alternate;
  `}

  ${(props: { type: string }) => props.type === REPLY_TYPE.DEFAULT && css`
    @media (max-width: 500px) {
      grid-template-columns: 50px max-content 10% 1fr;
    }
  `}
`;

export const SingleReplyUserAvatarContainer = styled.div.attrs({
  className: "SingleReplyUserAvatarContainer"
})`
  grid-area: SingleReplyUserAvatar;
  width: 50px;
  height: 50px;
  box-shadow: -1px 0px 6px 0px rgba(143,140,147,1);
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props: { type: string }) => props.type === REPLY_TYPE.DEFAULT && css`
    @media (max-width: 500px) {
      width: 35px;
      height: 35px;
    }
  `}
`;

export const SingleReplyUserAvatar = styled.img.attrs({
  className: "SingleReplyUserAvatar"
})`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const SingleReplyLikeButton = styled.div.attrs({
  className: "SingleReplyLikeButton"
})`
  grid-area: SingleReplyLikeButton;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 5px;
  align-items: center;
`;

export const SingleReplyLikeCount = styled.div.attrs({
  className: "SingleReplyLikeCount"
})`
  @keyframes showWithOpacity {
    from {
      transform: translateY(20px);
      opacity: 0;
    } to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  ${(props: { isAnimateRunning: boolean, isLiked: boolean }) => props.isAnimateRunning && css`
    ${props.isLiked ? css`
      animation: showWithOpacity .3s alternate-reverse ease;
    ` : css `
      animation: showWithOpacity .3s alternate ease;
    `}

  `}

  display: flex;
  align-items: flex-start;
`;

export const SingleReplyLikeButtonIcon = styled.div.attrs({
  className: "SingleReplyLikeButtonIcon"
})`
  @keyframes bounceright {
    10% {
      transform: translateX(0);
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-12deg);
    }
    100% {
      transform: translateX(3px);
      transform: rotate(12deg);
    }
  }

  ${(props: { isAnimateRunning: boolean }) => props.isAnimateRunning && css`
    animation: bounceright .11s alternate ease;
    animation-iteration-count: 2;
  `}
  
  cursor: pointer;
`;

export const SingleReplyDate = styled.div.attrs({
  className: "SingleReplyDate"
})`
  grid-area: SingleReplyDate;
  font-size: 12px;
  font-weight: 400;
  color: var(--medium-grey);
  padding: 3px 0 0 10px;
  border-bottom: 1px solid var(--tiny-grey);
`;

export const SingleReplyContent = styled.div.attrs({
  className: "SingleReplyContent"
})`
  grid-area: SingleReplyContent;
  word-break: break-all;
`;

export const SingleReplyUserName = styled.div.attrs({
  className: "SingleReplyUserName"
})`
  grid-area: SingleReplyUserName;
  color: var(--red-orange);
  font-weight: 400;
  border-bottom: 1px solid var(--tiny-grey);
`;
