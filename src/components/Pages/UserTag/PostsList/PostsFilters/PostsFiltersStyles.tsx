import styled from 'styled-components';

export const PostsFilters = styled.div.attrs({
  className: 'PostsFilters'
})`
  background: #edecea;
  border-radius: 2px;
  height: 90px;
  margin-top: 10px;
  padding: 15px;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 15px;
  justify-content: center;
`;