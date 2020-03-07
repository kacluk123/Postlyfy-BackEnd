import styled from "styled-components";
import { Link } from "react-router-dom";

export const TagsList = styled.div.attrs({
  className: "TagsList"
})`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TagsListElements = styled.div.attrs({
  className: "TagsListElements"
})`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const TagsText = styled.div.attrs({
  className: 'TagsText'
})`
  margin-top: 15px;
  font-size: 16px;
  color: white;
`

export const MostActive = styled.div.attrs({
  className: 'MostActive'
})`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  align-items: center;

  & {
    .MuiSelect-selectMenu {
      font-size: 16px;
      color: white;
      margin-top: 16px;
    }

    .MuiSelect-icon {
      color: var(--medium-grey);
    }

    .MuiInput-underline {
      &:before {
        border-bottom: 1px solid var(--medium-grey);
      }
    }
  }
`

export const HashtagLink = styled(Link).attrs({
  className: "HashtagLink"
})`
  color: #3f51b5;
  font-size: 35px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const TagForm = styled.form.attrs({
  className: 'TagForm'
})`
  width: 300px;
  height: 200;
  grid-auto-rows: max-content;
  display: grid;
  padding: 15px;
  border-radius: 5px;
  grid-row-gap: 30px;
  background: var(--medium-grey);
`;