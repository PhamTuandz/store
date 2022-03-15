import React from "react";

interface IInputColor {
  index: number;
  color: string;
  onChange: any;
  onKeyPress: any;
}
export default function InputColor({
  color,
  index,
  onChange,
  onKeyPress,
}: IInputColor) {
  return (
    <input
      type="text"
      value={color}
      onChange={(e) => onChange(e.target.value, index)}
      className="form-control"
      placeholder="Nhập màu"
      onKeyPress={onKeyPress}
    />
  );
}
