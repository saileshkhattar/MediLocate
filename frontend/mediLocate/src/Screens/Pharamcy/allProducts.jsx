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
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import WarningIcon from "@mui/icons-material/Warning";
import { useParams } from "react-router-dom";
import axios from "axios";

const PharmacyProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  // Mock data - replace with actual API calls
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/pharmacy/${id}/products`,
        { withCredentials: true }
      );

      setProducts(res.data.products);
      console.log(products)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const categories = [
    "all",
    "Medicine",
    "Supplements",
    "Equipment",
    "Personal Care",
    "Baby Care",
    "Other",
  ];

  const getStockStatusColor = (status) => {
    switch (status) {
      case "out-of-stock":
        return "error"; // red
      case "low-stock":
        return "warning"; // orange/yellow
      default:
        return "success"; // green
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return "out-of-stock";
    if (quantity > 0 && quantity < 10) return "low-stock";
    return "in-stock";
  };

  const getDiscountPercentage = (price, discountedPrice) => {
    if (!discountedPrice) return null;
    return Math.round(((price - discountedPrice) / price) * 100);
  };

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    // Handle product deletion
    console.log("Deleting product:", selectedProduct);
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: products.length,
    lowStock: products.filter((p) => p.quantity > 0 && p.quantity < 10).length,
    active: products.filter((p) => p.quantity > 10).length,
    outOfStock: products.filter((p) => p.quantity === 0).length,
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="700" mb={2}>
            Product Management
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Manage your pharmacy inventory and product catalog
          </Typography>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h4" fontWeight="bold" color="white">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Total Products
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h4" fontWeight="bold" color="white">
                  {stats.active}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Active Products
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h4" fontWeight="bold" color="white">
                  {stats.lowStock}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Low Stock
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h4" fontWeight="bold" color="white">
                  {stats.outOfStock}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Out of Stock
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Filters and Search */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: "16px" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search products..."
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
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                  sx={{ borderRadius: "12px" }}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="stock">Stock Quantity</MenuItem>
                  <MenuItem value="sales">Best Selling</MenuItem>
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
                  py: 1.5,
                }}
              >
                Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  border: "1px solid #e2e8f0",
                  minWidth: { lg: "350px", md: "250px" },
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
                    image={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    sx={{ bgcolor: "#f8fafc" }}
                  />

                  {/* Status Badges  */}
                  <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                    <Chip
                      label={getStockStatus(product.quantity).replace("-", " ")}
                      color={getStockStatusColor(
                        getStockStatus(product.quantity)
                      )}
                      size="small"
                      sx={{ fontSize: "0.7rem", fontWeight: 600 }}
                    />
                  </Box>

                  {/* Discount Badge */}
                  {getDiscountPercentage(
                    product.price,
                    product.discountedPrice
                  ) && (
                    <Box sx={{ position: "absolute", top: 8, right: 55 }}>
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

                  {/* Menu Button */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": { bgcolor: "white" },
                    }}
                    onClick={(e) => handleMenuOpen(e, product)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="h1"
                    fontWeight="600"
                    mb={1}
                    sx={{ fontSize: "1rem" }}
                  >
                    {product.name}
                  </Typography>

                  <Box display="flex" alignItems="center" mb={1}>
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

                  {/* Pricing */}
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

                  {/* Stock and Stats */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Box display="flex" alignItems="center">
                      <InventoryIcon
                        sx={{ fontSize: "1rem", color: "#64748b", mr: 0.5 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Stock: {product.quantity}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <VisibilityIcon
                        sx={{ fontSize: "1rem", color: "#64748b", mr: 0.5 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {product.views}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Sales Trend */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        bgcolor: product.sales > 100 ? "#e8f5e9" : "#fff3e0",
                        borderRadius: "8px",
                        px: 1,
                        py: 0.5,
                      }}
                    >
                      {product.sales > 100 ? (
                        <TrendingUpIcon
                          sx={{ fontSize: "1rem", color: "#2e7d32", mr: 0.5 }}
                        />
                      ) : (
                        <TrendingDownIcon
                          sx={{ fontSize: "1rem", color: "#f57c00", mr: 0.5 }}
                        />
                      )}
                      <Typography variant="caption" fontWeight="600">
                        {product.sales} sold
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(filteredProducts.length / 12)}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "12px",
              },
            }}
          />
        </Box>
      </Container>

      {/* Floating Add Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
            transform: "scale(1.1)",
          },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Product Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: "12px", minWidth: 150 },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1, fontSize: "1.1rem" }} />
          Edit Product
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <VisibilityIcon sx={{ mr: 1, fontSize: "1.1rem" }} />
          View Details
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 1, fontSize: "1.1rem" }} />
          Delete Product
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: "16px" } }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <WarningIcon sx={{ color: "error.main", mr: 1 }} />
          Delete Product
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedProduct?.name}"? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: "8px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: "8px" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PharmacyProductsPage;
