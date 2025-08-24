import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function PharmacyHome() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Page Title */}
      <Box
        bgcolor="#4CAF50"
        color="white"
        py={4}
        textAlign="center"
        px={2}
      >
        <Typography variant="h3" fontWeight="bold">
          Manage Your E-Pharmacy
        </Typography>
        <Typography variant="h6" mt={1}>
          Keep track of products, orders, and sales records
        </Typography>

        {/* Search Bar */}
        <TextField
          placeholder="Search medicines, orders..."
          variant="outlined"
          sx={{
            mt: 3,
            bgcolor: "white",
            borderRadius: "50px",
            width: { xs: "90%", sm: "70%", md: "50%" },
            "& fieldset": { borderRadius: "50px" },
            "& .MuiInputBase-input": {
              padding: "12px 16px",
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

      {/* All Products */}
      <Box bgcolor="#f5f5f5" py={4} px={3}>
        <Typography variant="h5" fontWeight="bold" color="#2E7D32" mb={2}>
          All Products
        </Typography>
        {/* Product list here */}
      </Box>

      {/* New Orders */}
      <Box bgcolor="white" py={4} px={3}>
        <Typography variant="h5" fontWeight="bold" color="#2E7D32" mb={2}>
          New Orders to be Approved
        </Typography>
        {/* Orders list */}
      </Box>

      {/* Pending Orders */}
      <Box bgcolor="#E8F5E9" py={4} px={3}>
        <Typography variant="h5" fontWeight="bold" color="#1B5E20" mb={2}>
          Pending Orders
        </Typography>
        {/* Orders list */}
      </Box>

      {/* Orders Yet to be Picked */}
      <Box bgcolor="white" py={4} px={3}>
        <Typography variant="h5" fontWeight="bold" color="#2E7D32" mb={2}>
          Orders Yet to be Picked
        </Typography>
        {/* Orders list */}
      </Box>

      {/* Sales Records */}
      <Box bgcolor="#f5f5f5" py={4} px={3}>
        <Typography variant="h5" fontWeight="bold" color="#2E7D32" mb={2}>
          Sales Records
        </Typography>
        {/* Sales charts */}
      </Box>

      {/* Floating Add Button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "#4CAF50",
          "&:hover": {
            bgcolor: "#388E3C",
          },
          borderRadius: "30px",
          paddingX: 3,
          paddingY: 1.2,
          fontWeight: "bold",
        }}
        onClick={() => navigate("/add")}
      >
        Add New Medicine
      </Button>
    </Box>
  );
};

export default PharmacyHome;
