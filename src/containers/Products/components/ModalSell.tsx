import { Dialog } from "@mui/material";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MoneyIcon from "@mui/icons-material/Money";
import InputSell from "./InputSell";
import * as _ from "lodash";
import { child, getDatabase, push, ref, update } from "firebase/database";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  onClose: () => void;
  prod: any;
}

export default function ModalSell({ open, onClose, prod }: IProps) {
  const { colors } = prod;
  const [sell, setSell] = useState<any>([]);

  useEffect(() => {
    if (!_.isEmpty(colors)) {
      setSell(
        colors.map((item: any) => {
          item.infors.map((val: any) => {
            Object.assign(val, { sells: "" });
          });
          return { ...item };
        })
      );
    }
  }, [colors]);
  const onChangeSell = (sell: any, id: any, index: any, idParent: any) => {
    setSell(
      colors.map((item: any) => {
        if (item.id === idParent) {
          const { infors } = item;
          infors.map((pre: any) => {
            if (pre.id === id) {
              Object.assign(pre, { sells: sell });
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
  
  const handleSell = () => {
    const db = getDatabase();
    update(ref(db, "store/" + prod.title), {
      name_products: prod.name_products,
      types: prod.types,
      number_export: 0,
      number_import: prod.number_import,
      price_import: prod.price_import,
      price_export: prod.price_export,
      colors: sell,
    }).then(() => {
      toast.success("Lụm tiền!");
      onClose();
    });
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
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
      <div className="card">
        <div className="card-heard">
          <div className="card-title text-center" style={{ fontSize: "24px" }}>
            Thông tin sản phẩm
          </div>
          <hr />
        </div>
        <div className="card-body ">
          <div className="row">
            <div className="col-md-12 text-center">
              <span className="span__infor">
                Tên sản phẩm: <i>{prod.name_products}</i>
              </span>
            </div>
            <div className="col-md-12 text-center">
              <span>-----------Thông tin chi tiết-----------</span>
            </div>
            {sell &&
              sell.length &&
              sell.map((item: any) => {
                if (item.name_color !== "") {
                  return (
                    <div className="col-md-12 text-center" key={item.id}>
                      <span className="span__infor">
                        Màu: <i>{item.name_color}</i>
                      </span>
                      <div className="row">
                        {item.infors &&
                          item.infors.length &&
                          item.infors.map((val: any, index: any) => {
                            if (val.size !== "" || val.number !== "") {
                              return (
                                <React.Fragment key={index}>
                                  <div
                                    className="col-md-3"
                                    style={{ padding: "10px 0" }}
                                  >
                                    <span>Size: {val.size}</span>
                                  </div>
                                  <div className="col-md-4">
                                    <span>SL Kho: </span>
                                    <Input
                                      size="large"
                                      value={val.number}
                                      style={{ width: "55%" }}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <span>SL Bán: </span>
                                    <InputSell
                                      sell={val.sell}
                                      id={val.id}
                                      idParent={item.id}
                                      index={index}
                                      onChangeSell={onChangeSell}
                                    />
                                  </div>
                                </React.Fragment>
                              );
                            }
                          })}
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
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
                icon={<MoneyIcon />}
                size="large"
                onClick={handleSell}
              >
                Bán
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
