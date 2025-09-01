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
  Container,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InventoryIcon from "@mui/icons-material/Inventory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PharmacyNavbar = ({ onAddMedicine }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [notificationCount] = useState(5); // You can make this dynamic

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
  const handleAccountMenuOpen = (event) => setAccountMenuAnchor(event.currentTarget);
  const handleAccountMenuClose = () => setAccountMenuAnchor(null);

  const handleLogout = () => {
    console.log("logging out");
    logout();
    handleAccountMenuClose();
    navigate("/user-auth");
  };

  const navItems = [
    { label: "Dashboard", path: "/pharmacy-home", icon: <DashboardIcon /> },
    { label: "All Products", path: "/pharmacy/products", icon: <InventoryIcon /> },
    { label: "New Orders", path: "/pharmacy/orders/new", icon: <AssignmentIcon /> },
    { label: "Pending Orders", path: "/pharmacy/orders/pending", icon: <PendingActionsIcon /> },
    { label: "Analytics", path: "/pharmacy/analytics", icon: <AnalyticsIcon /> },
  ];

  const getUserInitial = () => {
    return user?.pharmacyName ? user.pharmacyName.charAt(0).toUpperCase() : user?.name?.charAt(0).toUpperCase() || "P";
  };

  const getDisplayName = () => {
    return user?.pharmacyName || user?.name || "Pharmacy";
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", minHeight: 72, py: 1 }}>
            {/* Logo Section */}
            <Box display="flex" alignItems="center">
              <MuiLink
                component={Link}
                to="/pharmacy-home"
                underline="none"
                sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="white">
                    M
                  </Typography>
                </Box>
                <Box>
                  <Typography 
                    variant="h6" 
                    fontWeight="700"
                    sx={{ 
                      background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.2
                    }}
                  >
                    MediLocate
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem' }}>
                    Pharmacy Portal
                  </Typography>
                </Box>
              </MuiLink>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    borderRadius: '12px',
                    px: 2,
                    py: 1,
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Action Buttons & User Section */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: 'center', gap: 1 }}>
              {/* Quick Add Medicine Button */}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddMedicine}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '12px',
                  px: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Add Medicine
              </Button>

              {/* Notifications */}
              <IconButton 
                color="inherit"
                sx={{
                  borderRadius: '12px',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                }}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* User Section */}
              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
                  <Box sx={{ display: { xs: 'none', lg: 'block' }, textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
                      {user.role === 'pharmacy' ? 'Pharmacy' : 'Welcome'}
                    </Typography>
                    <Typography variant="body1" fontWeight="600" sx={{ fontSize: '0.9rem' }}>
                      {getDisplayName()}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={handleAccountMenuOpen}
                    sx={{
                      p: 0,
                      border: '2px solid rgba(255,255,255,0.3)',
                      '&:hover': {
                        border: '2px solid rgba(255,255,255,0.5)',
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 'bold',
                        width: 40,
                        height: 40,
                      }}
                    >
                      {getUserInitial()}
                    </Avatar>
                  </IconButton>
                </Box>
              ) : (
                <Button
                  component={Link}
                  to="/user-auth"
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: '12px',
                    px: 3,
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: "none" },
                borderRadius: '12px',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
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
            borderRadius: '12px',
            mt: 1,
            minWidth: 220,
            '& .MuiMenuItem-root': {
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #f0f0f0' }}>
          <Typography variant="subtitle2" fontWeight="600">
            {getDisplayName()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        
        <MenuItem onClick={handleAccountMenuClose}>
          <AccountCircleIcon sx={{ mr: 2 }} />
          Profile Settings
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>
          <SettingsIcon sx={{ mr: 2 }} />
          Pharmacy Settings
        </MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>
          <DashboardIcon sx={{ mr: 2 }} />
          Dashboard
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            MediLocate
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Pharmacy Portal
          </Typography>
          
          {user && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {user.role === 'pharmacy' ? 'Pharmacy' : 'Welcome'}
              </Typography>
              <Typography variant="h6" fontWeight="600">
                {getDisplayName()}
              </Typography>
              <Chip 
                icon={<NotificationsIcon />}
                label={`${notificationCount} notifications`}
                size="small"
                sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </Box>
          )}
        </Box>

        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                component={Link} 
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: '12px',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                }}
              >
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              onClick={() => {
                onAddMedicine();
                handleDrawerToggle();
              }}
              sx={{
                borderRadius: '12px',
                bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              }}
            >
              <AddIcon sx={{ mr: 2 }} />
              <ListItemText primary="Add Medicine" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />

          {user ? (
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}
                sx={{
                  borderRadius: '12px',
                  color: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
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
                  borderRadius: '12px',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                }}
              >
                <AccountCircleIcon sx={{ mr: 2 }} />
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default PharmacyNavbar;