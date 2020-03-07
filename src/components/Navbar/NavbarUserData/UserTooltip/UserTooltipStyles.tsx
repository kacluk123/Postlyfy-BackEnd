import styled from 'styled-components';

export const UserTooltip = styled.div.attrs({
  className: 'UserTooltip'
})`
  position: absolute;
  background: #edecea;
  width: 100px;
  right: 0;
  top: calc(100% + 10px);
  border: 1px solid var(--tiny-grey);
`;

export const UserTooltipSingleOption = styled.div.attrs({
  className: 'UserTooltipSingleOption'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 10px;
  opacity: 0.6;
  width: 100%;
  transition: 0.3s ease-in;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;