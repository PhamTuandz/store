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
import * as _ from "lodash";

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
      infors: [{ id: 1, size: "", number: 0, sells: 0, sold: 0 }],
      isShow: false,
    },
  ]);
  const { Option } = Select;

  const [productName, setProductName] = React.useState<string>("");
  const [numberImport, setNumberImport] = useState<string>("");
  const [priceIn, setPriceIn] = useState<string>("");
  const [priceOut, setPriceOut] = useState<string>("");
  const [selectOpt, setSelectOpt] = useState<any>(options[1]?.value);

  React.useEffect(() => {
    if (!_.isEmpty(options)) {
      setSelectOpt(options[1]?.value);
    }
  }, [selectOpt]);
  const resetInput = () => {
    setProductName("");
    setNumberImport("");
    setPriceIn("");
    setPriceOut("");
    setSelectOpt(options[1]?.value);
    setColors([
      {
        id: 1,
        name_color: "",
        infors: [{ id: 1, size: "", number: 0, sells: 0, sold: 0 }],
        isShow: false,
      },
    ]);
  };

  const onSubmit = (data: any) => {
    console.log(colors);
    const db = getDatabase();
    let totaImp: number = 0;
    setColors(
      colors.map((item: any) => {
        const { infors } = item;
        infors.map((pre: any) => {
          console.log(pre);
          totaImp = totaImp + Number(pre.number);
          return { pre };
        });
        return { ...item };
      })
    );
   
    set(ref(db, "store/" + productName + `_${AppHelpers.generateUUIDV4()}`), {
      name_products: productName,
      types: selectOpt,
      number_export: 0,
      number_import: totaImp,
      price_import: priceIn,
      price_export: priceOut,
      colors: colorInfor(colors),
    }).then(() => {
      toast.success("M??y ???? t???o th??nh c??ng r???i ????a!");
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
                      placeholder="Nh???p t??n s???n ph???m"
                      prefix={<span>T??n s???n ph???m*</span>}
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
                              Ch???n lo???i s???n ph???m*
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
                  {/* <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <Input
                      size="large"
                      value={numberImport}
                      placeholder="Nh???p s??? l?????ng"
                      prefix={<span>S??? l?????ng nh???p*</span>}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNumberImport(e.target.value)
                      }
                    />
                  </div> */}
                  <div
                    className="col-md-12 form-group"
                    style={{ marginTop: "5px" }}
                  >
                    <NumberFormat
                      thousandSeparator={true}
                      suffix={" ???"}
                      className="form-control price"
                      placeholder="Nh???p gi?? l???y h??ng"
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
                      suffix={" ???"}
                      className="form-control price"
                      placeholder="Nh???p gi?? b??n h??ng"
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
                  L??u ??: <i>C???n nh???p nh???ng input c?? ????nh d???u *</i>
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
                  ????ng
                </Button>
                <Button
                  className="ml-3"
                  type="primary"
                  icon={<AddBusinessIcon />}
                  size="large"
                  onClick={handleSubmit(onSubmit)}
                >
                  T???o m???i
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
