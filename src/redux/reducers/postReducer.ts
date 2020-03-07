import { POSTS_ACTIONS_NAMES, PostsActions } from "../actions/postActions";
import { SingleUIPostsResponse, UIResponseComment } from "../../api/endpoints/posts/postsTypes";
import { UIServerMessages } from "../../api/endpoints/common/errorDataUnpacker";
import { AppState } from '../store';
import { addPostsTypes } from '../actions/postActions';

interface InitialStateType {
  readonly pending: boolean;
  readonly posts: SingleUIPostsResponse[];
  readonly errors: UIServerMessages["messages"] | null;
  readonly totalNumberOfPosts: number;
}

export const initialState = {
  pending: false,
  posts: [],
  errors: null,
  totalNumberOfPosts: 0
};

const modifyPost = ({
  posts,
  postId,
  element,
  callback
}: {
  posts: SingleUIPostsResponse[],
  postId: string,
  element: any,
  callback: (post: SingleUIPostsResponse, element: any) => SingleUIPostsResponse
}) => {
  return posts.map((post: SingleUIPostsResponse) => {
    if (post.postId !== postId) {
      return post;
    }

    return callback(post, element);
  });
};

const addNewComment = (otherProps: SingleUIPostsResponse, commentsData: UIResponseComment): SingleUIPostsResponse => ({
  ...otherProps,
  commentsAddedInCurrentSession: [...otherProps.commentsAddedInCurrentSession, commentsData]
});

const replacePostComments = (otherProps: SingleUIPostsResponse, commentsData: UIResponseComment[]): SingleUIPostsResponse => ({
  ...otherProps,
  commentsAddedInCurrentSession: [],
  comments: commentsData,
});

const toggleLike = (post: SingleUIPostsResponse, userId: string): SingleUIPostsResponse => {
  const isPostLikedByUser = post.likes.includes(userId);

  return {
    ...post,
    likesCount: isPostLikedByUser ? post.likesCount - 1 : post.likesCount + 1,
    likes: isPostLikedByUser ? post.likes.filter((id: string) => id !== userId) : [...post.likes, userId]
  };
};

const addPosts = ({
  oldPosts,
  newPosts,
  type
}: {
  oldPosts: SingleUIPostsResponse[],
  newPosts: SingleUIPostsResponse[],
  type: addPostsTypes,
}) => ({
  initial: newPosts,
  loadMore: [...oldPosts, ...newPosts],
  loadNew: [...newPosts, ...oldPosts],
}[type]);

export function postsReducer(
  state: InitialStateType = initialState,
  action: PostsActions
) {
  switch (action.type) {
    case POSTS_ACTIONS_NAMES.FETCH_POSTS_PENDING: {
      return {
        ...state,
        pending: false
      };
    }

    case POSTS_ACTIONS_NAMES.FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        pending: false,
        posts: addPosts({
          oldPosts: state.posts,
          newPosts: action.posts.postsList,
          type: action.postsModifyType
        }),
        totalNumberOfPosts: action.posts.totalNumberOfPosts
      };
    }

    case POSTS_ACTIONS_NAMES.RESET_POSTS: {
      return {
        ...state,
        posts: [],
        totalNumberOfPosts: 0,
      };
    }

    case POSTS_ACTIONS_NAMES.ADD_NEW_POST: {
      return {
        ...state,
        posts: [action.post, ...state.posts]
      };
    }

    case POSTS_ACTIONS_NAMES.DELETE_POST: {
      return {
        ...state,
        posts: [...state.posts].filter((post: SingleUIPostsResponse) => post.postId !== action.postId),
      };
    }

    case POSTS_ACTIONS_NAMES.ADD_COMMENT_TO_POST: {
      return {
        ...state,
        posts: modifyPost({
          element: action.comment.comment,
          postId: action.comment.comment.postId,
          posts: state.posts,
          callback: addNewComment
        })
      };
    }

    case POSTS_ACTIONS_NAMES.LOAD_MORE_COMMENTS: {
      return {
        ...state,
        posts: modifyPost({
          element: action.payload.comments,
          postId: action.payload.postId,
          posts: state.posts,
          callback: replacePostComments
        })
      };
    }

    case POSTS_ACTIONS_NAMES.FETCH_POSTS_ERROR: {
      return {
        ...state,
        pending: false,
        errors: action.error.messages
      };
    }

    case POSTS_ACTIONS_NAMES.TOGGLE_POST_LIKE: {
      return {
        ...state,
        posts: modifyPost({
          element: action.payload.userId,
          postId: action.payload.postId,
          posts: state.posts,
          callback: toggleLike,
        })
      };
    }

    default: {
      return state;
    }
  }
}

export const getPosts = (state: AppState) => state.postsReducer.posts;
export const getTotalPosts = (state: AppState) => state.postsReducer.totalNumberOfPosts;
export const getPostsPending = (state: AppState) => state.postsReducer.pending;
export const getPostsError = (state: AppState) => state.postsReducer.errors;
