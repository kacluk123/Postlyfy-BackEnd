import styled from "styled-components";

export const Loader = styled.div.attrs({
  className: "Loader"
})`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border-top: 2px solid white;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
`;
