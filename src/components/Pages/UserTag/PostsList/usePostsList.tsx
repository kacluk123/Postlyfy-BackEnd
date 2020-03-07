import * as React from 'react';
import { getSorting, getSortingType } from '../../../../redux/reducers/postsFilterReducer';
import { resetPosts } from '../../../../redux/actions/postActions';
import { useSelector, useDispatch } from "react-redux";
import useWindowScroll from "../../../../hooks/useWindowScroll";
import { MAIN_API_URL } from '../../../../api/axios-instances';
import openSocket from 'socket.io-client';
import fetchPostsTHUNK from "../../../../redux/async/fetchPosts";
import {
  getPosts,
  getTotalPosts
} from "../../../../redux/reducers/postReducer";
import usePostsFilter from '../Common/usePostsFilter';

interface IPostsSocketIoData {
  action: 'create';
  getTotalNumberOfPostsInTag: number;
  serverTag: string;
}

const usePostsList = () => {
  const sorting = useSelector(getSorting);
  const localTotalPostCount = useSelector(getTotalPosts);
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  const isMaxScroll = useWindowScroll();
  const sortingType = useSelector(getSortingType);
  const [serverTotalPostCount, setServerTotalPostCount] = React.useState<number>(0);
  const [onScrollPending, setOnScrollPending] = React.useState<boolean>(false);
  const { sortPostInitialByTag } = usePostsFilter();
  const postListCountDifference = serverTotalPostCount - localTotalPostCount;

  const onTagPostLoad = (tag: string) => {
    setServerTotalPostCount(0);
    const socket = openSocket(MAIN_API_URL);
    const socketCallback = (data: IPostsSocketIoData) => {
      if (data.action === 'create' && data.serverTag === tag) {
        setServerTotalPostCount(data.getTotalNumberOfPostsInTag);
      }
    };

    socket.on('posts', socketCallback);
    sortPostInitialByTag(tag);
    return () => {
      socket.off('posts', socketCallback);
      dispatch(resetPosts());
    };
  };

  const onSortingChange = () => {
    setServerTotalPostCount(0);
    dispatch(
      fetchPostsTHUNK({
        offset: 0,
        limit: 10,
        postsModifyType: 'initial',
        sorting: {
          match: sorting.match,
          sort: sorting.sort
        },
      })
    );
  };

  const onMaxScroll = () => {
    if (isMaxScroll && posts.length !== localTotalPostCount) {

      setOnScrollPending(true);
      try {
          dispatch(
            fetchPostsTHUNK({
              limit: 10,
              offset: posts.length,
              postsModifyType: 'loadMore',
              sorting
            })
          );
      } finally {
        setOnScrollPending(false);
      }
    }
  };

  const LoadMorePosts = (tag: string) => {
    if (sortingType === 'newest') {
      dispatch(
        fetchPostsTHUNK({
          limit: postListCountDifference,
          offset: 0,
          postsModifyType: 'loadNew',
          sorting
        })
      );
    } else {
      sortPostInitialByTag(tag);
    }
  };
  
  return {
    LoadMorePosts,
    onTagPostLoad,
    onSortingChange,
    onMaxScroll,
    onScrollPending,
    postListCountDifference
  };
};

export default usePostsList;