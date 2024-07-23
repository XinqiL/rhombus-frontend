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
import toast from "react-hot-toast";

const Form = ({
  fileData,
  setFileData,
  apiResponse,
  setApiResponse,
  handleFetchNewData,
  setDialogOpen,
}) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = async (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiResponse((prevState) => ({ ...prevState, isLoading: true }));

    try {
      const data = await generateRegex(
        description,
        `files/${fileData.fileName}`
      );
      setApiResponse({
        isLoading: false,
        success: true,
        message: data.message,
      });
      toast.success("Data processed successfully!");

      handleFetchNewData(data.new_url);
    } catch (error) {
      console.error(error);
      setApiResponse({
        isLoading: false,
        success: false,
        message: error.message || "Failed to process the request.",
      });
      console.log(apiResponse);
      setDialogOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUploader setFileData={setFileData} />
      <Typography variant="body1" className="text-left">
        Describe Your Pattern and Specify Replacement Value.
      </Typography>
      <Typography variant="body2" className="text-left">
        For example, "Find email addresses in the Email column and replace them
        with 'REDACTED'.".
      </Typography>
      <Box className="my-4">
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
        disabled={apiResponse.isLoading}
      >
        {apiResponse.isLoading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
    </form>
  );
};

export default Form;
