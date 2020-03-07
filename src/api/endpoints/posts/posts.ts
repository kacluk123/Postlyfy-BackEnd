import { mainApi } from "../../axios-instances";
import {
  postsUnpacker,
  addPostPacker,
  addCommentPacker,
  singlePostUnpacker,
  commentsUnpacker,
  singleCommentUnpackerPatch
} from "./postsMapper";
import {
  serverMessageUnpacker,
  UIServerMessages
} from "../common/errorDataUnpacker";
import * as Types from "./postsTypes";

const getPostsUrl = () => `/posts/get-posts/`;
const addPostUrl = (tag: string) => `/posts/add-post/${tag}`;
const deletePostUrl = (postId: string) => `/posts/delete-post/${postId}`;
const addCommentUrl = (postId: string) => `/posts/add-comment/${postId}`;
const getCommentsURL = (postId: string) => `/posts/comments/${postId}`;
const toggleLikeUrl = (postId: string) => `/posts/toggle-like/${postId}`;

export const getPosts = async (
  payload: Types.GetPostsPayload
): Promise<Types.UIPostsResponse | UIServerMessages> => {
  try {
    const { data } = await mainApi.get(getPostsUrl(), {
      params: {
        limit: payload.limit,
        offset: payload.offset,
        sorting: payload.sorting
      }
    });

    return postsUnpacker(data);
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
};

export const addPosts = async (
  payload: Types.IAddPostParams,
  tag: string
): Promise<Types.SingleUIPostsResponse> => {
  try {
    const { data } = await mainApi.post<Types.SingleServerPostsResponse>(
      addPostUrl(tag),
      addPostPacker(payload),
      {
        withCredentials: true
      }
    );
    return singlePostUnpacker(data);
  } catch (err) {
    return err;
  }
};

export const deletePost = async (
  postId: string,
): Promise<void> => {
  try {
    await mainApi.delete<Types.SingleServerPostsResponse>(
      deletePostUrl(postId),
      {
        withCredentials: true
      }
    );

  } catch (err) {
    return err;
  }
};

export const addComment = async (
  payload: Types.IAddCommentParams,
  postId: string
) => {
  try {
    const { data } = await mainApi.patch<Types.SingleServerResponseCommentPatch>(
    addCommentUrl(postId), addCommentPacker(payload), {
      withCredentials: true
    });
    return singleCommentUnpackerPatch(data);
  } catch (err) {
    return err;
  }
};

export const getComments = async (
  postId: string,
  payload: Types.IGetCommentsParams,
): Promise<Types.IUIGetComments> => {
  try {
    const { data } = await mainApi.get<Types.IServerGetComments>(getCommentsURL(postId), {
      params: {
        skip: payload.skip,
      }
    });
    return commentsUnpacker(data);
  } catch (err) {
    return err;
  }
};

export const toggleLike = async (
  postId: string,
) => {
  try {
    await mainApi.post(toggleLikeUrl(postId), {elo: "siema"}, {
      withCredentials: true
    });
  } catch {
    console.log('error');
  }
}