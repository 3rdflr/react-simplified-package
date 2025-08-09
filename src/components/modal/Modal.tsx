import React, { useRef, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerClassName?: string;
  modalClassName?: string;
  buttonClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  containerClassName,
  modalClassName,
  buttonClassName,
}) => {
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

  const modalAnimation: React.CSSProperties = {
    transform: isAnimating ? "translateY(0)" : "translateY(20px)",
    opacity: isAnimating ? 1 : 0,
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  };

  const customModalStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "10px",
    minWidth: "278px",
    position: "relative",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    ...modalAnimation,
  };

  const defaultModalStyle: React.CSSProperties = {
    background: "white",
    ...customModalStyle,
  };

  const customButtonStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    padding: "0",
    background: "none",
    border: "none",
    cursor: "pointer",
    outline: "none",
  };

  const defaultButtonStyle: React.CSSProperties = {
    top: "10px",
    right: "10px",
    minWidth: "20px",
    minHeight: "20px",
    fontSize: "20px",
    color: "rgba(143, 149, 178, 1)",
    ...customButtonStyle,
  };

  return (
    <div
      className={containerClassName}
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
        background: isAnimating ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
      }}
    >
      <div
        // modalClassName이 있을 때만 className을 적용하고, 없을 때는 style을 사용합니다.
        className={modalClassName}
        style={
          modalClassName ? { ...customModalStyle } : { ...defaultModalStyle }
        }
        ref={modalRef}
      >
        <button
          className={buttonClassName}
          style={
            buttonClassName
              ? { ...customButtonStyle }
              : { ...defaultButtonStyle }
          }
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
