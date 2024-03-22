import React, { useState } from "react";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const colors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#000000", // Black
    "#FFFFFF", // White
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
    navigator.clipboard.writeText(color);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center  h-[90%] w-[70vw] bg-white m-10">
      <div className="flex  flex-wrap p-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-12 h-12 m-1 rounded-full cursor-pointer border border-gray-200 ${
              selectedColor === color ? "border-2" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>

      {copySuccess && (
        <div className="text-green-600 mt-2 ml-2">Copied to clipboard!</div>
      )}
      <div className="text-gray-600 mt-2">
        Selected Color:{" "}
        <span className="font-bold">{selectedColor || "None"}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
