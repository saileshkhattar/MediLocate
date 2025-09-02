import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import CompleteProfileCard from "../../Components/CompleteProfileCard";
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
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";

import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import useSearch from "../../Hooks/Search";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const navigate = useNavigate();
  const categories = [
    {
      name: "Medicines",
      icon: <LocalPharmacyIcon />,
      color: "#667eea",
      count: "500+",
    },
    {
      name: "Supplements",
      icon: <MedicationIcon />,
      color: "#f093fb",
      count: "200+",
    },
    {
      name: "Vaccines",
      icon: <VaccinesIcon />,
      color: "#4facfe",
      count: "50+",
    },
    {
      name: "Health Care",
      icon: <HealthAndSafetyIcon />,
      color: "#43e97b",
      count: "150+",
    },
  ];

  const { query, setQuery, suggestions } = useSearch();

  const features = [
    {
      icon: <DeliveryDiningIcon />,
      title: "Fast Delivery",
      description: "Get your medicines delivered within 30 minutes",
      color: "#667eea",
    },
    {
      icon: <SecurityIcon />,
      title: "100% Genuine",
      description: "All products are sourced from verified suppliers",
      color: "#f093fb",
    },
    {
      icon: <MonetizationOnIcon />,
      title: "Best Prices",
      description: "Competitive pricing with regular discounts",
      color: "#43e97b",
    },
    {
      icon: <SupportAgentIcon />,
      title: "24/7 Support",
      description: "Round-the-clock customer service assistance",
      color: "#f6d365",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Search Medicine",
      description: "Find the medicine you need",
    },
    {
      number: "2",
      title: "Add to Cart",
      description: "Add items to your cart",
    },
    {
      number: "3",
      title: "Place Order",
      description: "Complete your purchase",
    },
    {
      number: "4",
      title: "Get Delivered",
      description: "Receive at your doorstep",
    },
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing service! Got my medicines delivered super fast.",
      avatar: "S",
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Very reliable platform. Great prices and genuine products.",
      avatar: "M",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Excellent customer support. Highly recommended!",
      avatar: "P",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
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
              variant="h4"
              sx={{
                opacity: 0.95,
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
                mb: 4,
                fontWeight: 400,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Your trusted partner for all medical needs - medicines,
              supplements, and healthcare essentials
            </Typography>

            {/* Enhanced Search Bar */}
            <Paper
              elevation={12}
              sx={{
                borderRadius: "60px",
                maxWidth: { xs: "100%", sm: "600px" },
                mx: "auto",
                mb: 4,
                bgcolor: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Box sx={{ position: "relative", width: "100%" }}>
                <TextField
                  fullWidth
                  placeholder="Search for medicines, supplements, health products..."
                  variant="outlined"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  sx={{
                    "& fieldset": { border: "none" },
                    "& .MuiInputBase-input": {
                      padding: "18px 24px",
                      fontSize: "1.1rem",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{ color: "#667eea", ml: 1, fontSize: "1.5rem" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                {suggestions.length > 0 && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
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
            </Paper>

            <Chip
              icon={<CheckCircleIcon />}
              label="Over 10,000 happy customers served"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 500,
                "& .MuiChip-icon": { color: "white" },
              }}
            />
          </Box>

          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              right: "5%",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "20%",
              left: "10%",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              animation: "float 4s ease-in-out infinite reverse",
            }}
          />
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="700" color="#1a202c" mb={2}>
            Browse by Category
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="600px"
            mx="auto"
          >
            Find exactly what you need from our comprehensive range of medical
            products
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: "20px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "1px solid #e2e8f0",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "20px",
                      background: `linear-gradient(135deg, ${category.color}22 0%, ${category.color}44 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ color: category.color, fontSize: "2rem" }}>
                      {category.icon}
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    mb={1}
                    color="#1a202c"
                  >
                    {category.name}
                  </Typography>
                  <Chip
                    label={category.count}
                    size="small"
                    sx={{
                      bgcolor: `${category.color}22`,
                      color: category.color,
                      fontWeight: 600,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Products Section */}
      <Box sx={{ bgcolor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" fontWeight="700" color="#1a202c" mb={2}>
              Popular Products
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Most trusted products by our customers
            </Typography>
          </Box>

          <Box
            sx={{
              minHeight: "200px",
              bgcolor: "white",
              borderRadius: "16px",
              p: 4,
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              pt={8}
            >
              Product grid will be displayed here
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* How to Use Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="700" color="#1a202c" mb={2}>
            How It Works
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Simple steps to get your medicines delivered
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {step.number}
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  mb={2}
                  color="#1a202c"
                >
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" fontWeight="700" color="#1a202c" mb={2}>
              Why Choose MediLocate?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              We're committed to providing the best healthcare experience
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: "16px",
                    height: "100%",
                    transition: "all 0.3s ease",
                    border: "1px solid #e2e8f0",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "16px",
                        bgcolor: `${feature.color}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <Box sx={{ color: feature.color, fontSize: "1.5rem" }}>
                        {feature.icon}
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      mb={2}
                      color="#1a202c"
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Support Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="700" color="#1a202c" mb={2}>
            Need Help with Your Order?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Our support team is here to assist you 24/7
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "16px",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <PhoneIcon sx={{ fontSize: "3rem", color: "#667eea", mb: 2 }} />
                <Typography variant="h6" fontWeight="600" mb={1}>
                  Call Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "16px",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <ChatIcon sx={{ fontSize: "3rem", color: "#43e97b", mb: 2 }} />
                <Typography variant="h6" fontWeight="600" mb={1}>
                  Live Chat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chat with our experts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "16px",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <EmailIcon sx={{ fontSize: "3rem", color: "#f093fb", mb: 2 }} />
                <Typography variant="h6" fontWeight="600" mb={1}>
                  Email Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  support@medilocate.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Reviews Section */}
      <Box sx={{ bgcolor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" fontWeight="700" color="#1a202c" mb={2}>
              What Our Customers Say
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Real experiences from real customers
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {reviews.map((review, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: "16px",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Avatar
                        sx={{
                          bgcolor: "#667eea",
                          mr: 2,
                          width: 50,
                          height: 50,
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                        }}
                      >
                        {review.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          {review.name}
                        </Typography>
                        <Box display="flex" gap={0.5}>
                          {[...Array(review.rating)].map((_, i) => (
                            <StarIcon
                              key={i}
                              sx={{ color: "#ffc107", fontSize: "1rem" }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontStyle="italic"
                    >
                      "{review.comment}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
      <CompleteProfileCard />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </>
  );
}

export default UserHome;
