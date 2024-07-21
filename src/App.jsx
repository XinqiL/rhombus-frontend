import React, { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import { Paper, Typography } from "@mui/material";
import { readFile } from "./utils/helper";
import Form from "./components/Form";

function App() {
  const [fileData, setFileData] = useState({
    columns: [],
    rows: [],
    fileName: "",
  });
  const [apiResponse, setApiResponse] = useState({
    success: false,
    message: "",
  });

  const [newFileData, setNewFileData] = useState({
    columns: [],
    rows: [],
    fileName: "",
  });

  const handleFetchNewData = async (newUrl) => {
    try {
      const newData = await readFile(newUrl);
      if (newData.length > 0) {
        const columns = newData[0];
        const rows = newData.slice(1);

        setNewFileData({
          columns: columns,
          rows: rows,
          fileName: "Processed Output Data",
        });
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Failed to fetch new data:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, minWidth: 650 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Regex Pattern Matching and Replacement Tool
      </Typography>

      <Form
        fileData={fileData}
        setFileData={setFileData}
        setApiResponse={setApiResponse}
        handleFetchNewData={handleFetchNewData}
      />

      {fileData.fileName && (
        <DataTable
          columns={fileData.columns}
          rows={fileData.rows}
          fileName={fileData.fileName}
        />
      )}

      {newFileData.fileName && (
        <>
          <Typography
            color={apiResponse.success ? "primary" : "error"}
            sx={{ marginTop: 4 }}
          >
            {apiResponse.message}
          </Typography>
          <DataTable
            columns={newFileData.columns}
            rows={newFileData.rows}
            fileName={newFileData.fileName}
          />
        </>
      )}
    </Paper>
  );
}

export default App;
