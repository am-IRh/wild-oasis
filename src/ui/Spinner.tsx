import styled, { css, keyframes } from "styled-components";

interface SpinnerProps {
  type?: "big" | "normal" | "small";
}

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div<SpinnerProps>`
  margin: 4.8rem auto;
  ${(props) =>
    props.type === "small" &&
    css`
      width: 3.4rem;
    `}

  ${(props) =>
    props.type === "normal" &&
    css`
      width: 6.4rem;
    `}

    ${(props) =>
    props.type === "big" &&
    css`
      width: 9.4rem;
    `}
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

Spinner.defaultProps = { type: "normal" };

export default Spinner;
