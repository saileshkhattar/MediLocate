import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
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
} from "@mui/material";

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function UserHome() {
  return (
    <>
      <Navbar />
      <Box
        bgcolor="#4CAF50"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={3}
        px={2}
        py={{ xs: 8, md: 12 }}
        textAlign="center"
      >
        <Typography variant="h2" fontWeight="bold" color="white">
          Welcome to MediLocate
        </Typography>
        <Typography variant="h5" color="white" maxWidth="700px">
          Your one stop solution for all medical needs
        </Typography>

        {/* Search Bar */}
        <TextField
          placeholder="What are you looking for today..."
          variant="outlined"
          sx={{
            borderRadius: "50px",
            backgroundColor: "white",
            "& fieldset": { borderRadius: "50px" },
            width: { xs: "90%", sm: "70%", md: "50%" },
            "& .MuiInputBase-input": {
              padding: "14px 18px",
              fontSize: "1rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Browse Products Section */}
      <Box bgcolor="#f5f5f5" py={6} px={3} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={3} color="#2E7D32">
          Browse products by category
        </Typography>
        {/* Add category cards here */}
      </Box>

      {/* Frequently Bought Products */}
      <Box bgcolor="white" py={6} px={3} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={3} color="#2E7D32">
          Frequently Bought Products
        </Typography>
        {/* Product grid here */}
      </Box>

      {/* How to Use Section */}
      <Box bgcolor="#E8F5E9" py={6} px={3} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={3} color="#1B5E20">
          How to Use?
        </Typography>
        {/* Step-by-step cards */}
      </Box>

      {/* Why Choose MediLocate */}
      <Box bgcolor="white" py={6} px={3} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={3} color="#2E7D32">
          Why Choose MediLocate
        </Typography>
        {/* Features cards */}
      </Box>

      {/* Help with Order */}
      <Box bgcolor="#f5f5f5" py={6} px={3} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={3} color="#2E7D32">
          Need help with your order?
        </Typography>
        {/* Contact options */}
      </Box>

      {/* Customer Reviews */}
      <Box bgcolor="white" py={6} px={3} textAlign="center">
        <Typography variant="h4" fontWeight="bold" mb={3} color="#2E7D32">
          Customer Reviews
        </Typography>
        {/* Review cards */}
      </Box>

      <Footer />
    </>
  );
}

export default UserHome;
