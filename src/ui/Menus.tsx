import type { FC, ReactNode } from "react";

import { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

// Styled Components
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface Position {
  x: number;
  y: number;
}

const StyledList = styled.ul<{ $position: Position }>`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// Context definition
interface MenusContextType {
  openId: number | string;
  open: (id: number | string) => void;
  close: () => void;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

const MenusContext = createContext<MenusContextType | undefined>(undefined);

// Menus component props type
interface MenusProps {
  children: ReactNode;
}

// Main Menus component
const Menus: FC<MenusProps> & {
  Toggle: typeof Toggle;
  List: typeof List;
  Button: typeof Button;
  Menu: typeof Menu;
} = ({ children }) => {
  const [openId, setOpenId] = useState<number | string>("");
  const [position, setPosition] = useState<Position | null>(null);

  const open = (id: number | string) => setOpenId(id);
  const close = () => setOpenId("");

  const contextValue = useMemo(
    () => ({ openId, open, close, position, setPosition }),
    [openId, position]
  );

  return <MenusContext.Provider value={contextValue}>{children}</MenusContext.Provider>;
};

// Toggle component
interface ToggleProps {
  id: number | string;
}
interface HandleClickEvent extends React.MouseEvent<HTMLButtonElement> {
  target: EventTarget & HTMLButtonElement;
}

function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a Menus provider");
  }
  const { openId, open, close, setPosition } = context;

  function handleClick(e: HandleClickEvent) {
    const rect = e.target.closest("button")!.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    // Toggle open/close logic
    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// List component
interface ListProps {
  id: number | string;
  children: ReactNode;
}

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("List must be used within a Menus provider");
  }
  const { openId, position } = context;

  if (openId !== id || !position) return null;

  return createPortal(<StyledList $position={position}>{children}</StyledList>, document.body);
}

// Button component
interface ButtonProps {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
}

function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Button must be used within a Menus provider");
  }
  const { close } = context;
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Attaching static properties to Menus component
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
