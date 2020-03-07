import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const StandardButton = styled(Button).attrs({
  className: "StandardButton"
})`
  && {
    background: white;
    cursor: pointer;

    &:hover {
      background: var(--tiny-grey);
    }
  }
`;
