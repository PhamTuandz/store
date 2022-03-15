import React, { useState } from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "antd";
import { Tooltip } from "@mui/material";
import { spawn } from "child_process";
import MutiColor from "./MutiColor";
import { getDatabase, ref, set } from "firebase/database";
import NumberFormat from "react-number-format";
interface IProps {
  open: boolean;
  onClose: () => void;
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
export default function ModalCreateProduct({ open, onClose }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm();

  const [colors, setColors] = React.useState<IColors | any>([
    {
      id: 1,
      name_color: "",
      infors: [{ size: "", number: "" }],
      isShow: false,
    },
  ]);

  const [colorName, setColorName] = React.useState<string>("");
  const [priceIn, setPriceIn] = useState<string>("");
  const [priceOut, setPriceOut] = useState<string>("");
  const handleClickAddColor = () => {
    setColors([
      ...colors,
      {
        id: colors.length + 1,
        name_color: "",
        infors: [{ size: "", number: "" }],
        isShow: false,
      },
    ]);
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

  const onSubmit = (data: any) => {
    const db = getDatabase();
    if (data.type === "shirt") {
      set(ref(db, "store/" + data.name), {
        name_products: data.name,
        types: data.type,
        number_export: 0,
        number_import: data.number_import,
        price_import: priceIn,
        price_export: priceOut,
        colors: colorInfor(colors),
      });
    }
  };
  console.log(colors);

  const colorInfor = (arrColor: any) => {
    return arrColor.map((item: any) => {
      return { ...item, title_color: item.name_color };
    });
  };

  const handChangeColorName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors(
      colors.map((item: IColors) => {
        if (+item.id === +e.target.id) {
          return {
            ...item,
            name_color: e.target.value,
          };
        }
        return { ...item };
      })
    );
  };

  const renderInput = () => {
    return colors.map((item: IColors) => {
      return (
        <React.Fragment key={item.id}>
          <div className="col-md-8 form-group">
            <span className="span-modal">Màu sản phẩm:</span>
            <input
              id={item.id}
              type="text"
              placeholder="Nhập màu"
              className="form-control"
              value={item.name_color}
              onChange={(e: any) => {
                let value = e.target.value;
                let newColor = colors.map((val: IColors) => {
                  if (item.id === val.id) {
                    val.name_color = value;
                  }
                  return val;
                });
                setColors(newColor);
              }}
              // onKeyPress={(e) => {
              //   handleEnter(e, item);
              // }}
            />
            <div className="row">
              {item.isShow && (
                <React.Fragment>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <span className="span-modal">Thông tin chi tiết</span>
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <div className="row">
                      {item.infors &&
                        item.infors.length &&
                        item.infors.map((val: IInfor, idx: any) => (
                          <React.Fragment key={idx}>
                            <div className="col-md-6">
                              <span className="span-modal">Size</span>
                              <input
                                type="text"
                                placeholder="Nhập size"
                                className="form-control"
                              />
                            </div>

                            <div className="col-md-6">
                              <span className="span-modal">Số lượng</span>
                              <input
                                type="text"
                                placeholder="Nhập số lượng"
                                className="form-control"
                              />
                            </div>
                          </React.Fragment>
                        ))}

                      <div className="col-md-12 d-flex justify-content-center">
                        <Tooltip
                          title="Thêm thông tin"
                          enterDelay={500}
                          leaveDelay={200}
                        >
                          <Button
                            style={{ marginTop: "34px" }}
                            shape="circle"
                            icon={<AddIcon />}
                            onClick={() => {
                              handleClickAddInfor(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    });
  };
  return (
    <Dialog
      fullWidth={true}
      fullScreen
      open={open}
      aria-labelledby="max-width-dialog-title"
      scroll="body"
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          <div className="card-header">{/* <h4>Thêm sản phẩm </h4> */}</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 form-group">
                    <span className="span-modal">Tên sản phẩm: *</span>
                    <input
                      autoFocus
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Nhập tên sản phẩm"
                      className="form-control"
                    />
                    {errors.name?.type === "required" && (
                      <span style={{ color: "red" }}>
                        Vui lòng nhập tên sản phẩm!
                      </span>
                    )}
                  </div>
                  <div
                    className="col-md-4 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <span className="span-modal">Loại sản phẩm: *</span>
                  </div>
                  <div
                    className="col-md-8 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <select
                      {...register("type", { required: true })}
                      className="form-select"
                    >
                      <option value="shirt">Áo</option>
                      <option value="trousers">Quần</option>
                      <option value="sock">Vớ</option>
                    </select>
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <span className="span-modal">Số lượng nhập hàng: *</span>
                    <input
                      type="text"
                      placeholder="Nhập số lượng nhập hàng"
                      className="form-control"
                      {...register("number_import", { required: true })}
                    />
                    {errors.name?.type === "required" && (
                      <span style={{ color: "red" }}>
                        Số lượng nhập không được để trống!
                      </span>
                    )}
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <span className="span-modal">Giá nhập vào:</span>
                    <NumberFormat
                      thousandSeparator={true}
                      suffix={" ₫"}
                      className="form-control"
                      placeholder="Nhập giá lấy hàng"
                      value={priceIn}
                      onValueChange={(values: any) => {
                        const { formatValue, value } = values;
                        setPriceIn(value);
                      }}
                    />
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <span className="span-modal">Giá bán ra:</span>
                    <NumberFormat
                      thousandSeparator={true}
                      suffix={" ₫"}
                      className="form-control"
                      placeholder="Nhập giá bán hàng"
                      value={priceOut}
                      onValueChange={(values: any) => {
                        const { formatValue, value } = values;
                        setPriceOut(value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  {/* {colors &&
                    colors.length &&
                    colors.map((item: IColors, idx: any) => (
                      <React.Fragment key={idx}>
                        <div className="col-md-8 form-group">
                          <span className="span-modal">Màu sản phẩm:</span>
                          <input
                            id={item.id}
                            type="text"
                            placeholder="Nhập màu"
                            className="form-control"
                            onChange={handChangeColorName}
                            onKeyPress={(e) => {
                              handleEnter(e, item);
                            }}
                          />
                          <div className="row">
                            {item.isShow && (
                              <React.Fragment>
                                <div
                                  className="col-md-12 form-group"
                                  style={{ marginTop: "5px" }}
                                >
                                  <span className="span-modal">
                                    Thông tin chi tiết
                                  </span>
                                </div>
                                <div
                                  className="col-md-12 form-group"
                                  style={{ marginTop: "5px" }}
                                >
                                  <div className="row">
                                    {item.infors &&
                                      item.infors.length &&
                                      item.infors.map(
                                        (val: IInfor, idx: any) => (
                                          <React.Fragment key={idx}>
                                            <div className="col-md-6">
                                              <span className="span-modal">
                                                Size
                                              </span>
                                              <input
                                                type="text"
                                                placeholder="Nhập size"
                                                className="form-control"
                                              />
                                            </div>

                                            <div className="col-md-6">
                                              <span className="span-modal">
                                                Số lượng
                                              </span>
                                              <input
                                                type="text"
                                                placeholder="Nhập số lượng"
                                                className="form-control"
                                              />
                                            </div>
                                          </React.Fragment>
                                        )
                                      )}

                                    <div className="col-md-12 d-flex justify-content-center">
                                      <Tooltip
                                        title="Thêm thông tin"
                                        enterDelay={500}
                                        leaveDelay={200}
                                      >
                                        <Button
                                          style={{ marginTop: "34px" }}
                                          shape="circle"
                                          icon={<AddIcon />}
                                          onClick={() => {
                                            handleClickAddInfor(item);
                                          }}
                                        />
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    ))} */}
                  {/* {renderInput()} */}
                  {/* <div className="col-md-4 d-flex justify-content-center">
                    <Tooltip
                      title="Thêm màu sản phẩm"
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <Button
                        style={{ marginTop: "34px" }}
                        shape="circle"
                        type="primary"
                        icon={<AddIcon />}
                        onClick={handleClickAddColor}
                      />
                    </Tooltip>
                  </div> */}
                  <MutiColor colors={colors} setColors={setColors} />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row " style={{ marginTop: "5px" }}>
              <div className="col-md-12 d-flex justify-content-end">
                <Button
                  type="primary"
                  icon={<CloseIcon />}
                  size="large"
                  danger
                  style={{ marginRight: "10px" }}
                  onClick={() => onClose()}
                >
                  Đóng
                </Button>
                <Button
                  className="ml-3"
                  type="primary"
                  icon={<AddBusinessIcon />}
                  size="large"
                  //   typeof="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Tạo mới
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
