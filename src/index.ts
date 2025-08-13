// Modal Components
export { default as Modal } from "./components/modal/Modal";

// Toast Componets
export { ToastRender } from "./components/toast/ToastRender";
export { createToastInstance as createToast } from "./components/toast/Toast";

// Dropdown Componets

import { useDropdown } from "./components/dropdown/useDropdown";
import {
  Dropdown as DropdownComponent,
  DropdownTrigger,
  DropdownMenu,
} from "./components/dropdown/Dropdown";

// ✅ Dropdown 컴포넌트에 자식 컴포넌트를 연결합니다.
export const Dropdown = Object.assign(DropdownComponent, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
});

export { useDropdown };
