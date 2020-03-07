import * as React from "react";
import * as Styled from "./SinglePostStyles";
import { SingleUIPostsResponse } from "../../../../../api/endpoints/posts/postsTypes";
import { toggleLike, deletePost } from "../../../../../api/endpoints/posts/posts";
import moment from "moment";
import reactStringReplace from "react-string-replace";
import Comments from "./Comments";
import SingleReply from "../../Common/SingleReply";
import { REPLY_TYPE } from "../../Common/SingleReply/SingleReplyTypes";
import { useSelector, useDispatch } from 'react-redux';
import { getUser, isAuth } from '../../../../../redux/reducers/userReducer';
import { togglePostLike, deletePostAction } from '../../../../../redux/actions/postActions';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const replaceHashTags = (content: string | React.ReactNodeArray) =>
  reactStringReplace(content, /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm, (match, i) => {
    return (
      <span>
        {" "}
        #
        <Styled.HashtagLink to={match} key={match + i}>
          {match}
        </Styled.HashtagLink>
      </span>
    );
  });

const addNewLine = (content: string | React.ReactNodeArray) =>
  reactStringReplace(content, /(\r\n|\n|\r)/gm, () => {
    return <br />;
  });

const SinglePostComponent = ({
  author,
  postId,
  content,
  createdAt,
  comments,
  commentsAddedInCurrentSession,
  totalComments,
  userPicture,
  likes,
  likesCount
}: SingleUIPostsResponse) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const isUserAuth = useSelector(isAuth);
  const [isCommentInputShowed, setVisibilityOfCommentInput] = React.useState<
    boolean
  >(false);
  const [isPostDeleting, setPostDeleting] = React.useState<boolean>(false);
  const [isPostDeleted, setPostDeleted] = React.useState<boolean>(false);

  const hideCommentInput = React.useCallback(() => {
    setVisibilityOfCommentInput(false);
  }, []);

  const isAuthor = user?.name === author;

  const toggleSinglePostLike = async () => {
    if (user) {
      await toggleLike(postId);
      dispatch(togglePostLike({
        userId: user?.id,
        postId,
      }));
    }
  };

  const deletePostFromList = async () => {
    try {
      setPostDeleting(true);
      await deletePost(postId);
      setPostDeleted(false);
    } catch {
      console.log('failed to delete post')
    }
  };

  const deletePostLocal = () => {
    dispatch(deletePostAction(postId));
  };

  const isLikedByUser = user && likes.includes(user.id);

  return (
    <SingleReply
      author={author}
      content={replaceHashTags(addNewLine(content))}
      createdAt={moment(createdAt).format("MMM Do YY")}
      avatar={userPicture}
      isLiked={isLikedByUser}
      isAuth={isUserAuth}
      onLikeButtonClick={toggleSinglePostLike}
      likesCount={likesCount}
      isPostDeleting={isPostDeleting}
      isPostDeleted={isPostDeleted}
      handleAnimationEnd={deletePostLocal}
      type={REPLY_TYPE.POST}
    >
      <Comments
        isCommentInputShowed={isCommentInputShowed}
        postId={postId}
        comments={comments}
        commentsAddedInCurrentSession={commentsAddedInCurrentSession}
        hideCommentInput={hideCommentInput}
        totalComments={totalComments}
      />

      <Styled.SinglePostActions>
        <Styled.SinglePostAction onClick={() => setVisibilityOfCommentInput(visible => !visible)}>
          <Styled.SinglePostReplyText>
            Reply
          </Styled.SinglePostReplyText>
          <ReplyIcon color='disabled' />
        </Styled.SinglePostAction>
        {isAuthor && (
          <Styled.SinglePostAction onClick={deletePostFromList}>
            <Styled.SinglePostReplyText>
              Delete post
            </Styled.SinglePostReplyText>
            <DeleteOutlineIcon color='disabled' />
          </Styled.SinglePostAction>
        )}
      </Styled.SinglePostActions>
    </SingleReply>
  );
};

export default SinglePostComponent;
