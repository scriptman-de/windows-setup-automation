import React from "react";

import { IComputersTableCheckbox } from "../interfaces";

function Checkbox({
  label,
  isSelected,
  onCheckboxChange,
}: IComputersTableCheckbox) {
  return (
    <input
      type="checkbox"
      checked={isSelected}
      name={label}
      onChange={onCheckboxChange}
      value={label}
    />
  );
}

export default Checkbox;
