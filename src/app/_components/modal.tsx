// components/Modal.tsx
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <button onClick={onClose} style={closeButtonStyles}>
          Fechar
        </button>
        {children}
      </div>
    </div>
  );
}

const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyles: React.CSSProperties = {
  backgroundColor: "#FFFDE4",
  padding: "30px",
  borderRadius: "5px",
  width: "400px",
  maxWidth: "90%",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
};
