import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link as MuiLink
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, role, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", minHeight:720 }}>
          <MuiLink component={Link} to="/" underline="hover" color="inherit" variant="h4">
                MediLocate
            </MuiLink>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}

            {isLoggedIn ? (
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { sm: "none" } }}
      >
        <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {isLoggedIn ? (
              <ListItem disablePadding>
                <ListItemButton onClick={onLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login">
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;