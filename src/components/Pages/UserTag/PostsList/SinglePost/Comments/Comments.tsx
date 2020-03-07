import * as React from "react";
import * as Styled from "./CommentsStyles";
import * as Types from "./CommentsTypes";
import * as API from "../../../../../../api/endpoints/posts/posts";
import useForm from "../../../../../../hooks/useForm";
import ReplyForm from "../../../Common/ReplyForm";
import SingleReply from "../../../Common/SingleReply";
import { getComments } from '../../../../../../api/endpoints/posts/posts';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addNewComment, loadMoreComments } from '../../../../../../redux/actions/postActions';
import { SinglePostReplyText as LoadMoreComments } from '../../SinglePost/SinglePostStyles';
import { REPLY_TYPE } from '../../../Common/SingleReply/SingleReplyTypes';

const Comments = ({
  isCommentInputShowed,
  postId,
  comments,
  hideCommentInput,
  commentsAddedInCurrentSession,
  totalComments
}: Types.IComments) => {
  const dispatch = useDispatch();
  const [canLoadMoreComment, setLoadMoreComment] = React.useState<boolean>(true);

  const {
    formValues,
    handleChangeFormValues,
    onButtonClick,
    isButtonDisabled
  } = useForm({
    initialValues: {
      comment: ""
    },
    validationRules: {
      comment: {
        required: true,
        minLength: 6
      }
    }
  }, []);
  

  const sendComment = async () => {
    const comment = await API.addComment({ comment: formValues.comment }, postId);
    if (comment) {
      dispatch(addNewComment(comment));
    }
    hideCommentInput();
  };

  const fetchComments = React.useCallback(async () => {
    const commentsList = await getComments(postId, {
      skip: comments.length
    });
    dispatch(loadMoreComments(commentsList));
    setLoadMoreComment(false);
  }, [postId]);

  const isNotAllCommentsLoaded = totalComments > 3 && canLoadMoreComment;

  return (
    <Styled.Comments>
      {isCommentInputShowed && (
        <React.Fragment>
          <ReplyForm
            name="comment"
            handleSubmit={onButtonClick(sendComment)}
            isButtonDisable={isButtonDisabled}
            value={formValues.comment}
            onChange={handleChangeFormValues}
          />
        </React.Fragment>
      )}
      <Styled.CommentsList>
        {comments.map(({ content, createdAt, author, commentId }) => (
          <SingleReply
            key={commentId}
            createdAt={moment(createdAt).format("MMM DD YY")}
            author={author}
            content={content}
            type={REPLY_TYPE.DEFAULT}
          />
        ))}
      </Styled.CommentsList>
      {isNotAllCommentsLoaded && <LoadMoreComments onClick={fetchComments}> Load more comments </LoadMoreComments>}
      <Styled.CommentsList>
        {commentsAddedInCurrentSession.map(({ content, createdAt, author, commentId }) => (
          <SingleReply
            key={commentId}
            createdAt={moment(createdAt).format("MMM DD YY")}
            author={author}
            content={content}
            type={REPLY_TYPE.DEFAULT}
          />
        ))}
      </Styled.CommentsList>
    </Styled.Comments>
  );
};

export default Comments;
