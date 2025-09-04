import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Paper,
  Skeleton,
  IconButton,
  Divider,
  CircularProgress,
  Backdrop,
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
import axios from "axios";
import Navbar from "../../Components/Navbar";
import ProductCard from "../../Components/ProductCard";
import MapView from "../../Components/MapView";

const ProductAvailabilityPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [availableStores, setAvailableStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductAvailability = async () => {
      setLoading(true);
      try {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          setLat(lat);
          setLon(lon);

          const res = await axios.get(
            `http://localhost:5000/product/search/${id}?lat=${lat}&lon=${lon}`,
            { withCredentials: true }
          );

          setProduct(res.data.product);
          setAvailableStores(res.data.pharmacies);
          setLoading(false);
        });

        console.log(availableStores);
      } catch (error) {
        console.error("Error fetching product availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAvailability();
  }, [id]);

  const handleWishlistToggle = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((id) => id !== id) : [...prev, id]
    );
  };

  const handlePharmacyClick = (pharmacy) => {
    navigate(`/search/pharamcy/${pharmacy._id}`);
  };

  const getDiscountPercentage = (original, discounted) => {
    if (!discounted) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  if (loading) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: "#1976d2",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Backdrop>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
        {/* Header */}
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
              sx={{ color: "white", mb: 2 }}
            >
              Back to search
            </Button>

            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent={{ lg: "center" }}
            >
              <Grid item xs={12} md={8} mr={{ lg: "45px" }}>
                <Typography variant="h3" fontWeight="700" mb={1}>
                  {product?.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {product?.power} • {product?.category}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                  Available at{" "}
                  {availableStores.filter((s) => s.product.quantity > 0).length}{" "}
                  nearby pharmacies
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    textAlign: "center",
                  }}
                >
                  <LocalPharmacyIcon sx={{ fontSize: "3rem", mb: 1 }} />
                  <Typography variant="h6">Compare Prices</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Find the best deals near you
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Available Stores */}
          <Typography variant="h4" fontWeight="600" mb={3}>
            Available Stores
          </Typography>

          <Grid container spacing={3}>
            {availableStores.map((store) => (
              <Grid item xs={12} key={store._id}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    transition: "all 0.3s ease",
                    border: "1px solid #e2e8f0",

                    minWidth: { lg: "800px", md: "600px" },
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      {/* Store Info */}
                      <Grid item xs={12} md={6}>
                        <Box
                          display="flex"
                          alignItems="center"
                          mb={2}
                          sx={{ minWidth: { lg: "400px" } }}
                        >
                          <Avatar
                            src={store.image}
                            sx={{
                              width: 60,
                              height: 60,
                              mr: 2,
                              bgcolor: "#f0f9ff",
                            }}
                          >
                            <LocalPharmacyIcon sx={{ color: "#0369a1" }} />
                          </Avatar>
                          <Box>
                            <Box display="flex" alignItems="center" mb={0.5}>
                              <Typography variant="h6" fontWeight="600">
                                {store.pharmacy.pharmacyName}
                              </Typography>
                              {store.verified && (
                                <VerifiedIcon
                                  sx={{
                                    color: "#4caf50",
                                    ml: 1,
                                    fontSize: "1.2rem",
                                  }}
                                />
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {store.product.name}
                            </Typography>
                          </Box>
                        </Box>

                        <Box display="flex" alignItems="center" mb={1}>
                          <LocationOnIcon
                            sx={{ color: "#64748b", fontSize: "1rem", mr: 0.5 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {store.pharmacy.address}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" mb={2}>
                          <StarIcon
                            sx={{ color: "#ffc107", fontSize: "1rem", mr: 0.5 }}
                          />
                          <Typography variant="body2" fontWeight="600" mr={2}>
                            {store.rating}
                          </Typography>
                          {store.distance ? (
                            <Typography variant="body2" color="text.secondary">
                              {(() => {
                                const km = store.distance / 1000;
                                const lower = Math.floor(km);
                                const upper = Math.ceil(km);
                                return `${lower} - ${upper} km away`;
                              })()}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Distance not available
                            </Typography>
                          )}
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                          <AccessTimeIcon
                            sx={{ color: "#64748b", fontSize: "1rem" }}
                          />
                          {store.duration ? (
                            <Typography variant="body2" color="text.secondary">
                              {(() => {
                                const mins = store.duration / 60;
                                const lower = Math.floor(mins);
                                const upper = Math.ceil(mins);
                                return `${lower} - ${upper} mins drive`;
                              })()}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Time not available
                            </Typography>
                          )}
                          {store.deliveryFee === 0 ? (
                            <Chip
                              label="FREE Delivery"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              • ₹{store.deliveryFee} delivery fee
                            </Typography>
                          )}
                        </Box>
                      </Grid>

                      {/* Price & Actions */}
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            bgcolor: "#f8fafc",
                            borderRadius: "12px",
                            p: 3,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            maxHeight: "200px",
                          }}
                        >
                          {store.product.quantity > 0 ? (
                            <>
                              <Box display="flex" alignItems="center" mb={2}>
                                <Typography
                                  variant="h4"
                                  fontWeight="bold"
                                  color="#1a202c"
                                >
                                  ₹
                                  {store.product.discountedPrice ||
                                    store.product.price}
                                </Typography>
                                {store.product.discountedPrice && (
                                  <Box ml={2}>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                      }}
                                    >
                                      ₹{store.product.price}
                                    </Typography>
                                    <Chip
                                      label={`${getDiscountPercentage(
                                        store.product.price,
                                        store.product.discountedPrice
                                      )}% OFF`}
                                      color="success"
                                      size="small"
                                    />
                                  </Box>
                                )}
                              </Box>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={3}
                              >
                                In stock ({store.product.quantity} available)
                              </Typography>

                              <Box display="flex" gap={2} mb={2}>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  startIcon={<AddShoppingCartIcon />}
                                  sx={{
                                    borderRadius: "8px",
                                    background:
                                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  }}
                                >
                                  Add to Cart
                                </Button>
                                <IconButton
                                  onClick={() =>
                                    handleWishlistToggle(product._id)
                                  }
                                  sx={{
                                    border: "1px solid #e2e8f0",
                                    "&:hover": { bgcolor: "#f8fafc" },
                                  }}
                                >
                                  {wishlist.includes(product._id) ? (
                                    <FavoriteIcon sx={{ color: "#f44336" }} />
                                  ) : (
                                    <FavoriteBorderIcon />
                                  )}
                                </IconButton>
                              </Box>

                              <Box display="flex" gap={1}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<DirectionsIcon />}
                                  sx={{ borderRadius: "8px" }}
                                >
                                  Directions
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<PhoneIcon />}
                                  sx={{ borderRadius: "8px" }}
                                  href={`tel:${store.phone}`}
                                >
                                  Call
                                </Button>
                                <Button
                                  variant="text"
                                  size="small"
                                  sx={{ borderRadius: "8px" }}
                                  onClick={() => handlePharmacyClick(store)}
                                >
                                  Visit Store
                                </Button>
                              </Box>
                            </>
                          ) : (
                            <Box textAlign="center">
                              <Typography variant="h6" color="error" mb={2}>
                                Currently Out of Stock
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={3}
                              >
                                Contact store for availability
                              </Typography>
                              <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<PhoneIcon />}
                                sx={{ borderRadius: "8px" }}
                                href={`tel:${store.phone}`}
                              >
                                Call Store
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* No stores available */}
          {availableStores.length === 0 && (
            <Paper sx={{ p: 6, textAlign: "center", borderRadius: "16px" }}>
              <LocalPharmacyIcon
                sx={{ fontSize: "4rem", color: "#cbd5e0", mb: 2 }}
              />
              <Typography variant="h5" fontWeight="600" mb={1}>
                Product not available nearby
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Try searching for similar products or contact pharmacies
                directly
              </Typography>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
                onClick={() => navigate("/search")}
              >
                Search Similar Products
              </Button>
            </Paper>
          )}
        </Container>
      </Box>
      <ProductCard product={product} availableStores={availableStores} />
      <Box
        sx={{
          position: "absolute",
          top: 800,
          right: 20,
          width: 400,
          height: 400,
          zIndex: 1000,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          border: "2px solid #667eea",
        }}
      >
        <MapView pharmacies={availableStores} userLocation={{ lat, lon }} />
      </Box>
    </>
  );
};

export default ProductAvailabilityPage;
