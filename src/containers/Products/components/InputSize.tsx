import React from "react";

interface IInfor {
  index?: number;
  size?: string;
  number?: number;
  onChangeSize?: any;
  onChangeNumber?: any;
}

export default function InputSize({
  index,
  size,
  onChangeSize,
  number,
  onChangeNumber,
}: IInfor) {
  return (
    <React.Fragment>
      <div className="col-md-6">
        <span className="span-modal">Size</span>
        <input
          type="text"
          value={size}
          onChange={(e) => onChangeSize(e.target.value, index)}
          className="form-control"
          placeholder="Nhập size"
        />
      </div>
      <div className="col-md-6">
        <span className="span-modal">Số lượng</span>
        <input
          type="text"
          value={number}
          placeholder="Nhập số lượng"
          className="form-control"
          onChange={(e) => onChangeNumber(e.target.value, index)}
        />
      </div>
    </React.Fragment>
  );
}
