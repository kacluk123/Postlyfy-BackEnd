import * as React from "react";
import * as Styled from "./ButtonStyles";
import * as Types from "./ButtonTypes";
import CircularProgress from "@material-ui/core/CircularProgress";

const ButtonComponent = ({
  children,
  isPending,
  onClick,
  disabled = false,
  type
}: Types.StandardButton) => (
  <Styled.StandardButton
    variant="outlined"
    color="primary"
    disabled={disabled || isPending}
    onClick={onClick}
    type={type ? type : 'button'}
  >
    {isPending ? <CircularProgress /> : children}
  </Styled.StandardButton>
);

export default ButtonComponent;
