import styled, { css } from "styled-components";

export const ServerMessageViewList = styled.ul.attrs({
  className: "ServerMessageViewList"
})`
  list-style: none;
  padding: 0;
`;

export const ServerMessageSingleMessage = styled.li.attrs({
  className: "ServerMessageSingleMessage"
})`
  ${(props: { isError: boolean }) =>
    props.isError &&
    css`
      color: var(--red-orange);
    `}

  ${(props: { isError: boolean }) =>
    !props.isError &&
    css`
      color: var(--green);
    `}
`;
