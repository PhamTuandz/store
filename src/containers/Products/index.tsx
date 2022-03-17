/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Tooltip } from "@mui/material";
import { ColumnList, Data } from "./products.constants";
import TableHeaderSort from "../../component/TableHeaderSort";
import { Order } from "../../utils/helpers";
import { Button } from "antd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ModalCreateProduct from "./components/ModalCreateProduct";
import * as _ from "lodash";
import { AppHelpers } from "../../utils/helpers";
import NumberFormat from "react-number-format";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { getDatabase, ref, remove, set } from "firebase/database";
import ModalConfirm from "../../component/ModalConfirm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";
// import FiberNewIcon from "@mui/icons-material/FiberNew";
import ModalCreateType from "./components/ModalCreateType";
import ModalSell from "./components/ModalSell";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    cursor: "pointer",
    textAlign: "center",
  },
  container: {
    maxHeight: "60vh",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: "0 !important",
      display: "none",
    },
  },
  table: {
    minWidth: "100vw",
    overflowX: "hidden",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

export default function Products({ store, options }: any) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("price_import");
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);

  const [products, setProducts] = React.useState<any>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isCreateTypes, setIsCreateTypes] = useState<boolean>(false);
  const [isOpenSell, setIsOpenSell] = useState<boolean>(false);

  const [values, setValues] = useState<any>(null);
  const db = getDatabase();

  useEffect(() => {
    if (store && store.length) {
      setProducts(store);
    }
  }, [store]);
  const renderControl = () => {
    return (
      <div className="container-fluid">
        <div className="row " style={{ marginTop: "5px" }}>
          <div className="col-md-12 d-flex justify-content-end">
            {/* <Button
              type="ghost"
              icon={<FiberNewIcon />}
              size="large"
              onClick={() => setIsCreateTypes(!isCreateTypes)}
            >
              Thêm loại sản phẩm
            </Button> */}
            <Button
              type="primary"
              icon={<AddBusinessIcon />}
              size="large"
              onClick={() => setIsOpenCreate(true)}
              className="mx-3"
            >
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={ColumnList}
      />
    );
  };

  const handleRemove = (value: any) => {
    setIsOpenConfirm(!isOpenConfirm);
    setValues(value);
  };

  const handleSell = (value: any) => {
    setIsOpenSell(!isOpenSell);
    setValues(value);
  };
  const renderTable = () => {
    if (!_.isEmpty(products) && products.length) {
      let tableData: any[] = AppHelpers.stableSort(
        products,
        AppHelpers.getComparator(order, orderBy)
      );
      return tableData.map((row, idx) => {
        return (
          <TableRow
            sx={{ "& > *": { borderBottom: "unset" } }}
            key={idx}
            onClick={() => setOpen(!open)}
          >
            {ColumnList.map((col) => {
              const colId = col.id;
              const value = row[colId];

              if (colId === "no") {
                return <TableCell key={colId}>{idx + 1}</TableCell>;
              } else if (colId === "types") {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    {value
                      ? AppHelpers.titleProduct(options, value)?.title
                      : "-"}
                  </TableCell>
                );
              } else if (colId === "amount_remaining") {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      color: "red",
                      fontSize: "18px",
                    }}
                  >
                    {row.number_import && row.number_export
                      ? AppHelpers.amountRemaining(
                          row.number_import,
                          row.number_export
                        )
                      : "0"}
                  </TableCell>
                );
              } else if (colId === "number_import") {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      color: "#0441d8",
                      fontSize: "18px",
                    }}
                  >
                    {value ? `${value}` : "0"}
                  </TableCell>
                );
              } else if (colId === "price_import" || colId === "price_export") {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    {value ? (
                      <NumberFormat
                        value={value}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" ₫"}
                      />
                    ) : (
                      "0 ₫"
                    )}
                  </TableCell>
                );
              } else if (colId === "total_import") {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    <NumberFormat
                      value={row.number_import * row.price_import}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" ₫"}
                    />
                  </TableCell>
                );
              } else if (colId === "total_export") {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    <NumberFormat
                      value={row.number_export * row.price_export}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" ₫"}
                    />
                  </TableCell>
                );
              } else if (colId === "number_export") {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      color: "#009413",
                      fontSize: "18px",
                    }}
                  >
                    {value ? value : "0"}
                  </TableCell>
                );
              } else if (colId === "actions") {
                return (
                  <TableCell
                    key={colId}
                    style={{ textAlign: "center", fontWeight: "600" }}
                  >
                    <Tooltip title="Bán" enterDelay={500} leaveDelay={200}>
                      <button
                        className="btn__action"
                        style={{ color: "#3493e4" }}
                        onClick={() => handleSell(row)}
                      >
                        <AddShoppingCartIcon />
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Xem chi tiết"
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <button
                        className="btn__action"
                        style={{ color: "rgb(61 166 65)" }}
                      >
                        <VisibilityIcon />
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Chỉnh sửa"
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <button
                        className="btn__action"
                        style={{ color: "#rgb(40 37 37)" }}
                      >
                        <EditIcon />
                      </button>
                    </Tooltip>
                    <Tooltip title="Xóa" enterDelay={500} leaveDelay={200}>
                      <button
                        className="btn__action"
                        style={{ color: "red" }}
                        onClick={() => handleRemove(row)}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </button>
                    </Tooltip>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell
                    key={colId}
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    {value ? value : "-"}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        );
      });
    } else {
      return (
        <TableRow>
          <TableCell
            className="w-100"
            align="center"
            colSpan={ColumnList.length}
            style={{ fontWeight: "bold" }}
          >
            Không tìm thấy sản phẩm
          </TableCell>
        </TableRow>
      );
    }
  };
  const handleRemoveProduct = () => {
    remove(ref(db, "store/" + values.title)).then(() => {
      toast.success("Xóa rồi đóa bẹn!");
    });
  };
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">{renderControl()}</div>
              <div className="card-body">
                <Paper>
                  <TableContainer component={Paper}>
                    <Table aria-label="collapsible table" stickyHeader>
                      <TableHead>{renderColumns()}</TableHead>
                      <TableBody>{renderTable()}</TableBody>
                      {/* <TableFooter>
                        <TableRow>
                          <TableCell colSpan={5} />
                          <TableCell
                            style={{
                              textAlign: "center",
                              fontWeight: "600",
                              fontSize: "1.2rem",
                            }}
                          >
                            Tổng tiền :
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              fontWeight: "600",
                              fontSize: "1.4rem",
                            }}
                          >
                            {priceImport ? (
                              <NumberFormat
                                value={priceImport}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" ₫"}
                              />
                            ) : (
                              "0 ₫"
                            )}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              fontWeight: "600",
                              fontSize: "1.4rem",
                            }}
                          >
                            {priceExport ? (
                              <NumberFormat
                                value={priceExport}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" ₫"}
                              />
                            ) : (
                              "0 ₫"
                            )}
                          </TableCell>
                        </TableRow>
                      </TableFooter> */}
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenCreate && (
        <ModalCreateProduct
          open={isOpenCreate}
          onClose={() => setIsOpenCreate(false)}
          options={options}
        />
      )}
      {isOpenConfirm && (
        <ModalConfirm
          open={isOpenConfirm}
          onClose={() => setIsOpenConfirm(!isOpenConfirm)}
          title="Mày có muốn xóa sản phẩm này không??????"
          text=""
          onChange={handleRemoveProduct}
        />
      )}
      {isCreateTypes && (
        <ModalCreateType
          open={isCreateTypes}
          onClose={() => setIsOpenCreate(!isCreateTypes)}
        />
      )}
      {isOpenSell && (
        <ModalSell
          open={isOpenSell}
          onClose={() => setIsOpenSell(!isOpenSell)}
          prod={values}
        />
      )}
    </React.Fragment>
  );
}
