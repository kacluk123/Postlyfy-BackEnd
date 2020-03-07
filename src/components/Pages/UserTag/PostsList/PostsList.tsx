
import * as React from "react";
import * as Styled from "./PostsListStyled";
import Loader from "../../../Common/Loader";
import SinglePost from "./SinglePost";
import useWindowScroll from "../../../../hooks/useWindowScroll";
import PostInput from "../PostInput";
import usePostsList from './usePostsList';
import PostsFilters from './PostsFilters';
import { useParams } from "react-router";
import { getSorting } from '../../../../redux/reducers/postsFilterReducer';
import { useSelector } from "react-redux";
import {
  getPosts,
  getPostsPending,
} from "../../../../redux/reducers/postReducer";

const PostsListComponent = () => {
  const posts = useSelector(getPosts);
  const pending = useSelector(getPostsPending);
  const sorting = useSelector(getSorting);
  const isMaxScroll = useWindowScroll();
  const { tag } = useParams<{tag: string}>();
  const {
    LoadMorePosts,
    onSortingChange,
    onTagPostLoad,
    onMaxScroll,
    onScrollPending,
    postListCountDifference
  } = usePostsList();

  React.useEffect(() => {
    onTagPostLoad(tag);
  }, [tag]);

  React.useEffect(() => {
    onSortingChange();
  }, [sorting]);

  React.useEffect(onMaxScroll, [isMaxScroll]);

  const postsList = posts.map(
    ({
      postId,
      ...params
    }) => (
      <SinglePost
        key={postId}
        postId={postId}
        {...params}
      />
    )
  );
  
  if (pending) {
    return <Loader />;
  }

  return (
    <Styled.Posts>
      <Styled.PostsListContainer>
        <PostInput tag={tag} />
        <PostsFilters />
        {postListCountDifference > 0 && <Styled.LoadMorePosts onClick={() => { LoadMorePosts(tag)}}>
          <Styled.PostsListNewPostsCount>
          {postListCountDifference}&nbsp;
          </Styled.PostsListNewPostsCount>incoming posts. Click here to load.
        </Styled.LoadMorePosts>}
        <Styled.PostsList>
          {postsList}
          {onScrollPending && <Loader />}
        </Styled.PostsList>
      </Styled.PostsListContainer>
    </Styled.Posts>
  );
};

export default PostsListComponent;
