import styled from "styled-components";

export const App = styled.div.attrs({
  className: "App"
})`
  display: grid;
  grid-template-rows: 50px;
  background: var(--dark);
`;

export const AppContent = styled.div.attrs({
  className: "AppContent"
})`
  width: 100%;
`;
