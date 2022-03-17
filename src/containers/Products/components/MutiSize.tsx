/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from "@mui/material";
import React from "react";
import InputSize from "./InputSize";
import AddIcon from "@mui/icons-material/Add";
import { Button, Input } from "antd";

interface IMutiSize {
  infors?: any;
  index?: any;
  id?: any;
  onChangeSize?: any;
  onChangeNumber?: any;
}

interface IInfor {
  size: string;
  number: string;
}

interface IColors {
  id: string;
  name_color: string;
  infors: IInfor[];
  isShow: boolean;
}
export default function MutiSize({
  infors,
  index,
  id,
  onChangeSize,
  onChangeNumber,
}: IMutiSize) {
  const { size, number } = infors;
  return (
    <React.Fragment>
      <div className="col-md-6">
        <Input
          size="large"
          value={size}
          placeholder="Nhập size"
          style={{ marginTop: infors.id !== 1 ? "5px" : "0px" }}
          prefix={<span>Size:</span>}
          onChange={(e) => onChangeSize(e.target.value, index, id, infors.id)}
        />
      </div>
      <div className="col-md-6">
        <Input
          size="large"
          value={number}
          placeholder="Nhập SL"
          style={{ marginTop: infors.id !== 1 ? "5px" : "0px" }}
          prefix={<span>SL:</span>}
          onChange={(e) => onChangeNumber(e.target.value, index, id, infors.id)}
        />
      </div>
    </React.Fragment>
  );
}
