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

export { useDropdownContext } from "./components/dropdown/DropdownContext";

export const Dropdown = Object.assign(DropdownComponent, {
  Trigger: DropdownTrigger,
  Menu: DropdownMenu,
});

export { useDropdown };
