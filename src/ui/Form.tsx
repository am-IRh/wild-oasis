import styled, { css } from "styled-components";

interface FormType {
  type?: string;
}

const Form = styled.form<FormType>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 3rem 4rem;
      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
