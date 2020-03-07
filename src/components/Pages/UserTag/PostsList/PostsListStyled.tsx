import styled from "styled-components";

export const Posts = styled.div.attrs({
  className: "Posts"
})`
  width: 100%;
  min-height: calc(100vh - 50px);
  max-height: auto;
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  @media (max-width: 1040px) {
    & {
      padding: 20px;
    }
  }
`;

export const PostsList = styled.div.attrs({
  className: "PostsList"
})`
  margin-top: 50px;
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
  height: auto;
  transition: .5s ease-out;
`;

export const PostsListContainer = styled.div.attrs({
  className: "PostsListContainer"
})`
  width: 1000px;
  @media (max-width: 1040px) {
    & {
      width: 100%;
    }
  }
`;

export const PostsListNewPostsCount = styled.div.attrs({
  className: "PostsListNewPostsCount"
})`
  color: var(--red-orange);
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

export const LoadMorePosts = styled.div.attrs({
  className: "LoadMorePosts"
})`
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

  animation: slide-fwd-bottom 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  width: 100%;
  border-radius: 2px;
  margin-top: 20px;
  height: 50px;
  background: #edecea;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .3s;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    display: block;
    background: var(--red-orange);
    width: 0;
    z-index: -1;
    height: 100%;
    transition: width .3s;
    bottom: 0;
  }

  &:hover {
    color: #edecea;
    &:after {
      width: 100%;
      transition: width .3s;
    }
    .PostsListNewPostsCount {
      color: var(--dark);
    }
  }
`;
