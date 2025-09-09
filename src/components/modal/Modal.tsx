"use client";

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
  containerClassName = "",
  modalClassName = "",
  buttonClassName = "",
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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [render, isAnimating, onClose]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (render && isAnimating) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [render, isAnimating, onClose]);

  // 모달 가시성 & 애니메이션 제어
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

  // 모달 열리면 body 스크롤 제한
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 모달 내부 스크롤 제한 (wheel 이벤트)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!modalRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
      const delta = e.deltaY;

      if (scrollTop === 0 && delta < 0) e.preventDefault();
      else if (scrollTop + clientHeight >= scrollHeight && delta > 0)
        e.preventDefault();
    };

    if (isOpen) {
      document.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  if (!render) return null;

  const baseContainerClasses = `
    fixed inset-0 flex items-center justify-center z-[999] 
    transition-colors duration-300
    ${isAnimating ? "bg-black/50" : "bg-black/0"}
    ${containerClassName}
  `;

  const baseModalClasses = `
    p-5 rounded-xl min-w-[278px] max-h-[80vh] overflow-y-auto relative shadow-lg bg-white
    transition-all duration-300 ease-in-out
    ${isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
    ${modalClassName}
  `;

  const baseButtonClasses = `
    flex items-center justify-center absolute top-2 right-2 
    p-1 bg-transparent border-none cursor-pointer outline-none 
    text-gray-400 hover:text-gray-600
    text-2xl font-light
    ${buttonClassName}
  `;

  return (
    <div className={baseContainerClasses}>
      <div
        className={baseModalClasses}
        ref={modalRef}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <button className={baseButtonClasses} onClick={onClose}>
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
