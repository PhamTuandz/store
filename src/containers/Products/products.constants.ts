export interface Data {
  number_import: number;
  number_export: number;
  amount_remaining: number;
  name_products: string;
  price_import: number;
  price_export: number;
  total_import: number;
  total_export: number;
  no: number;
  actions: any;
  types: string;
}

interface IColumns {
  id: keyof Data;
  label: string;
  minWidth: number;
}

export const ColumnList: readonly IColumns[] = [
  {
    id: "no",
    label: "#",
    minWidth: 50,
  },
  {
    id: "types",
    label: "Loại sản phẩm",
    minWidth: 50,
  },
  {
    id: "name_products",
    label: "Tên sản phẩm",
    minWidth: 50,
  },
  {
    id: "number_import",
    label: "Số lượng nhập",
    minWidth: 50,
  },
  {
    id: "number_export",
    label: "Số lượng bán",
    minWidth: 50,
  },
  {
    id: "amount_remaining",
    label: "Số lượng còn lại",
    minWidth: 50,
  },
  {
    id: "price_import",
    label: "Giá nhập",
    minWidth: 50,
  },
  {
    id: "total_import",
    label: "Tổng tiền nhập",
    minWidth: 100,
  },
  {
    id: "price_export",
    label: "Giá bán",
    minWidth: 50,
  },
  {
    id: "total_export",
    label: "Tổng tiền bán",
    minWidth: 100,
  },
  {
    id: "actions",
    label: "Chức năng",
    minWidth: 200,
  },
];
