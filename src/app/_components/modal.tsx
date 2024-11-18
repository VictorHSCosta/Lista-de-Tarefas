import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <button
          onClick={onClose}
          style={{
            ...closeButtonStyles,
            color: isHovered ? "#ff4d4d" : "red",
          }}
          aria-label="Fechar modal"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          &times;
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
  position: "relative",
  backgroundColor: "#fafaff",
  padding: "30px",
  borderRadius: "5px",
  width: "400px",
  maxWidth: "90%",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  border: "none",
  fontSize: "24px",
  color: "red",
  cursor: "pointer",
  lineHeight: "1",
  padding: "0",
  transition: "color 0.3s",
};
