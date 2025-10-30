import React, { useRef, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  containerStyle,
  modalStyle,
  buttonStyle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (render && isAnimating) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [render, isAnimating, onClose]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (render && isAnimating) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [render, isAnimating, onClose]);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      const timer = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!render) return null;

  const containerBaseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    backgroundColor: isAnimating ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
    zIndex: 999,
    ...containerStyle,
  };

  const modalBaseStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "12px",
    minWidth: "278px",
    position: "relative",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    transition: "all 0.3s ease-in-out",
    opacity: isAnimating ? 1 : 0,
    transform: isAnimating ? "translateY(0)" : "translateY(20px)",
    ...modalStyle,
  };

  const buttonBaseStyle: React.CSSProperties = {
    position: "absolute",
    top: "8px",
    right: "8px",
    padding: "4px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    outline: "none",
    color: "#9ca3af",
    fontSize: "20px",
    fontWeight: 300,
    transition: "color 0.2s",
    ...buttonStyle,
  };

  return (
    <div style={containerBaseStyle}>
      <div ref={modalRef} style={modalBaseStyle}>
        <button
          onClick={onClose}
          style={buttonBaseStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4b5563")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
