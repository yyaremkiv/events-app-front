import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import css from "./Header.module.scss";
import { Box, Button, Typography } from "@mui/material";
import AuthActions from "@/redux/auth/AuthOperations";

export const Header = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  return (
    <header className={css.header}>
      <div
        className={css.topNav}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 className={css.title}>Events</h1>
        </Box>
        {isLogged ? (
          <Box>
            <Typography>Hello, Admin!</Typography>
            <Button onClick={() => dispatch(AuthActions.logout())}>
              Logout
            </Button>
          </Box>
        ) : null}
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
