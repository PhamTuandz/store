import { Tooltip } from "@mui/material";
import React from "react";
import InputSize from "./InputSize";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "antd";

interface IMutiSize {
  infor: any;
  size?: any;
  setSize?: any;
  number?: any;
  setNumber?: any;
  colors: any;
  setColors: any;
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
  size,
  setSize,
  number,
  setNumber,
  infor,
  colors,
  setColors,
}: IMutiSize) {
  console.log("Infor", infor);
  const onChangeSize = (size: any, index: any) => {
    setSize((pre: any) => []);
  };

  const handleClickAddInfor = (val: IColors) => {
    setColors(
      colors.map((item: IColors) => {
        if (item.id === val.id) {
          return {
            ...item,
            infors: [...item.infors, { size: "", number: "" }],
          };
        }
        return { ...item };
      })
    );
  };

  const addSizes = () => {
    //   setColors((pre: any) =>  {...pre})
  };
  return (
    <React.Fragment>
      {infor &&
        infor.length &&
        infor.map((item: any, index: number) => {
          <InputSize />;
        })}
      <div className="col-md-12 d-flex justify-content-center">
        <Tooltip title="Thêm thông tin" enterDelay={500} leaveDelay={200}>
          <Button
            style={{ marginTop: "34px" }}
            shape="circle"
            icon={<AddIcon />}
            onClick={() => {
              //   handleClickAddInfor(item);
            }}
          />
        </Tooltip>
      </div>
    </React.Fragment>
  );
}
