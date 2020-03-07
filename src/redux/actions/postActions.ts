import {
  UIPostsResponse,
  SingleUIPostsResponse,
  UIResponseCommentPatch,
  IUIGetComments,
} from "../../api/endpoints/posts/postsTypes";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";

export enum POSTS_ACTIONS_NAMES {
  FETCH_POSTS_PENDING = "FETCH_PRODUCTS_PENDING",
  FETCH_POSTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_POSTS_ERROR = "FETCH_PRODUCTS_ERROR",
  TOGGLE_POST_LIKE = "TOGGLE_POST_LIKE",
  ADD_NEW_POST = "ADD_NEW_POST",
  DELETE_POST = "DELETE_POST",
  ADD_COMMENT_TO_POST = "ADD_COMMENT_TO_POST",
  LOAD_MORE_COMMENTS = "LOAD_MORE_COMMENTS",
  RESET_POSTS = 'RESET_POSTS'
}

export type addPostsTypes = 'initial' | 'loadMore' | 'loadNew';

interface ITogglePostLikePayload {
  postId: string;
  userId: string;
};

export interface IPostsBaseAction {
  type: POSTS_ACTIONS_NAMES;
}

export interface IfetchPostsPending extends IPostsBaseAction {
  type: POSTS_ACTIONS_NAMES.FETCH_POSTS_PENDING;
}

export interface IResetPosts extends IPostsBaseAction {
  type: POSTS_ACTIONS_NAMES.RESET_POSTS;
}

export interface IfetchProductsSuccess extends IPostsBaseAction {
  posts: UIPostsResponse;
  postsModifyType: addPostsTypes;
  type: POSTS_ACTIONS_NAMES.FETCH_POSTS_SUCCESS;
}

export interface IfetchProductsError extends IPostsBaseAction {
  error: UIServerMessages;
  type: POSTS_ACTIONS_NAMES.FETCH_POSTS_ERROR;
}

export interface IaddNewPost extends IPostsBaseAction {
  post: SingleUIPostsResponse;
  type: POSTS_ACTIONS_NAMES.ADD_NEW_POST;
}

export interface IDeletePost extends IPostsBaseAction {
  postId: string;
  type: POSTS_ACTIONS_NAMES.DELETE_POST;
}

export interface IaddNewComment extends IPostsBaseAction {
  comment: UIResponseCommentPatch;
  type: POSTS_ACTIONS_NAMES.ADD_COMMENT_TO_POST;
}

export interface IloadMoreComments extends IPostsBaseAction {
  payload: IUIGetComments;
  type: POSTS_ACTIONS_NAMES.LOAD_MORE_COMMENTS;
}

export interface ITogglePostLike extends IPostsBaseAction {
  payload: ITogglePostLikePayload;
  type: POSTS_ACTIONS_NAMES.TOGGLE_POST_LIKE;
}

export type PostsActions =
  | IfetchPostsPending
  | IfetchProductsSuccess
  | IaddNewPost
  | IfetchProductsError
  | IaddNewComment
  | IloadMoreComments
  | ITogglePostLike
  | IDeletePost
  | IResetPosts;

export function fetchProductsSuccess(
  posts: UIPostsResponse,
  postsModifyType: addPostsTypes,
): IfetchProductsSuccess {
  return {
    type: POSTS_ACTIONS_NAMES.FETCH_POSTS_SUCCESS,
    postsModifyType,
    posts
  };
}

export function fetchProductsPending(): IfetchPostsPending {
  return {
    type: POSTS_ACTIONS_NAMES.FETCH_POSTS_PENDING
  };
}

export function resetPosts(): IResetPosts {
  return {
    type: POSTS_ACTIONS_NAMES.RESET_POSTS
  };
}

export function fetchProductsError(
  error: UIServerMessages
): IfetchProductsError {
  return {
    type: POSTS_ACTIONS_NAMES.FETCH_POSTS_ERROR,
    error
  };
}

export function addNewPost(post: SingleUIPostsResponse): IaddNewPost {
  return {
    type: POSTS_ACTIONS_NAMES.ADD_NEW_POST,
    post
  };
}

export function deletePostAction(postId: string): IDeletePost {
  return {
    type: POSTS_ACTIONS_NAMES.DELETE_POST,
    postId
  };
}

export function addNewComment(comment: UIResponseCommentPatch): IaddNewComment {
  return {
    type: POSTS_ACTIONS_NAMES.ADD_COMMENT_TO_POST,
    comment
  };
}

export function loadMoreComments(payload: IUIGetComments): IloadMoreComments {
  return {
    type: POSTS_ACTIONS_NAMES.LOAD_MORE_COMMENTS,
    payload,
  };
};

export function togglePostLike(payload: ITogglePostLikePayload): ITogglePostLike {
  return {
    type: POSTS_ACTIONS_NAMES.TOGGLE_POST_LIKE,
    payload,
  };
};