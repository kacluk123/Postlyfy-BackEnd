import styled, { css } from 'styled-components';

export const SinglePostFilter = styled.div.attrs({
  className: 'SinglePostFilter'
})`
  height: 50px;
  width: 100px;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: .1s ease;
  opacity: .5 color;
  color: var(--medium-grey);
  ${(props: { isFilterActive: boolean }) => props.isFilterActive && css`
    background: var(--red-orange);
    color: white;
    svg {
      color: white;
    }
  `}
  ${(props: { isFilterActive: boolean }) => !props.isFilterActive && css`
    & {
      :hover {
        color: var(--red-orange);
        box-shadow: 0px 0px 9px 0px var(--tiny-grey);
        svg {
          color: rgba(0, 0, 0, 0.54);
        }
      }
    }
  `}
`;

export const PostFilterContent = styled.div.attrs({
  className: 'PostFilterContent'
})`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
`;

export const PostFilterText = styled.div.attrs({
  className: 'PostFilterText'
})``;

export const PostFilterIconContainer = styled.div.attrs({
  className: 'PostFilterIconContainer'
})`
  display: flex;
  align-items: center;
`;
