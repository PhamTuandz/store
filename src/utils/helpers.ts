export type Order = "asc" | "desc";

export class AppHelpers {
  static descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  static getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => AppHelpers.descendingComparator(a, b, orderBy)
      : (a, b) => -AppHelpers.descendingComparator(a, b, orderBy);
  }

  static stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  static amountRemaining(valImport: any, valExport: any) {
    return valImport - valExport;
  }

  static generateUUIDV4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static titleProduct(arrTitle: any[], title: string) {
    const filterArr = arrTitle.filter((item: any) => item.value === title);
    if (filterArr && filterArr.length) {
      return filterArr.reduce((value: any) => {
        return { ...value };
      });
    }
  }
}
