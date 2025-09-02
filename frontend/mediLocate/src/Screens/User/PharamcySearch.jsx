import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Paper,
  Skeleton,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DirectionsIcon from "@mui/icons-material/Directions";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import StoreIcon from "@mui/icons-material/Store";
import axios from "axios";

const PharmacyStorePage = () => {
  const navigate = useNavigate();
  const [pharmacy, setPharmacy] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { id } = useParams();

  useEffect(() => {
    const fetchPharmacyStore = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/pharmacy/search/${id}`,
          { withCredentials: true }
        );

        setPharmacy(res.data.pharmacy);
        setProducts(res.data.products); // ✅ plural
      } catch (err) {
        console.error("Error fetching pharmacy:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacyStore();
  }, [id]);

  const handleWishlistToggle = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product._id]);
    console.log("Added to cart:", product.name);
  };

  const getDiscountPercentage = (original, discounted) => {
    if (!discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: "16px" }}
          />
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[1, 2, 3, 4].map((i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={250}
                  sx={{ borderRadius: "16px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Store Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: "white", mb: 3 }}
          >
            Back
          </Button>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                  src={pharmacy?.image}
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 3,
                    bgcolor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <StoreIcon sx={{ fontSize: "2rem" }} />
                </Avatar>
                <Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="h3" fontWeight="700">
                      {pharmacy?.pharmacyName}
                    </Typography>
                    {pharmacy?.verified && (
                      <VerifiedIcon
                        sx={{ color: "#4caf50", ml: 2, fontSize: "2rem" }}
                      />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {pharmacy?.name}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {pharmacy?.address}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={3} mb={2}>
                <Box display="flex" alignItems="center">
                  <StarIcon sx={{ color: "#ffc107", mr: 0.5 }} />
                  <Typography variant="h6" fontWeight="600">
                    {pharmacy?.rating}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, ml: 1 }}>
                    ({pharmacy?.totalRatings} reviews)
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <AccessTimeIcon sx={{ mr: 0.5 }} />
                  <Typography variant="body1">
                    {pharmacy?.deliveryTime} delivery
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {pharmacy?.description}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                }}
              >
                <Typography variant="h6" mb={2}>
                  Quick Actions
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PhoneIcon />}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                    }}
                    href={`tel:${pharmacy?.phone}`}
                  >
                    Call Store
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<DirectionsIcon />}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                    }}
                  >
                    Get Directions
                  </Button>
                </Box>

                <Box mt={3}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Operating Hours:
                  </Typography>
                  <Typography variant="body1" fontWeight="600">
                    {pharmacy?.operatingHours?.weekdays}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Weekends: {pharmacy?.operatingHours?.weekends}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Store Info Bar */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: "16px" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {products.filter((p) => p.inStock).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Products Available
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                {pharmacy?.deliveryFee === 0 ? (
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="success.main"
                  >
                    FREE
                  </Typography>
                ) : (
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    ₹{pharmacy?.deliveryFee}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  Delivery Fee
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="bold" color="primary">
                  ₹{pharmacy?.minimumOrder}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimum Order
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Search and Filters */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: "16px" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products in this store..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#667eea" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                  sx={{ borderRadius: "12px" }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FilterListIcon />}
                sx={{
                  borderRadius: "12px",
                  borderColor: "#667eea",
                  color: "#667eea",
                  py: 1.8,
                }}
              >
                Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        <Typography variant="h4" fontWeight="600" mb={3}>
          Available Products ({filteredProducts.length})
        </Typography>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  border: "1px solid #e2e8f0",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={product.image}
                    alt={product.name}
                    sx={{ bgcolor: "#f8fafc" }}
                  />

                  {/* Stock Badge */}
                  <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                    <Chip
                      label={product.inStock ? "In Stock" : "Out of Stock"}
                      color={product.inStock ? "success" : "error"}
                      size="small"
                      sx={{ fontSize: "0.7rem", fontWeight: 600 }}
                    />
                  </Box>

                  {/* Discount Badge */}
                  {getDiscountPercentage(
                    product.price,
                    product.discountedPrice
                  ) > 0 && (
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <Chip
                        label={`${getDiscountPercentage(
                          product.price,
                          product.discountedPrice
                        )}% OFF`}
                        color="success"
                        size="small"
                        sx={{ fontSize: "0.7rem", fontWeight: 600 }}
                      />
                    </Box>
                  )}

                  {/* Wishlist Button */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": { bgcolor: "white" },
                    }}
                    onClick={() => handleWishlistToggle(product._id)}
                  >
                    {wishlist.includes(product._id) ? (
                      <FavoriteIcon sx={{ color: "#f44336" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>

                <CardContent
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    mb={1}
                    sx={{ fontSize: "1rem" }}
                  >
                    {product.name}
                  </Typography>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        bgcolor: "#e3f2fd",
                        color: "#1976d2",
                        fontSize: "0.7rem",
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {product.power}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold" color="#1a202c">
                      ₹{product.discountedPrice || product.price}
                    </Typography>
                    {product.discountedPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          ml: 1,
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                    )}
                  </Box>

                  {product.inStock && (
                    <Typography variant="caption" color="text.secondary" mb={2}>
                      {product.quantity} units available
                    </Typography>
                  )}

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<AddShoppingCartIcon />}
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        borderRadius: "8px",
                        background: product.inStock
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "#cbd5e0",
                        "&:hover": {
                          background: product.inStock
                            ? "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)"
                            : "#cbd5e0",
                        },
                      }}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <Paper sx={{ p: 6, textAlign: "center", borderRadius: "16px" }}>
            <LocalPharmacyIcon
              sx={{ fontSize: "4rem", color: "#cbd5e0", mb: 2 }}
            />
            <Typography variant="h5" fontWeight="600" mb={1}>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Try adjusting your search or browse all categories
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              sx={{ borderRadius: "12px" }}
            >
              Clear Filters
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default PharmacyStorePage;
