// Toast.ts

import React from "react";

export interface ToastContext {
  isOpening: boolean;
  isClosing: boolean;
  index: number;
  close: () => void;
}

export interface ToastOptions {
  duration?: number;
}

export interface Toast extends ToastOptions {
  id: string;
  isOpening: boolean;
  isClosing: boolean;
  close: () => void;
  content: React.ReactNode;
}

let toasts: Toast[] = [];
let listeners: ((nodes: Toast[]) => void)[] = [];

const renderToasts = () => {
  listeners.forEach((l) => l(toasts));
};

const updateProps = (id: string, updated: Partial<Toast>) => {
  toasts = toasts.map((t) => (t.id === id ? { ...t, ...updated } : t));
  renderToasts();
};

function closeToast(id: string, closeDuration: number) {
  updateProps(id, { isClosing: true });
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    renderToasts();
  }, closeDuration);
}

type ContentType = React.ReactNode | ((str?: string) => React.ReactNode);

export function createToastInstance(
  defaultContent: ContentType = "",
  options: Partial<ToastOptions> = {}
) {
  const createToast = (
    str?: string,
    runtimeOptions?: Partial<ToastOptions>
  ) => {
    const id = `T-${Math.ceil(Math.random() * 100000000)}`;
    const duration = runtimeOptions?.duration ?? options.duration ?? 3000;
    const closeDuration = 200;
    const openDuration = 200;

    const close = () => toastInstance.close(id, closeDuration);

    const finalContent =
      typeof defaultContent === "function"
        ? defaultContent(str)
        : defaultContent;

    const newToast: Toast = {
      id,
      isClosing: false,
      isOpening: true,
      close,
      content: finalContent,
      ...options,
      ...runtimeOptions,
    };

    toasts = [...toasts, newToast];
    renderToasts();

    setTimeout(() => {
      updateProps(id, { isOpening: false });
    }, openDuration);

    if (duration > 0) {
      setTimeout(() => {
        close();
      }, duration);
    }
  };

  const toastInstance = {
    run: (str?: string, runtimeOptions?: Partial<ToastOptions>) =>
      createToast(str, runtimeOptions),

    close: closeToast,

    _connect(setToasts: (nodes: Toast[]) => void) {
      listeners.push(setToasts);
      setToasts(toasts);
      return () => {
        listeners = listeners.filter((l) => l !== setToasts);
      };
    },
  };

  return toastInstance;
}
