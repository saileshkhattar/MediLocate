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
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { useNavigate } from "react-router-dom";
import AddMedicine from "../../Components/AddMedicine";
import { useState, useEffect } from "react";
import CompleteProfilePopup from "../../Components/CompleteProfileCard";
import PharmacyNavbar from "../../Components/PharamcyNavabr";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

function PharmacyHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editproduct, setEditproduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(user._id);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/pharmacy/${user._id}/products`,
        { withCredentials: true }
      );
      console.log(res.data.products);
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

  const handleAddclick = () => {
    setEditproduct(null);
    setOpen(true);
  };

  const handleEditclick = (product) => {
    console.log("FwefwefwefwEdit productefwe");
    setEditproduct(product);
    setOpen(true);
  };

  const handleMedicineAdded = () => {
    fetchProducts(); // refresh list
  };

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
                  label={`${products?.length || 0} Items`}
                  size="small"
                  sx={{ ml: "auto", bgcolor: "#e3f2fd", color: "#1976d2" }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Manage your complete inventory and product catalog
              </Typography>

              {/* Products List */}
              {products && products.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {products.slice(0, 5).map((product) => (
                    <Card
                      key={product._id}
                      sx={{
                        bgcolor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "#f8fafc",
                          borderColor: "#667eea",
                          transform: "translateX(2px)",
                        },
                      }}
                      onClick={() => handleEditclick(product)}
                    >
                      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box display="flex" alignItems="center" gap={2}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "8px",
                                bgcolor: "#f0f9ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <LocalPharmacyIcon
                                sx={{ color: "#0369a1", fontSize: "1.2rem" }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="body1"
                                fontWeight="600"
                                color="#1a202c"
                              >
                                {product.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {product.category} • {product.power}
                              </Typography>
                            </Box>
                          </Box>

                          <Box display="flex" alignItems="center" gap={2}>
                            <Box textAlign="right">
                              <Typography
                                variant="body1"
                                fontWeight="600"
                                color="#1a202c"
                              >
                                {product.discountedPrice ? (
                                  <>
                                    ₹{product.discountedPrice}
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                        ml: 0.5,
                                      }}
                                    >
                                      ₹{product.price}
                                    </Typography>
                                  </>
                                ) : (
                                  `₹${product.price}`
                                )}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Stock: {product.quantity}
                              </Typography>
                            </Box>

                            <Chip
                              label={
                                product.quantity > 10
                                  ? "In Stock"
                                  : product.quantity > 0
                                  ? "Low Stock"
                                  : "Out of Stock"
                              }
                              size="small"
                              color={
                                product.quantity > 10
                                  ? "success"
                                  : product.quantity > 0
                                  ? "warning"
                                  : "error"
                              }
                              sx={{ fontSize: "0.7rem", minWidth: "70px" }}
                            />
                          </Box>
                        </Box>

                        {product.discountedPrice && (
                          <Box
                            sx={{
                              mt: 1,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Chip
                              label={`${Math.round(
                                ((product.price - product.discountedPrice) /
                                  product.price) *
                                  100
                              )}% OFF`}
                              size="small"
                              color="success"
                              sx={{ fontSize: "0.65rem" }}
                            />
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {products.length > 5 && (
                    <Button
                      variant="text"
                      sx={{
                        mt: 1,
                        color: "#667eea",
                        "&:hover": { bgcolor: "#f0f9ff" },
                      }}
                      onClick={() => navigate(`/pharmacy/${user._id}`)}
                    >
                      View All {products.length} Products
                    </Button>
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    minHeight: "80px",
                    bgcolor: "#f8fafc",
                    borderRadius: "8px",
                    p: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary" pt={2}>
                    No products found. Add your first product to get started.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAddclick}
                    sx={{ mt: 1, borderColor: "#667eea", color: "#667eea" }}
                  >
                    Add Product
                  </Button>
                </Box>
              )}
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
          onClick={handleAddclick}
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

        <AddMedicine
          open={open}
          handleClose={() => {
            setOpen(false);
            setEditproduct(null);
          }}
          onSuccess={handleMedicineAdded}
          product={editproduct}
        />
        <CompleteProfilePopup />
      </Box>
    </>
  );
}

export default PharmacyHome;
