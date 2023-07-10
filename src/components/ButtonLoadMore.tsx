import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Refresh as RefreshIcon } from "@mui/icons-material";

interface IButtonLoadMoreProps {
  text?: string;
  handleLoadMore: () => void;
  isLoading?: boolean;
}

export const ButtonLoadMore = ({
  text,
  handleLoadMore,
  isLoading = false,
}: IButtonLoadMoreProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <LoadingButton
        variant="text"
        loadingPosition="start"
        startIcon={<RefreshIcon />}
        loading={isLoading}
        onClick={handleLoadMore}
        sx={{
          p: "0.75rem 2rem",
          fontSize: "1rem",
          color: "inherit",
          textTransform: "none",
        }}
      >
        <span>{text ? text : "Load more!"}</span>
      </LoadingButton>
    </Box>
  );
};
