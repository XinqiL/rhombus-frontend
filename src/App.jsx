import React, { useState } from "react";
import "./App.css";
import FileUploader from "./components/FileUploader";
import DataTable from "./components/DataTable";

function App() {
  const [fileData, setFileData] = useState({
    columns: [],
    rows: [],
    fileName: "",
  });

  return (
    <>
      <FileUploader setFileData={setFileData} />
      <DataTable
        columns={fileData.columns}
        rows={fileData.rows}
        fileName={fileData.fileName}
      />
    </>
  );
}

export default App;
