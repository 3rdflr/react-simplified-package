import React, { useRef, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

    if (render && isAnimating) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [render, isAnimating, onClose]);

  // ESC 키 누를 시 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (render && isAnimating) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [render, isAnimating, onClose]);

  // 모달 가시성 및 애니메이션 제어
  useEffect(() => {
    if (isOpen) {
      setRender(true);
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!render) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        transition: "background-color 0.3s ease-in-out",
        backgroundColor: isAnimating ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "278px",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          transform: isAnimating ? "translateY(0)" : "translateY(20px)",
          opacity: isAnimating ? 1 : 0,
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
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
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
