import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC 키 누를 시 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "278px",
          maxWidth: "394px",
          maxHeight: "338px",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
        ref={modalRef}
      >
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            padding: "0",
            top: "5px",
            right: "5px",
            width: "20px",
            height: "20px",
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            outline: "none",
            color: "rgba(143, 149, 178, 1)",
          }}
          onClick={onClose}
        >
          &times;
        </button>
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
