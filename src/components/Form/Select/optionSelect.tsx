// Imports React
import React from "react";

// Typings[TypeScript]
import { Option } from "./types";

const OptionSelectComponent: React.FC<Option> = ({ id, title, value }) => {
  return (
    <option id={id} value={value} style={{ backgroundColor: "#353646" }}>
      {title}
    </option>
  );
};

export default OptionSelectComponent;
