import type { ReactNode } from "react";

import { createContext, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  border: 1px solid black;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

interface ModalContextType {
  open: (name: string) => void;
  close: () => void;
  openName: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  const contextValue = useMemo(() => ({ open, close, openName }), [openName]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}

interface OpenProps {
  opens: string;
  children: (props: { onClick: () => void }) => ReactNode;
}

function Open({ opens, children }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within a Modal");

  const { open } = context;

  return <>{children({ onClick: () => open(opens) })}</>;
}
interface WindowProps {
  name: string;
  children: (props: { onCloseModal: () => void }) => ReactNode;
}

function Window({ name, children }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Window must be used within a Modal");
  const { close, openName } = context;

  if (openName !== name) return null;
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{children({ onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
