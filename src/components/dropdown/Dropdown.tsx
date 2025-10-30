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
  style,
}) => {
  const { isOpen } = useDropdownContext();

  // Tailwind CSS 제거, inline style 적용
  const baseMenuStyle: React.CSSProperties = {
    position: "absolute",
    right: 0,
    marginTop: "8px",
    width: "224px", // Tailwind w-56 ≈ 14rem ≈ 224px
    borderRadius: "0.375rem", // rounded-md ≈ 6px
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // shadow-lg 느낌
    outline: "none",
    zIndex: 10,
  };

  const innerStyle: React.CSSProperties = {
    paddingTop: "4px",
    paddingBottom: "4px", // py-1 ≈ 0.25rem
  };

  return isOpen ? (
    <div
      role="menu"
      aria-orientation="vertical"
      style={{ ...baseMenuStyle, ...style }}
    >
      <div role="none" style={innerStyle}>
        {children}
      </div>
    </div>
  ) : null;
};
