import styled from "styled-components";

export const Register = styled.div.attrs({
  className: "Register"
})`
  width: 300px;
  height: 600px;
  display: grid;
  grid-auto-rows: 65px;
  padding: 15px;
  border-radius: 5px;
  grid-row-gap: 30px;
  background: var(--medium-grey);
`;

export const RegisterServerMessages = styled.div.attrs({
  className: "RegisterServerMessages"
})`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const RegisterContainer = styled.div.attrs({
  className: "RegisterContainer"
})`
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
