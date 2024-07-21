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

export const readFile = async (url) => {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);

  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};
