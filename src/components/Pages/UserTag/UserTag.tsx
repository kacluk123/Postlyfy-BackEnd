import * as React from "react";
import * as Styled from "./PostStyles";
import TagsList from "./TagsList";

const UserTagComponent = () => {
  return (
    <Styled.UserTag>
      <TagsList />
    </Styled.UserTag>
  );
};

export default UserTagComponent;
