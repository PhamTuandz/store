import { Dialog } from "@mui/material";
import { Input } from "antd";
import React from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalCreateType({ open, onClose }: IProps) {
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
      <div className="container">
        <div className="card">
          <div className="card-body">
            <Input
              size="large"
              placeholder="Nhập loại sản phẩm"
              prefix={<span>Tên loại:*</span>}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
