import { Input } from "antd";
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
    <Input
      size="large"
      value={color}
      placeholder="Nhập màu"
      style={{ marginTop: index !== 0 ? "5px" : "0px" }}
      prefix={<span>Nhập màu:</span>}
      onChange={(e) => onChange(e.target.value, index)}
      onKeyPress={onKeyPress}
    />
  );
}
