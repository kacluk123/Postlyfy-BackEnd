import * as React from 'react';
import * as Styled from './NavbarUserDataStyles';
import * as Icon from "../../Common/Icons/Icons";
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from 'react-redux';
import UserTooltip from './UserTooltip';

const NavbarUserData = () => {
  const userData = useSelector(getUser);
  const [isUserTooltipVisible, setUserTooltipVisibility] = React.useState<boolean>(false);
  const toggleUserPopup = React.useCallback(() => {
    setUserTooltipVisibility((isVisible: boolean) => !isVisible);
  }, []);

  return (
    <Styled.NavbarUserData>
      <Styled.NavbarUserDataUserName>
        {userData?.name}
      </Styled.NavbarUserDataUserName>
      <Styled.NavbarUserDataUserAvatarContainer onClick={toggleUserPopup}>
        {userData?.userPicture
          ? <Styled.NavbarUserDataUserAvatar src={userData.userPicture} />
          : <Icon.User height='36px' width='36px' />}
          {isUserTooltipVisible && <UserTooltip />}
      </Styled.NavbarUserDataUserAvatarContainer>
    </Styled.NavbarUserData>
  );
};

export default NavbarUserData;