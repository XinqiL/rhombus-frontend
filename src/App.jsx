import React, { useState } from "react";
import "./App.css";
import DataTable from "./components/DataTable";
import { Paper, Typography } from "@mui/material";
import { readFile } from "./utils/helper";
import Form from "./components/Form";
import ErrorDialog from "./components/ErrorDialog";
import { Toaster } from "react-hot-toast";

function App() {
  const [fileData, setFileData] = useState({
    columns: [],
    rows: [],
    fileName: "",
  });
  const [apiResponse, setApiResponse] = useState({
    isLoading: false,
    success: false,
    message: "",
  });

  const [newFileData, setNewFileData] = useState({
    columns: [],
    rows: [],
    fileName: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

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
    <Paper
      className="min-h-screen p-6 min-w-[650px] overflow-auto"
      elevation={3}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h6" className="mb-2">
        Regex Pattern Matching and Replacement Tool
      </Typography>
      <Form
        fileData={fileData}
        setFileData={setFileData}
        apiResponse={apiResponse}
        setApiResponse={setApiResponse}
        handleFetchNewData={handleFetchNewData}
        setDialogOpen={setDialogOpen}
      />

      {fileData.fileName && (
        <DataTable
          columns={fileData.columns}
          rows={fileData.rows}
          fileName={fileData.fileName}
        />
      )}

      {newFileData.fileName && apiResponse.success === true && (
        <DataTable
          columns={newFileData.columns}
          rows={newFileData.rows}
          fileName={newFileData.fileName}
        />
      )}
      <ErrorDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        apiResponse={apiResponse}
      />
    </Paper>
  );
}

export default App;
