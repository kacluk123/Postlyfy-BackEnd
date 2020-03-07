import * as React from "react";
import * as Styled from "./StandardTextAreaStyles";
import * as Types from "./StandardTextAreaTypes";

const StandardTextArea = ({ ...props }: Types.StandardTextArea) => {
  const { textAreaRef = null, ...otherProps } = props;
  return <Styled.StandardTextArea {...otherProps} ref={textAreaRef}/>;
};

export default React.memo(StandardTextArea);
