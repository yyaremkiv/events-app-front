import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import {
  Instagram,
  Twitter,
  Telegram,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";

export const Footer = () => {
  return (
    <footer>
      <Box sx={{ backgroundColor: "#C49D5E", padding: "20px 0" }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="700">
            Join to new events
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              maxWidth: "500px",
            }}
          />
          <Button variant="contained">Send</Button>
        </Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>&#169; 2022 - A Project Built with Next.js</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton>
              <Instagram />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <Telegram />
            </IconButton>
            <IconButton>
              <LinkedIn />
            </IconButton>
            <IconButton>
              <Facebook />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </footer>
  );
};
