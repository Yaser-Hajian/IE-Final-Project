import * as XLSX from "xlsx";

const readExcel = (excelFile) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const newList = [];
      for (let row in excelData) {
        if (row != 0 && excelData[row].length != 0) {
          const newItem = {};
          for (let item in excelData[row]) {
            newItem[excelData[0][item]] = excelData[row][item];
          }
          newList.push(newItem);
        }
      }
      res(newList);
    };
    reader.onerror = (err) => {
      rej(false, err);
    };
    reader.readAsArrayBuffer(excelFile);
  });
};

export default readExcel;
