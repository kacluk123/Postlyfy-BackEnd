import * as React from "react";
import * as Styled from "./NavbarStyles";
import * as types from "./NavbarTypes";
import { isAuth } from '../../redux/reducers/userReducer';
import { useSelector } from 'react-redux';
import NavbarUserData from './NavbarUserData';

const routes: types.RouteTypes = {
  HOME: "/posts",
  REGISTER: "/register",
  LOGIN: "/login"
};

const Navbar = () => {
  const isUserAuth = useSelector(isAuth);

  return (
    <Styled.Navbar>
      <Styled.NavbarLink to={routes.HOME}>
        Posts
      </Styled.NavbarLink>
      <Styled.LinksGroup>
        {isUserAuth
          ? <NavbarUserData />
          : (
            <React.Fragment>
              <Styled.NavbarLink
                to={routes.LOGIN}
                data-testid="loginPage"
              >
                Login
              </Styled.NavbarLink>
              <Styled.NavbarLink
                to={routes.REGISTER}
              >
                Register
              </Styled.NavbarLink>
            </React.Fragment>
        )}
      </Styled.LinksGroup>
    </Styled.Navbar>
  );
};

export default Navbar;
