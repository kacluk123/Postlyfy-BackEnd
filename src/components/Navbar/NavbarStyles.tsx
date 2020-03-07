import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const activeRouteorHoveredStyles = css`
  &:after {
    content: "";
    position: absolute;
    width: calc(100% + 10px);
    height: 2px;
    animation: LineWidth 0.1s linear;
    background: var(--red-orange);
    left: -5px;
    top: -5px;
  }

  &:before {
    content: "";
    position: absolute;
    width: calc(100% + 10px);
    height: 2px;
    animation: LineWidth 0.1s linear;
    background: var(--red-orange);
    bottom: -5px;
    right: -5px;
  }
`;

export const Navbar = styled.div.attrs({
  className: "Navbar"
})`
  padding: 0 10px;
  background: white;
  height: 60px;
  display: flex;
  border-bottom: 1px solid var(--color-white);
  align-items: center;
  justify-content: space-between;
`;

export const LinksGroup = styled.div.attrs({
  className: "NavbarLink"
})`
  display: grid;
  grid-column-gap: 30px;
  grid-auto-flow: column;
`;

const activeClassName = 'NavbarLinkActive';

export const NavbarLink = styled(NavLink).attrs({
  className: "NavbarLink",
  activeClassName,
})`
  color: var(--color-white);
  text-decoration: none;
  font-size: 18px;
  position: relative;

  @keyframes LineWidth {
    0% {
      width: 0;
    }

    100% {
      width: calc(100% + 10px);
    }
  }

  &.${activeClassName} {
    ${activeRouteorHoveredStyles}
  }

  &:hover {
    ${activeRouteorHoveredStyles}
  }
`;
