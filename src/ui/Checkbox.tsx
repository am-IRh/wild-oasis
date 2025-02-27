import type { ReactNode } from "react";

import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

interface CheckboxPropsType {
  checked: boolean;
  disabled?: boolean;
  id: string;
  children: ReactNode;
  onChange: () => void;
}
function Checkbox({ checked, onChange, disabled = false, id, children }: CheckboxPropsType) {
  return (
    <StyledCheckbox>
      <input checked={checked} disabled={disabled} id={id} type="checkbox" onChange={onChange} />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
