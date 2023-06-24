import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  ListItem,
  List,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Instagram,
  Twitter,
  Telegram,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";

export const Footer = (): JSX.Element => {
  const theme = useTheme();

  return (
    <footer>
      <Box
        sx={{
          backgroundColor: "#C49D5E",
          padding: "20px 0",
        }}
      >
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
      </Box>

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "460px",
            marginBottom: "30px",
            padding: "20px 0",
            fontFamily: "Roboto, Arial, sans-serif",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            EVENTS
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: "20px",
            }}
          >
            <List
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <ListItem>Email</ListItem>
              <ListItem>Support</ListItem>
              <ListItem>Ticketing</ListItem>
              <ListItem>Guest Management</ListItem>
            </List>
            <List sx={{ color: theme.palette.text.primary }}>
              <ListItem>Partners</ListItem>
              <ListItem>Carreers</ListItem>
              <ListItem>Management team</ListItem>
            </List>
          </Box>
        </Box>
      </Container>
      <Divider />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 0",
          }}
        >
          <Typography sx={{ color: theme.palette.text.primary }}>
            &#169; 2022 - A Project Built with Next.js
          </Typography>
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
      </Container>
    </footer>
  );
};
