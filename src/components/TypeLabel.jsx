import React from "react";
import typeColors from "../constants/typeColors";


function TypeLabel({ type }) {

  const color = typeColors[type] || "#ccc";
  
  return (
    <div className={`min-w-[100px] rounded text-center`} style={{backgroundColor: color}} key={type}>
      {type}
    </div>
  );
}

export default TypeLabel;
