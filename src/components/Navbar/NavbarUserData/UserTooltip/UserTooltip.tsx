import * as React from 'react';
import * as Styled from './UserTooltipStyles';
import useLogout from '../../../../hooks/useLogout';

const UserTooltip = () => {
  const [logout] = useLogout();
  
  return (
    <Styled.UserTooltip>
      <Styled.UserTooltipSingleOption onClick={logout}>
        Logout
      </Styled.UserTooltipSingleOption>
    </Styled.UserTooltip>
  );
};

export default UserTooltip;