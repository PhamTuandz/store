import { Tooltip } from "@mui/material";
import { Button } from "antd";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import InputColor from "./InputColor";
import MutiSize from "./MutiSize";

interface IMutiColor {
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
export default function MutiColor({ colors, setColors }: IMutiColor) {
  const onChangeColor = (color: any, index: any) => {
    setColors((pre: any) => [
      ...pre.slice(0, index),
      { ...pre[index], name_color: color },
      ...pre.slice(index + 1),
    ]);
  };

  const addInputColors = () => {
    setColors((pre: any) =>
      pre.concat({
        id: colors.length + 1,
        name_color: "",
        infors: [{ size: "", number: "" }],
        isShow: false,
      })
    );
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: IColors
  ) => {
    if (e.key === "Enter") {
      setColors(
        colors.map((item: IColors) => {
          if (item.id === value.id) {
            return {
              ...item,
              isShow: true,
            };
          }
          return {
            ...item,
          };
        })
      );
    }
  };

  return (
    <React.Fragment>
      {colors &&
        colors.length &&
        colors.map((item: any, index: number) => (
          <div className="col-md-8 form-group" key={item.id}>
            <span className="span-modal">Màu sản phẩm:</span>
            <InputColor
              key={item.id}
              color={item.name_color}
              index={index}
              onChange={onChangeColor}
              onKeyPress={(e: any) => handleEnter(e, item)}
            />
            {item.isShow && (
              <div className="row">
                <MutiSize
                  infor={item.infors}
                  colors={colors}
                  setColors={setColors}
                />
              </div>
            )}
          </div>
        ))}

      <div className="col-md-4 d-flex justify-content-center">
        <Tooltip title="Thêm màu sản phẩm" enterDelay={500} leaveDelay={200}>
          <Button
            style={{ marginTop: "34px" }}
            shape="circle"
            type="primary"
            icon={<AddIcon />}
            onClick={addInputColors}
          />
        </Tooltip>
      </div>
    </React.Fragment>
  );
}
