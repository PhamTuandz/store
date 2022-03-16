import { Input } from "antd";
import React from "react";

export default function InputSell({
  sell,
  onChangeSell,
  id,
  index,
  idParent,
}: any) {
  return (
    <Input
      size="large"
      value={sell}
      placeholder="Nhập màu"
      onChange={(e) => onChangeSell(e.target.value, id, index, idParent)}
      style={{ width: "55%" }}
    />
  );
}
