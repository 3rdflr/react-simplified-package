// DropdownContext.ts

import { createContext, useContext } from "react";
import { useDropdown } from "./useDropdown";

// `useDropdown` 훅의 반환 타입을 Context의 값으로 사용합니다.
export const DropdownContext = createContext<
  ReturnType<typeof useDropdown> | undefined
>(undefined);

// Context를 사용하기 위한 커스텀 훅
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "Dropdown.Trigger and Dropdown.Menu must be used within a <Dropdown> component."
    );
  }
  return context;
};
