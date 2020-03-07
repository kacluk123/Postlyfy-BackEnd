import styled from "styled-components";

export const Comments = styled.div.attrs({
  className: "Comments",
})`
  grid-area: Comments;
  width: 100%;
  @media (max-width: 500px) {
    padding-left: 15px;
  }
`;

export const CommentsInput = styled.div.attrs({
  className: "CommentsInput",
})`
  width: 100%;
  margin-top: 30px;
  background: var(--grey-special);
  display: grid;
  padding: 15px;
  grid-row-gap: 10px;
  grid-template-rows: auto 50px;

  & {
    textarea {
      resize: vertical;
    }
  }
`;

export const CommentsList = styled.div.attrs({
  className: "CommentsList"
})`
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
`;