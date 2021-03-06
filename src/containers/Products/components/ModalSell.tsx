import { Dialog } from "@mui/material";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MoneyIcon from "@mui/icons-material/Money";
import InputSell from "./InputSell";
import * as _ from "lodash";
import { child, getDatabase, push, ref, update } from "firebase/database";
import { toast } from "react-toastify";
import logo from '../../../module/HH.png'
interface IProps {
  open: boolean;
  onClose: () => void;
  prod: any;
}

export default function ModalSell({ open, onClose, prod }: IProps) {
  const { colors } = prod;
  const [sell, setSell] = useState<any>([]);
  const [id, setId] = useState<any>(null);
  const [idParent, setIdParent] = useState<any>(null);

  useEffect(() => {
    if (!_.isEmpty(colors)) {
      setSell(
        colors.map((item: any) => {
          item.infors.map((val: any) => {
            Object.assign(val, { sells: 0 });
          });
          return { ...item };
        })
      );
    }
  }, [colors]);
  const onChangeSell = (sell: any, id: any, index: any, idParent: any) => {
    setIdParent(idParent);
    setId(id);
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

  const resetData = () => {
    setSell(
      colors.map((item: any) => {
        item.infors.map((val: any) => {
          Object.assign(val, { sells: 0 });
        });
        return { ...item };
      })
    );
    onClose();
  };

  const handleSell = () => {
    let temp: number = 0;
    let sub: number = 0;
    let total: number = 0;
    const db = getDatabase();
    setSell(
      colors.map((item: any) => {
        const { infors } = item;
        infors.map((pre: any) => {
          temp = Number(pre.number) - Number(pre.sold);
          sub = temp - Number(pre.sells);
          if (sub < 0) return;
          Object.assign(
            pre,
            { sells: 0 },
            { sold: Number(pre.sells) + Number(pre.sold) }
          );
          total = total + Number(pre.sold);

          return { pre };
        });
        return { ...item };
      })
    );
    if (sub < 0) {
      toast.warning("C?? ????? h??ng ????u m?? b??n nh?? ????ng r???i v???y??????");
      return;
    }
    update(ref(db, "store/" + prod.title), {
      name_products: prod.name_products,
      types: prod.types,
      number_export: total,
      number_import: prod.number_import,
      price_import: prod.price_import,
      price_export: prod.price_export,
      colors: sell,
    }).then(() => {
      toast.success("L???m ti???n!");
      onClose();
    });
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
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
      <div className="card bg" style={{backgroundColor: `${logo}`}}>
        <div className="card-heard">
          <div className="card-title text-center" style={{ fontSize: "24px" }}>
            Th??ng tin s???n ph???m
          </div>
          <hr />
        </div>
        <div className="card-body ">
          <div className="row">
            <div className="col-md-12 text-center">
              <span className="span__infor">
                T??n s???n ph???m: <i>{prod.name_products}</i>
              </span>
            </div>
            <div className="col-md-12 text-center">
              <span>-----------Th??ng tin chi ti???t-----------</span>
            </div>
            {sell &&
              sell.length &&
              sell.map((item: any) => {
                if (item.name_color !== "") {
                  return (
                    <div className="col-md-12 text-center" key={item.id}>
                      <span className="span__infor">
                        M??u: <i>{item.name_color}</i>
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
                                      defaultValue={
                                        Number(val.number) === 0
                                          ? 0
                                          : Number(val.number) -
                                            Number(val.sold)
                                      }
                                      style={{ width: "55%" }}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <span>SL B??n: </span>
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
                onClick={() => resetData()}
              >
                ????ng
              </Button>
              <Button
                className="ml-3"
                type="primary"
                icon={<MoneyIcon />}
                size="large"
                onClick={handleSell}
              >
                B??n
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
