// Dropdown.tsx

import React from "react";
import { DropdownContext, useDropdownContext } from "./DropdownContext";
import { useDropdown } from "./useDropdown";

export interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const dropdown = useDropdown();

  return (
    <div
      ref={dropdown.dropdownRef}
      style={{
        position: "relative",
        display: "inline-block",
        textAlign: "left",
      }}
    >
      <DropdownContext.Provider value={dropdown}>
        {children}
      </DropdownContext.Provider>
    </div>
  );
};

// DropdownTrigger

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

// DropdownMenu

export interface DropdownMenuProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  style,
  className,
}) => {
  const { isOpen } = useDropdownContext();

  const menuStyle: React.CSSProperties = {
    position: "absolute",
    right: 0,
    marginTop: "8px", // 0.5rem -> 8px
    width: "224px", // 14rem -> 224px
    borderRadius: "6px", // 0.375rem -> 6px
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    outline: "none",
    zIndex: 10,
    ...style,
  };

  const defaultMenuStyle: React.CSSProperties = {
    backgroundColor: "white",
    ...menuStyle,
  };

  const menuItemsContainerStyle: React.CSSProperties = {
    paddingTop: "4px", // 0.25rem -> 4px
    paddingBottom: "4px", // 0.25rem -> 4px
  };

  return isOpen ? (
    <div
      className={className}
      style={className || style ? menuStyle : defaultMenuStyle}
      role="menu"
      aria-orientation="vertical"
    >
      <div style={menuItemsContainerStyle} role="none">
        {children}
      </div>
    </div>
  ) : null;
};
