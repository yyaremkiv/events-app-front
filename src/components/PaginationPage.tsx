import { Box, Pagination } from "@mui/material";

interface IPaginationPageProps {
  page: number;
  limit: number;
  totalCount: number;
  handleChangePage: (_: any, newPageValue: number) => void;
  isLoading?: boolean;
}

export const PaginationPage = ({
  page,
  limit,
  totalCount,
  handleChangePage,
  isLoading = false,
}: IPaginationPageProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto",
      }}
    >
      <Pagination
        count={Math.ceil(totalCount / limit)}
        page={page}
        onChange={handleChangePage}
        disabled={isLoading}
      />
    </Box>
  );
};
