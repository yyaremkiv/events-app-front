import { MenuNavigation } from "../components/MenuNavigation";
import { Box, Container, Typography, useTheme } from "@mui/material";

const list = [
  { title: "Home", path: "/", iconName: "home" },
  { title: "About", path: "", iconName: "about" },
];

const AboutUsPage = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ flex: 1 }}>
      <Box sx={{ color: theme.palette.text.primary }}>
        <Box sx={{ padding: "1rem 0" }}>
          <MenuNavigation list={list} />
        </Box>

        <Typography variant="h4">About us Page</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
