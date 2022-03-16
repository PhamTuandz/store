/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { Button, Select } from "antd";
import { Tooltip } from "@mui/material";
import MutiColor from "./MutiColor";
import { getDatabase, ref, set } from "firebase/database";
import NumberFormat from "react-number-format";
import { Input } from "antd";
import { AppHelpers } from "../../../utils/helpers";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  onClose: () => void;
  options: any[];
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
export default function ModalCreateProduct({ open, onClose, options }: IProps) {
  const { handleSubmit } = useForm();

  const [colors, setColors] = React.useState<IColors | any>([
    {
      id: 1,
      name_color: "",
      infors: [{ id: 1, size: "", number: "" }],
      isShow: false,
    },
  ]);
  const { Option } = Select;

  const [productName, setProductName] = React.useState<string>("");
  const [numberImport, setNumberImport] = useState<string>("");
  const [priceIn, setPriceIn] = useState<string>("");
  const [priceOut, setPriceOut] = useState<string>("");
  const [selectOpt, setSelectOpt] = useState<any>(options[1]?.value);

  const resetInput = () => {
    setProductName("");
    setNumberImport("");
    setPriceIn("");
    setSelectOpt(options[1]?.value);
    setColors([
      {
        id: 1,
        name_color: "",
        infors: [{ id: 1, size: "", number: "" }],
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
    set(ref(db, "store/" + productName + `_${AppHelpers.generateUUIDV4()}`), {
      name_products: productName,
      types: selectOpt,
      number_export: 0,
      number_import: numberImport,
      price_import: priceIn,
      price_export: priceOut,
      colors: colorInfor(colors),
    }).then(() => {
      toast.success("Mày đã tạo thành công rồi đóa!");
      resetInput();
    });
  };

  const colorInfor = (arrColor: any) => {
    return arrColor.map((item: any) => {
      return { ...item, title_color: item.name_color };
    });
  };

  const handleChangeOpt = (value: any) => {
    setSelectOpt(value);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      aria-labelledby="max-width-dialog-title"
      scroll="body"
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      style={{
        zIndex: 100,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-12 form-group">
                    <Input
                      size="large"
                      value={productName}
                      placeholder="Nhập tên sản phẩm"
                      prefix={<span>Tên sản phẩm*</span>}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProductName(e.target.value)
                      }
                    />
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <Input.Group compact>
                      <Select
                        size="large"
                        style={{ width: "100%" }}
                        defaultValue={selectOpt}
                        onChange={handleChangeOpt}
                        placeholder={
                          <React.Fragment>
                            <span style={{ color: "#000" }}>
                              Chọn loại sản phẩm*
                            </span>
                          </React.Fragment>
                        }
                      >
                        {options &&
                          options.length &&
                          options.map((val: any) => (
                            <Option value={val.value} key={val.value}>
                              {val.title}
                            </Option>
                          ))}
                      </Select>
                    </Input.Group>
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <Input
                      size="large"
                      value={numberImport}
                      placeholder="Nhập số lượng"
                      prefix={<span>Số lượng nhập*</span>}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNumberImport(e.target.value)
                      }
                    />
                  </div>
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <NumberFormat
                      thousandSeparator={true}
                      suffix={" ₫"}
                      className="form-control price"
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
                    <NumberFormat
                      thousandSeparator={true}
                      suffix={" ₫"}
                      className="form-control price"
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
              <div className="col-md-8">
                <div className="row">
                  <MutiColor colors={colors} setColors={setColors} />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row " style={{ marginTop: "5px" }}>
              <div className="col-md-6">
                <span>
                  Lưu ý: <i>Cần nhập những input có đánh dấu *</i>
                </span>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
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
