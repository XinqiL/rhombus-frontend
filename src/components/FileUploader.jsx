import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { downloadFile, uploadFile } from "../services/firebase";
import { parseCSV, parseExcel } from "../utils/helper";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function FileUploader({ setFileData }) {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const downloadUrl = await uploadFile(file);
      const fileData = await downloadFile(downloadUrl);
      let parsedData;
      if (file.type.includes("csv")) {
        const text = await fileData.text();
        parsedData = parseCSV(text);
      } else if (file.type.includes("excel") || file.name.endsWith(".xlsx")) {
        const arrayBuffer = await fileData.arrayBuffer();
        parsedData = parseExcel(arrayBuffer);
      } else {
        throw new Error("Unsupported file type");
      }
      console.log("Parsed Data:", parsedData);
      setFileData({
        columns: parsedData[0] ? Object.keys(parsedData[0]) : [],
        rows: parsedData.map((row) => Object.values(row)),
        fileName: file.name,
      });
    } catch (error) {
      console.error("Error during file processing:", error);
    }
  };

  return (
    <div className="p-5">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload csv or Excel file
        <VisuallyHiddenInput
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileUpload}
        />
      </Button>
    </div>
  );
}

export default FileUploader;
