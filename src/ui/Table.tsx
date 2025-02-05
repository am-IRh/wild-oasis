import type { FC, ReactNode } from "react";

import { createContext, useContext, useMemo } from "react";
import styled from "styled-components";

import type { CabinType } from "../service/apiCabins";

interface CommonRowProps {
  columns: string;
}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.header<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableContextValue {
  columns: string;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

interface TableProps {
  columns: string;
  children: ReactNode;
}

const Table: FC<TableProps> & {
  Header: FC<TableSectionProps>;
  Row: FC<TableSectionProps>;
  Body: FC<BodyProps>;
  Footer: typeof Footer;
} = ({ columns, children }) => {
  const value = useMemo(() => ({ columns }), [columns]);
  return (
    <TableContext.Provider value={value}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

interface TableSectionProps {
  children: ReactNode;
}

const Header: FC<TableSectionProps> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within a Table");
  }
  const { columns } = context;
  return (
    <StyledHeader columns={columns} role="row">
      {children}
    </StyledHeader>
  );
};

const Row: FC<TableSectionProps> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within a Table");
  }
  const { columns } = context;
  return (
    <StyledRow columns={columns} role="row">
      {children}
    </StyledRow>
  );
};

interface BodyProps {
  data: CabinType[];
  render: (cabin: CabinType) => ReactNode;
}

const Body: FC<BodyProps> = ({ data, render }) => {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
