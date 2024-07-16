import * as XLSX from "xlsx";
import Papa from "papaparse";

export function parseCSV(text) {
  return Papa.parse(text, { header: true, skipEmptyLines: true }).data;
}

export function parseExcel(arrayBuffer) {
  const workbook = XLSX.read(arrayBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { header: 0 });
}
