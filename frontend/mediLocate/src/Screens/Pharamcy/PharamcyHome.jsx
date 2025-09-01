import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InventoryIcon from "@mui/icons-material/Inventory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useNavigate } from "react-router-dom";
import AddMedicine from "../../Components/AddMedicine";
import { useState, useEffect } from "react";
import CompleteProfilePopup from "../../Components/CompleteProfileCard";
import PharmacyNavbar from "../../Components/PharamcyNavabr";
import { useAuth } from "../../Context/AuthContext";

function PharmacyHome() {
  const { user } = useAuth()
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(user._id)

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/pharmacy/${user._id}/products`,
        { withCredentials: true }
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchProducts();
    }
  }, [user]);

  const handleMedicineAdded = () => {
    fetchProducts(); // refresh list
  };

  console.log(products)



  return (
    <>
      <PharmacyNavbar />
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
        {/* Header Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: { xs: 4, md: 6 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Container maxWidth="lg">
            <Box textAlign="center" position="relative" zIndex={1}>
              <Typography
                variant="h1"
                fontWeight="700"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  mb: 2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  background: "linear-gradient(45deg, #fff 30%, #e3f2fd 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MediLocate
              </Typography>
              <Typography
                variant="h2"
                fontWeight="700"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                E-Pharmacy Dashboard
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                Streamline your pharmacy operations with ease
              </Typography>

              {/* Enhanced Search Bar */}
              <Paper
                elevation={8}
                sx={{
                  borderRadius: "50px",
                  overflow: "hidden",
                  maxWidth: { xs: "100%", sm: "500px" },
                  mx: "auto",
                  bgcolor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search medicines, orders, or records..."
                  variant="outlined"
                  sx={{
                    "& fieldset": { border: "none" },
                    "& .MuiInputBase-input": {
                      padding: "16px 20px",
                      fontSize: "1.1rem",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#667eea", ml: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Paper>
            </Box>

            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                transform: "translate(50%, -50%)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                transform: "translate(-50%, 50%)",
              }}
            />
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* All Products - Full Width */}
          <Card
            elevation={3}
            sx={{
              borderRadius: "16px",
              mb: 4,
              border: "1px solid #e2e8f0",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Box
                  sx={{
                    bgcolor: "#e3f2fd",
                    borderRadius: "10px",
                    p: 1,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <InventoryIcon
                    sx={{ color: "#1976d2", fontSize: "1.25rem" }}
                  />
                </Box>
                <Typography variant="h5" fontWeight="600" color="#1a202c">
                  All Products
                </Typography>
                <Chip
                  label="245 Items"
                  size="small"
                  sx={{ ml: "auto", bgcolor: "#e3f2fd", color: "#1976d2" }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Manage your complete inventory and product catalog
              </Typography>
              <Box
                sx={{
                  minHeight: "80px",
                  bgcolor: "#f8fafc",
                  borderRadius: "8px",
                  p: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  pt={2}
                >
                  Product list will be displayed here
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Orders Grid - Equal Width Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  height: "220px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        bgcolor: "#fff3e0",
                        borderRadius: "10px",
                        p: 1,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AssignmentIcon
                        sx={{ color: "#f57c00", fontSize: "1.25rem" }}
                      />
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="600" color="#1a202c">
                        New Orders
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Awaiting approval
                      </Typography>
                    </Box>
                    <Chip label="12 New" size="small" color="warning" />
                  </Box>
                  <Box
                    sx={{
                      minHeight: "80px",
                      minWidth: { sm: "400px", md: "475px" },
                      bgcolor: "#f8fafc",
                      borderRadius: "8px",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      New orders list
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  height: "220px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        bgcolor: "#e8f5e9",
                        borderRadius: "10px",
                        p: 1,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PendingActionsIcon
                        sx={{ color: "#2e7d32", fontSize: "1.25rem" }}
                      />
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="600" color="#1a202c">
                        Pending Orders
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        In processing
                      </Typography>
                    </Box>
                    <Chip label="8 Active" size="small" color="success" />
                  </Box>
                  <Box
                    sx={{
                      minHeight: "80px",
                      minWidth: { sm: "400px", md: "475px" },
                      bgcolor: "#f8fafc",
                      borderRadius: "8px",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Pending orders list
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  height: "220px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        bgcolor: "#fce4ec",
                        borderRadius: "10px",
                        p: 1,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LocalShippingIcon
                        sx={{ color: "#c2185b", fontSize: "1.25rem" }}
                      />
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="600" color="#1a202c">
                        Ready for Pickup
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Awaiting collection
                      </Typography>
                    </Box>
                    <Chip
                      label="5 Ready"
                      size="small"
                      sx={{ bgcolor: "#fce4ec", color: "#c2185b" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      minHeight: "80px",
                      minWidth: { sm: "400px", md: "475px" },
                      bgcolor: "#f8fafc",
                      borderRadius: "8px",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Pickup orders list
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  height: "220px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        bgcolor: "#f3e5f5",
                        borderRadius: "10px",
                        p: 1,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AnalyticsIcon
                        sx={{ color: "#7b1fa2", fontSize: "1.25rem" }}
                      />
                    </Box>
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="600" color="#1a202c">
                        Sales Analytics
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Performance insights
                      </Typography>
                    </Box>
                    <Chip label="↗ 12%" size="small" color="success" />
                  </Box>
                  <Box
                    sx={{
                      minHeight: "80px",
                      minWidth: { sm: "400px", md: "475px" },
                      bgcolor: "#f8fafc",
                      borderRadius: "8px",
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Sales charts and metrics
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Enhanced Floating Add Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: { xs: 20, md: 30 },
            right: { xs: 20, md: 30 },
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: "50px",
            px: 3,
            py: 1.5,
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px) scale(1.05)",
              boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
              background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
            },
          }}
        >
          Add Medicine
        </Button>

        <AddMedicine open={open} handleClose={() => setOpen(false)} onSuccess={handleMedicineAdded} />
        <CompleteProfilePopup />
      </Box>
    </>
  );
}

export default PharmacyHome;
