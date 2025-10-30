import React from "react";
import { DropdownContext, useDropdownContext } from "./DropdownContext";
import { useDropdown } from "./useDropdown";

export const Dropdown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
