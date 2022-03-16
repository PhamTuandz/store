/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from "@mui/material";
import { Button } from "antd";
import React, { useState } from "react";
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

  const onChangeSize = (
    size: any,
    index: any,
    idParent: any,
    idChidren: any
  ) => {
    setColors(
      colors.map((item: any) => {
        if (item.id === idParent) {
          const { infors } = item;
          infors.map((pre: any, idx: any) => {
            if (pre.id === idChidren) {
              Object.assign(pre, { size: size });
            } else {
              return { pre };
            }
          });
          return { ...item };
        }
        return { ...item };
      })
    );
  };

  const onChangeNumber = (
    number: any,
    index: any,
    idParent: any,
    idChidren: any
  ) => {
    setColors(
      colors.map((item: any) => {
        if (item.id === idParent) {
          const { infors } = item;
          infors.map((pre: any, idx: any) => {
            if (pre.id === idChidren) {
              Object.assign(pre, { number: number });
            } else {
              return { pre };
            }
          });
          return { ...item };
        }
        return { ...item };
      })
    );
  };
  const addInputColors = () => {
    setColors((pre: any) =>
      pre.concat({
        id: colors.length + 1,
        name_color: "",
        infors: [{ id: 1, size: "", number: "" }],
        isShow: false,
      })
    );
  };

  const addInputInfor = (value: any) => {
    const { infors } = value;
    const infor = {
      id: infors.length + 1,
      size: "",
      number: "",
    };
    infors.push(infor);
    setColors(
      colors.map((item: any) => {
        if (item.id === value.id) {
          return { ...item, infors };
        } else {
          return { ...item };
        }
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
      <div className="row">
        {colors &&
          colors.length &&
          colors.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <div className="col-md-6 form-group" key={index}>
                <InputColor
                  key={item.id}
                  color={item.name_color}
                  index={index}
                  onChange={onChangeColor}
                  onKeyPress={(e: any) => handleEnter(e, item)}
                />
              </div>
              <div className="col-md-6 form-group">
                <div className="row">
                  {item.infors &&
                    item.infors.length &&
                    item.infors.map((val: any, index: number) => (
                      <div className="col-md-12" key={index}>
                        <div className="row">
                          <MutiSize
                            infors={val}
                            index={index}
                            id={item.id}
                            onChangeSize={onChangeSize}
                            onChangeNumber={onChangeNumber}
                          />
                        </div>
                      </div>
                    ))}
                  <div className="col-md-12 d-flex justify-content-center">
                    <Tooltip
                      title="Thêm size, kích thước"
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <Button
                        style={{ marginTop: "10px", background: "#5b9ad5" }}
                        shape="circle"
                        type="primary"
                        icon={<AddIcon />}
                        onClick={() => addInputInfor(item)}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
      <div className="col-md-6 d-flex justify-content-center">
        <Tooltip title="Thêm màu sản phẩm" enterDelay={500} leaveDelay={200}>
          <Button
            style={{ marginTop: "-30px" }}
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
