import { makeStyles } from "@mui/styles";
import * as _ from "lodash";
import { TableCell, TableRow, TableSortLabel } from "@mui/material";

const useStyles = makeStyles({
  th: {
    fontWeight: 600,
    textTransform: "capitalize",
    background: "#eceff1 !important",
    fontSize: "14px",
    justifyContent: "center",
  },
  label: {
    justifyContent: "center",
    textAlign: "center",
  },
});

interface IProps {
  classes: any;
  order: any;
  orderBy: any;
  onRequestSort: any;
  columns: any;
}

export default function TableHeaderSort(props: IProps) {
  const classesTh = useStyles();
  const { classes, order, orderBy, onRequestSort, columns } = props;

  const createSort = (property: any) => {
    return (event: any) => {
      onRequestSort(event, property);
    };
  };
  return (
    <TableRow>
      {columns.map((col: any) => {
        if (col.id === "fullname") {
          return (
            <TableCell
              className={classesTh.th}
              key={col.id}
              sortDirection={orderBy === col.id ? order : false}
              style={{
                textAlign: "center",
                minWidth: col.minWidth,
                padding: "16px",
                position: "sticky",
                left: 0,
                zIndex: 20,
                fontWeight: "bold",
              }}
            >
              {isNaN(col.id) ? (
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : "asc"}
                  onClick={createSort(col.id)}
                  className={classesTh.label}
                >
                  {col.label}
                  {orderBy === col.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : (
                <>{col.headerName}</>
              )}
            </TableCell>
          );
        } else if (col.id === "image_url") {
          return (
            <TableCell
              className={classesTh.th}
              key={col.id}
              sortDirection={orderBy === col.id ? order : false}
              style={{
                textAlign: "center",
                minWidth: col.minWidth,
                padding: "10px",
                position: "sticky",
                left: 0,
                zIndex: 20,
                fontWeight: "bold",
              }}
            ></TableCell>
          );
        } else if (col.id === "no") {
          return (
            <TableCell
              className={classesTh.th}
              key={col.id}
              sortDirection={orderBy === col.id ? order : false}
              style={{
                textAlign: "left",
                minWidth: col.minWidth,
                padding: "18px",
                position: "sticky",
                left: 0,
                zIndex: 20,
                fontWeight: "bold",
              }}
            >
              {col.label}
            </TableCell>
          );
        } else {
          return (
            <TableCell
              className={classesTh.th}
              key={col.id}
              sortDirection={orderBy === col.id ? order : false}
              style={{
                textAlign: "center",
                minWidth: col.minWidth,
                padding: "16px",
                fontWeight: "bold",
              }}
            >
              {isNaN(col.id) ? (
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : "asc"}
                  onClick={createSort(col.id)}
                  className={classesTh.label}
                >
                  {col.label}
                  {orderBy === col.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : (
                <>{col.headerName}</>
              )}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
}
