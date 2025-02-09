import styled from "styled-components";

interface StyledSelectProps {
  type?: "default" | "white";
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) => (props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)")};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export interface SortByOptionType {
  value: string;
  label: string;
}

interface SelectProps {
  options: SortByOptionType[];
  value: string;
  type?: "default" | "white";
  onChange: (e: any) => void;
}

export const Select = ({ options, value, onChange, ...props }: SelectProps): JSX.Element => {
  return (
    <StyledSelect value={value} {...props} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};
