// ToastRender.tsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toast, createToastInstance } from "./Toast";

const TOAST_CONTAINER_ID = "toast-root";

const ToastItem: React.FC<{ toast: Toast }> = ({ toast: t }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {t.content}
    </div>
  );
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
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 500,
        width: "100%",
      }}
    >
      {reversedToasts.map((t, index) => {
        // ✅ 뒤집힌 배열을 사용
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

        const enteringStyle = t.isOpening
          ? {
              transform: `translateX(-50%) translateY(-50px) scale(0.8)`,
              opacity: 0,
            }
          : {};

        const closingStyle = t.isClosing
          ? {
              transform: `translateX(-50%) translateY(0px) scale(0.8)`,
              opacity: 0,
            }
          : {};

        return (
          <div
            key={t.id}
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
              transition: "all 0.3s ease-out",
              pointerEvents: "auto",
              opacity,
              zIndex,
              width: "fit-content",
              whiteSpace: "nowrap",
              ...enteringStyle,
              ...closingStyle,
            }}
          >
            <ToastItem toast={t} />
          </div>
        );
      })}
    </div>,
    rootDiv
  );
};
