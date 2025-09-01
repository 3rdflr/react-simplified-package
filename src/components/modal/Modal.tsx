// Modal.tsx (Tailwind CSS 전용)

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

  // 컴포넌트 내부에서 Tailwind 클래스를 정의하고 외부 클래스와 결합합니다.
  const baseContainerClasses = `
    fixed inset-0 flex items-center justify-center z-[999] 
    transition-colors duration-300
    ${isAnimating ? "bg-black/50" : "bg-black/0"}
  `;

  const baseModalClasses = `
    p-5 rounded-xl min-w-[278px] relative shadow-lg bg-white
    transition-all duration-300 ease-in-out
    ${isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
  `;

  const baseButtonClasses = `
    flex items-center justify-center absolute top-2 right-2 
    p-1 bg-transparent border-none cursor-pointer outline-none 
    text-gray-400 hover:text-gray-600
    text-2xl font-light
  `;

  return (
    <div className={`${baseContainerClasses} ${containerClassName}`}>
      <div className={`${baseModalClasses} ${modalClassName}`} ref={modalRef}>
        <button
          className={`${baseButtonClasses} ${buttonClassName}`}
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
