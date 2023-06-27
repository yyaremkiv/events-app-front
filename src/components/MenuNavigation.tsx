import Link from "next/link";
import { Box, Chip, Breadcrumbs } from "@mui/material";
import { emphasize, styled } from "@mui/material/styles";
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Event as EventIcon,
  LocationCity as LocationCityIcon,
  Info as InfoIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";

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

function handleClick(event: any) {
  event.preventDefault();
}

interface IMenuItem {
  title: string | null;
  path: string;
  iconName: string;
}

interface IMenuNavigationProps {
  list: IMenuItem[];
}

export const MenuNavigation = ({ list }: IMenuNavigationProps) => {
  const getIconByIconName = (iconName: any) => {
    switch (iconName) {
      case "home":
        return <HomeIcon fontSize="small" />;
      case "about":
        return <InfoIcon fontSize="small" />;
      case "event":
        return <EventIcon fontSize="small" />;
      case "city":
        return <ApartmentIcon fontSize="small" />;
      case "cities":
        return <LocationCityIcon fontSize="small" />;
      case "admin":
        return <AdminPanelSettingsIcon fontSize="small" />;
      default:
        return null;
    }
  };
  return (
    <Box role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {list.map((link: any) => (
          <Box key={link.path}>
            {link.path ? (
              <Link href={link.path} passHref>
                <StyledBreadcrumb
                  component="span"
                  label={link.title}
                  // @ts-ignore
                  icon={getIconByIconName(link.iconName)}
                />
              </Link>
            ) : (
              <StyledBreadcrumb
                component="a"
                href="/"
                label={link.title}
                // @ts-ignore
                icon={getIconByIconName(link.iconName)}
              />
            )}
          </Box>
        ))}
      </Breadcrumbs>
    </Box>
  );
};
