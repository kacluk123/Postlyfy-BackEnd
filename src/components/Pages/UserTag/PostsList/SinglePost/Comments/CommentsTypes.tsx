import { UIResponseComment } from "../../../../../../api/endpoints/posts/postsTypes";

export interface IComments {
  isCommentInputShowed: boolean;
  postId: string;
  comments: UIResponseComment[];
  commentsAddedInCurrentSession: UIResponseComment[];
  hideCommentInput: () => void;
  totalComments: number;
}
