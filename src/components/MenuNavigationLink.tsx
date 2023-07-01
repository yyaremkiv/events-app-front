import Link from "next/link";
import { List, ListItem, Typography, useTheme } from "@mui/material";

const linkValues = [
  { href: "/", text: "Home" },
  { href: "/cities", text: "Cities" },
  { href: "/about-us", text: "About Us" },
  { href: "/admin", text: "Admin" },
];

export const MenuNavigationLink = () => {
  const theme = useTheme();

  return (
    <List
      sx={{
        width: "70%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {linkValues.map((item, index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "fit-content",
          }}
        >
          <Link
            href={item.href}
            style={{
              textDecoration: "none",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: theme.palette.text.primary,

                "&::after": {
                  content: "''",
                  width: "0",
                  height: "3px",
                  position: "absolute",
                  bottom: "-5px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: theme.palette.primary.main,
                  transition: "width 200ms linear",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {item.text}
            </Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
