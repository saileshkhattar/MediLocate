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
  Link as MuiLink,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  TextField,
  InputAdornment,
  Container,
  Chip,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import useSearch from "../Hooks/Search";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { query, setQuery, suggestions } = useSearch();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleAccountMenuOpen = (event) =>
    setAccountMenuAnchor(event.currentTarget);
  const handleAccountMenuClose = () => setAccountMenuAnchor(null);

  const handleLogout = () => {
    console.log("logging out");
    logout();
    handleAccountMenuClose();
    navigate("/user-auth");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchValue);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const getUserInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : "U";
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{ justifyContent: "space-between", minHeight: 72, py: 1 }}
          >
            {/* Logo Section */}
            <Box display="flex" alignItems="center">
              <MuiLink
                component={Link}
                to="/"
                underline="none"
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="white">
                    M
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="700"
                  sx={{
                    background: "linear-gradient(45deg, #fff 30%, #e3f2fd 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  MediLocate
                </Typography>
              </MuiLink>
            </Box>

            {/* Search Bar - Desktop */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: { xs: "none", md: "flex" },
                flex: 1,
                justifyContent: "center",
                mx: 4,
                maxWidth: 500,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Search medicines, supplements..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderRadius: "25px",
                  backdropFilter: "blur(10px)",
                  "& fieldset": {
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "25px",
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    "&::placeholder": {
                      color: "rgba(255,255,255,0.7)",
                      opacity: 1,
                    },
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255,255,255,0.7)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {suggestions.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 225,
                    width: 450,
                    zIndex: 999,
                    maxHeight: 200,
                    overflowY: "auto",
                    borderRadius: "12px", // Add rounded corners
                    mt: 1, // Add margin top for spacing
                    border: "1px solid #e2e8f0", // Add subtle border
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)", // Better shadow
                  }}
                >
                  <List sx={{ py: 0 }}>
                    {suggestions.map((s, i) => (
                      <ListItem
                        button
                        key={i}
                        onClick={() => navigate(`/search/${s.type}/${s.id}`)}
                        sx={{
                          py: 1.5,
                          px: 3,
                          borderBottom:
                            i < suggestions.length - 1
                              ? "1px solid #f1f5f9"
                              : "none",
                          "&:hover": { bgcolor: "#f8fafc" },
                          "&:last-child": { borderRadius: "0 0 12px 12px" },
                        }}
                      >
                        <ListItemText
                          primary={s.name}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.95rem",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "12px",
                    px: 2,
                    py: 1,
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* Action Icons */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}
              >
                <IconButton
                  color="inherit"
                  sx={{
                    borderRadius: "12px",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                  }}
                >
                  <Badge badgeContent={2} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  color="inherit"
                  sx={{
                    borderRadius: "12px",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  color="inherit"
                  sx={{
                    borderRadius: "12px",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                  }}
                >
                  <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Box>

              {/* User Section */}
              {user ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}
                >
                  <Box sx={{ display: { xs: "none", lg: "block" } }}>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, fontSize: "0.85rem" }}
                    >
                      Welcome back
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {user.name}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={handleAccountMenuOpen}
                    sx={{
                      p: 0,
                      border: "2px solid rgba(255,255,255,0.3)",
                      "&:hover": {
                        border: "2px solid rgba(255,255,255,0.5)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: "bold",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {getUserInitial()}
                    </Avatar>
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                  <Button
                    component={Link}
                    to="/user-auth"
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      borderRadius: "12px",
                      px: 3,
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/user-auth"
                    variant="contained"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      borderRadius: "12px",
                      px: 3,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                display: { md: "none" },
                borderRadius: "12px",
                "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Account Menu */}
      <Menu
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        onClose={handleAccountMenuClose}
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: "12px",
            mt: 1,
            minWidth: 200,
            "& .MuiMenuItem-root": {
              borderRadius: "8px",
              mx: 1,
              my: 0.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleAccountMenuClose}>
          <AccountCircleIcon sx={{ mr: 2 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>
          <DashboardIcon sx={{ mr: 2 }} />
          Dashboard
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 280,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            MediLocate
          </Typography>

          {user && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Welcome
              </Typography>
              <Typography variant="h6" fontWeight="600">
                {user.name}
              </Typography>
            </Box>
          )}

          {/* Mobile Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search..."
            sx={{
              mb: 3,
              bgcolor: "rgba(255,255,255,0.15)",
              borderRadius: "12px",
              "& fieldset": {
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
              },
              "& .MuiInputBase-input": {
                color: "white",
                "&::placeholder": {
                  color: "rgba(255,255,255,0.7)",
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: "12px",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.3)" }} />

          {user ? (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}
                sx={{
                  borderRadius: "12px",
                  color: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                }}
              >
                <LogoutIcon sx={{ mr: 2 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/user-auth"
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: "12px",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                }}
              >
                <PersonIcon sx={{ mr: 2 }} />
                <ListItemText primary="Login / Sign Up" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
