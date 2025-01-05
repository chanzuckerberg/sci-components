import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import Tag from "../Tag";
import { StyledNavigationBar } from "./style";

/**
 * TODO-AH: Handle nested menus:
 * - when a list of primary links are flat, each should appear as a clickable link/button
 * - when they are structured (an entry that is an array, perhaps?) it should generate a menu
 * - the menu should have a label
 * - in responsive collapsed mode, the subitems should appear as indented under the label
 */
// TODO-AH: add props
const primaryLinks = [
  {
    label: "Primary Link 1",
    url: "https://example.com/1/1",
  },
  {
    label: "Primary Link 2",
    url: "https://example.com/1/2",
  },
  {
    label: "Primary Link 3",
    url: "https://example.com/1/3",
  },
];

// TODO-AH: add props
const secondaryLinks = [
  {
    label: "Secondary Link 1",
    url: "https://example.com/2/1",
  },
];

// TODO-AH: add props
const siteStatus = "beta";

/**
 * A top navigation bar, using sensible defaults. Based on the Material UI App Bar
 * @see https://mui.com/material-ui/react-app-bar/
 */
export default function NavigationBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledNavigationBar position="static">
        <Toolbar>
          <Box sx={{ alignItems: "center", display: "flex", flexGrow: 1 }}>
            <Typography variant="h1" component="div">
              {/* TODO-AH: add props for text/image */}
              Logo Here
            </Typography>
            {siteStatus === "beta" && (
              <Tag color="info" label="Beta" sx={{ ml: 2 }} />
            )}
          </Box>
          {!isMobile && (
            <>
              <Box sx={{ textAlign: "right" }}>
                {/* TODO-AH - add handling for click (and other behaviors, e.g., tracking) */}
                {primaryLinks.map((link) => (
                  <Button key={link.label} color="inherit">
                    {link.label}
                  </Button>
                ))}
              </Box>
              <Box sx={{ textAlign: "right" }}>
                {secondaryLinks.map((link) => (
                  <Button key={link.label} color="inherit">
                    {link.label}
                  </Button>
                ))}
              </Box>
            </>
          )}
          {isMobile && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {primaryLinks.map((link) => (
                  <MenuItem key={link.label} color="inherit">
                    {link.label}
                  </MenuItem>
                ))}
                {secondaryLinks.map((link) => (
                  <MenuItem key={link.label} color="inherit">
                    {link.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </StyledNavigationBar>
    </Box>
  );
}
