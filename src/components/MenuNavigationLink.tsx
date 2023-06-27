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
        display: "flex",
        justifyContent: "center",
        padding: "0.5rem 0",
      }}
    >
      {linkValues.map((item, index) => (
        <ListItem
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Link
            href={item.href}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              sx={{ fontSize: "1.2rem", color: theme.palette.text.primary }}
            >
              {item.text}
            </Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
