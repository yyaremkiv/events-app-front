import { Box } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EventIcon from "@mui/icons-material/Event";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
      cursor: "pointer",
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function handleClick(event) {
  event.preventDefault();
}

export const MenuNavigation = ({ list }) => {
  const getIconByIconName = (iconName) => {
    switch (iconName) {
      case "home":
        return <HomeIcon fontSize="small" />;
      case "city":
        return <LocationCityIcon fontSize="small" />;
      case "event":
        return <EventIcon fontSize="small" />;
      default:
        return null;
    }
  };
  return (
    <Box role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {list.map((link) => (
          <Box key={link.path}>
            {link.path ? (
              <Link href={link.path} passHref>
                <StyledBreadcrumb
                  component="span"
                  label={link.title}
                  icon={getIconByIconName(link.iconName)}
                />
              </Link>
            ) : (
              <StyledBreadcrumb
                component="a"
                href="/"
                label={link.title}
                icon={getIconByIconName(link.iconName)}
              />
            )}
          </Box>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//   const backgroundColor =
//     theme.palette.mode === "light"
//       ? theme.palette.grey[100]
//       : theme.palette.grey[800];
//   return {
//     backgroundColor,
//     height: theme.spacing(3),
//     color: theme.palette.text.primary,
//     fontWeight: theme.typography.fontWeightRegular,
//     "&:hover, &:focus": {
//       backgroundColor: emphasize(backgroundColor, 0.06),
//       cursor: "pointer",
//     },
//     "&:active": {
//       boxShadow: theme.shadows[1],
//       backgroundColor: emphasize(backgroundColor, 0.12),
//     },
//   };
// });
