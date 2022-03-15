import { Dialog } from "@mui/material";
import React from "react";
import { Button } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
interface IProps {
  open: boolean;
  onClose: () => void;
  text?: string;
  title?: string;
  onChange: () => void;
}

export default function ModalConfirm({
  open,
  onClose,
  text,
  title,
  onChange,
}: IProps) {
  const handleChange = () => {
    onChange();
    onClose();
  };
  return (
    <Dialog
      open={open}
      maxWidth={"xs"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <div className="card">
        <div className="card-header">
          <h3>Thông báo xác nhận</h3>
        </div>
        <div className="card-body">
          <h5>
            {title} <i>{text ? `"${text}?"` : ""}</i>
          </h5>
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
                icon={<ThumbUpIcon />}
                size="large"
                //   typeof="submit"
                onClick={handleChange}
              >
                Đồng ý
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
