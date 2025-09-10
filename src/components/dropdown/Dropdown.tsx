// Dropdown.tsx

import React, { useRef, useEffect, useState } from "react";
import { DropdownContext, useDropdownContext } from "./DropdownContext";
import { useDropdown } from "./useDropdown";

export interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const dropdown = useDropdown();

  return (
    <div ref={dropdown.dropdownRef} className="relative inline-block text-left">
      <DropdownContext.Provider value={dropdown}>
        {children}
      </DropdownContext.Provider>
    </div>
  );
};

// DropdownTrigger.tsx

export interface DropdownTriggerProps {
  children: React.ReactElement<{
    onClick?: (event: React.MouseEvent) => void;
    "aria-haspopup"?: boolean | "true" | "false";
    "aria-expanded"?: boolean | "true" | "false";
  }>;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
}) => {
  const { toggle, isOpen } = useDropdownContext();

  return React.cloneElement(children, {
    onClick: toggle,
    "aria-haspopup": "true",
    "aria-expanded": isOpen,
  });
};

// DropdownMenu.tsx

export interface DropdownMenuProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className,
}) => {
  const { isOpen } = useDropdownContext();

  const baseMenuClasses = `
    absolute right-0 mt-2 w-56 rounded-md bg-white 
    shadow-lg outline-none z-10
  `;

  return isOpen ? (
    <div
      className={`${baseMenuClasses} ${className}`}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="py-1" role="none">
        {children}
      </div>
    </div>
  ) : null;
};
