import { Box, Typography, useTheme } from "@mui/material";

interface IMessageErrorProps {
  text: string;
  errorMessage: boolean;
}

export const MessageError = ({
  text,
  errorMessage,
}: IMessageErrorProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "1rem 0",
        color: theme.palette.text.primary,
      }}
    >
      {errorMessage ? (
        <Typography variant="h4" color="error">
          {text}
        </Typography>
      ) : (
        <Typography variant="h4">{text}</Typography>
      )}
    </Box>
  );
};
