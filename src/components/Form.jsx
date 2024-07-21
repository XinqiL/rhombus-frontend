import React, { useState } from "react";
import FileUploader from "./FileUploader";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { generateRegex } from "../services/api";

const Form = ({
  fileData,
  setFileData,
  setApiResponse,
  handleFetchNewData,
}) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDescriptionChange = async (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    generateRegex(description, `files/${fileData.fileName}`)
      .then((data) => {
        setApiResponse({
          success: true,
          message: data.message,
        });
        handleFetchNewData(data.new_url);
      })
      .catch((error) => {
        console.error("Error submitting the description:", error);
        setApiResponse({
          success: false,
          message: "Failed to process the request.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUploader setFileData={setFileData} />
      <Typography variant="body1">
        Describe Your Pattern and Specify Replacement Value.
      </Typography>
      <Typography variant="body2">
        For example, "Find email addresses in the Email column and replace them
        with 'REDACTED'.".
      </Typography>
      <Box sx={{ marginBottom: 2, marginTop: 2 }}>
        <TextField
          required
          label="Prompt"
          variant="outlined"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          multiline
          rows={4}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </form>
  );
};

export default Form;
