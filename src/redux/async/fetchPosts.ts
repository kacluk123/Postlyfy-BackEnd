import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
  addPostsTypes
} from "../actions/postActions";

import { getPosts } from "../../api/endpoints/posts/posts";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  isApiResonseHasError
} from "../../api/endpoints/common/errorDataUnpacker";
import { ISingleMatch } from '../reducers/postsFilterReducer';

interface FetchPostsParams {
  offset: number;
  limit: number;
  postsModifyType: addPostsTypes;
  sorting: {
    sort: string[] | null
    match: ISingleMatch[] | null
  };
}

export const fetchPosts = ({
  offset,
  limit,
  postsModifyType,
  sorting
}: FetchPostsParams): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    if (postsModifyType === 'initial') {
      dispatch(fetchProductsPending());
    }
    const data = await getPosts({ offset, limit, sorting });
    
    if (isApiResonseHasError(data)) {
      dispatch(fetchProductsSuccess(data, postsModifyType));
    } else {
      dispatch(fetchProductsError(data));
    }
  };
};

export default fetchPosts;
