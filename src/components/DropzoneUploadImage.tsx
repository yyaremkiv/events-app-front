import { useState } from "react";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

export const DropzoneUploadImage = ({ image, setImage }: any) => {
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const fileType = file.type;
    const fileName = file.name;
    const extension = fileName.split(".").pop();

    if (
      ![".jpg", ".jpeg", ".png"].includes(`.${extension}`) ||
      !fileType.startsWith("image/")
    ) {
      setError(
        `The file type ${extension} is not supported. Please upload a .jpg, .jpeg or .png file.`
      );
      return;
    }
    setImage(file);
    setError(null);
  };

  const handleDeleteImage = () => setImage(null);

  return (
    <Dropzone multiple={false} onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <Box>
          <FlexBetween>
            <Box
              {...getRootProps()}
              sx={{
                width: "100%",
                "&:hover": { cursor: "pointer" },
              }}
            >
              <input {...getInputProps()} />
              {!image ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "whiteGray",
                    border: `1px dashed ${theme.palette.primary.main}`,
                    borderRadius: "0.5rem",
                    p: "0.75rem",
                  }}
                >
                  <CloudUploadIcon
                    style={{
                      fontSize: "2.5rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    Drag and drop your files here. Only .jpg, .jpeg, or .png
                    files are accepted.
                  </Typography>
                  <Button
                    sx={{
                      padding: "0.25rem 2rem",
                      textTransform: "none",
                    }}
                  >
                    Or Click to Select
                  </Button>
                </Box>
              ) : (
                <FlexBetween>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {image.name}
                  </Typography>
                  <Tooltip title="Change the selected file" placement="top">
                    <IconButton sx={{ ml: "1rem" }}>
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                </FlexBetween>
              )}
            </Box>

            {image && (
              <Tooltip title="Delete the selected file" placement="top">
                <IconButton
                  onClick={handleDeleteImage}
                  sx={{ marginLeft: "1rem" }}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            )}
          </FlexBetween>

          {error && (
            <Typography
              color="error"
              variant="caption"
              style={{ fontSize: "0.75rem" }}
            >
              {error}
            </Typography>
          )}
        </Box>
      )}
    </Dropzone>
  );
};
