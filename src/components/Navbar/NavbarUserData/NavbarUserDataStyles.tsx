import styled from 'styled-components';

export const NavbarUserData = styled.div.attrs({
  className: 'NavbarUserData'
})`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 15px;
  align-items: center;
`;

export const NavbarUserDataUserName = styled.div.attrs({
  className: 'NavbarUserDataUserName'
})`
  color: var(--red-orange);
`;

export const NavbarUserDataUserAvatarContainer = styled.div.attrs({
  className: 'NavbarUserDataUserAvatarContainer'
})`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  background: var(--dark);
  cursor: pointer;
  justify-content: center;
  position: relative;
  align-items: center;
  object-fit: contain;
`;

export const NavbarUserDataUserAvatar = styled.img.attrs({
  className: 'NavbarUserDataUserAvatar'
})`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;