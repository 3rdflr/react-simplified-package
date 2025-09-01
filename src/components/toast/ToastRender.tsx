// ToastRender.tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toast, createToastInstance } from "./Toast";

const TOAST_CONTAINER_ID = "toast-root";

// ToastItem 컴포넌트의 스타일을 Tailwind로 변경
const ToastItem: React.FC<{ toast: Toast }> = ({ toast: t }) => {
  return <div className="flex flex-row items-center">{t.content}</div>;
};

export const ToastRender = () => {
  const [rootDiv, setRootDiv] = useState<HTMLElement | null>();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastInstance] = useState(() => createToastInstance());

  useEffect(() => {
    let containerElement = document.getElementById(TOAST_CONTAINER_ID);
    if (!containerElement) {
      containerElement = document.createElement("div");
      containerElement.id = TOAST_CONTAINER_ID;
      document.body.appendChild(containerElement);
    }
    setRootDiv(containerElement);

    const disconnect = toastInstance._connect(setToasts);
    return () => {
      disconnect();
      if (containerElement) containerElement.remove();
    };
  }, [toastInstance]);

  if (!rootDiv) return null;

  const reversedToasts = [...toasts].reverse();

  return createPortal(
    // ✅ 포털 루트 컨테이너 스타일을 Tailwind로 변경
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 pointer-events-none z-[500] w-full">
      {reversedToasts.map((t, index) => {
        // ✅ 토스트 개별 아이템의 동적 스타일을 Tailwind 클래스로 계산
        let translateY = 0;
        let scale = 1;
        let opacity = 1;

        if (index === 1) {
          translateY = 10;
          scale = 0.9;
        } else if (index === 2) {
          translateY = 15;
          scale = 0.8;
        } else if (index >= 3) {
          translateY = 20;
          scale = 0.7;
          opacity = 0;
        }

        const zIndex = reversedToasts.length - index;

        // 동적 클래스 문자열 생성
        let dynamicClasses = "";

        // 1. 기본 위치 및 스케일 클래스
        dynamicClasses += `translate-y-[${translateY}px] scale-[${scale}] opacity-[${opacity}]`;

        // 2. 진입/종료 애니메이션 클래스 (기본값을 덮어씁니다)
        if (t.isOpening) {
          dynamicClasses = `
            -translate-y-[50px] scale-[0.8] opacity-0
          `;
        } else if (t.isClosing) {
          dynamicClasses = `
            translate-y-[0px] scale-[0.8] opacity-0
          `;
        }

        return (
          // ✅ 개별 토스트 래퍼의 스타일을 Tailwind로 변경
          <div
            key={t.id}
            className={`
              absolute top-0 left-1/2 -translate-x-1/2
              transition-all duration-300 ease-out pointer-events-auto
              w-fit whitespace-nowrap
              z-[${zIndex}]
              ${dynamicClasses}
            `}
          >
            <ToastItem toast={t} />
          </div>
        );
      })}
    </div>,
    rootDiv
  );
};
