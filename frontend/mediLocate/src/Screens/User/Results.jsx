import React, { useState } from 'react';
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
  Avatar,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  IconButton,
  Badge,
  Rating,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VerifiedIcon from '@mui/icons-material/Verified';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TuneIcon from '@mui/icons-material/Tune';

const UserSearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('paracetamol');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('nearby');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Mock search results data
  const mockResults = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Medicine',
      power: '500mg',
      price: 45,
      discountedPrice: 38,
      discount: 16,
      image: '/api/placeholder/200/150',
      rating: 4.5,
      reviews: 128,
      pharmacy: {
        id: 1,
        name: 'Apollo Pharmacy',
        address: 'Sector 14, Gurugram',
        distance: '0.8 km',
        rating: 4.7,
        verified: true,
        deliveryTime: '20-30 min',
        deliveryFee: 0,
        phone: '+91 98765 43210'
      },
      inStock: true,
      fastDelivery: true,
      prescription: false
    },
    {
      id: 2,
      name: 'Paracetamol 650mg',
      category: 'Medicine',
      power: '650mg',
      price: 65,
      discountedPrice: 55,
      discount: 15,
      image: '/api/placeholder/200/150',
      rating: 4.3,
      reviews: 89,
      pharmacy: {
        id: 2,
        name: 'MedPlus Pharmacy',
        address: 'DLF Phase 1, Gurugram',
        distance: '1.2 km',
        rating: 4.5,
        verified: true,
        deliveryTime: '25-35 min',
        deliveryFee: 25,
        phone: '+91 98765 43211'
      },
      inStock: true,
      fastDelivery: false,
      prescription: false
    },
    {
      id: 3,
      name: 'Paracetamol Syrup 125mg/5ml',
      category: 'Medicine',
      power: '125mg/5ml',
      price: 95,
      discountedPrice: null,
      discount: 0,
      image: '/api/placeholder/200/150',
      rating: 4.6,
      reviews: 203,
      pharmacy: {
        id: 3,
        name: 'Wellness Pharmacy',
        address: 'Cyber Hub, Gurugram',
        distance: '2.1 km',
        rating: 4.4,
        verified: true,
        deliveryTime: '30-40 min',
        deliveryFee: 35,
        phone: '+91 98765 43212'
      },
      inStock: true,
      fastDelivery: true,
      prescription: false
    },
    {
      id: 4,
      name: 'Paracetamol 500mg (Generic)',
      category: 'Medicine',
      power: '500mg',
      price: 28,
      discountedPrice: 22,
      discount: 21,
      image: '/api/placeholder/200/150',
      rating: 4.1,
      reviews: 156,
      pharmacy: {
        id: 4,
        name: 'HealthKart Pharmacy',
        address: 'Golf Course Road, Gurugram',
        distance: '3.5 km',
        rating: 4.6,
        verified: true,
        deliveryTime: '35-45 min',
        deliveryFree: 0,
        phone: '+91 98765 43213'
      },
      inStock: true,
      fastDelivery: false,
      prescription: false
    },
    {
      id: 5,
      name: 'Paracetamol + Caffeine 500mg',
      category: 'Medicine',
      power: '500mg + 65mg',
      price: 85,
      discountedPrice: 72,
      discount: 15,
      image: '/api/placeholder/200/150',
      rating: 4.4,
      reviews: 94,
      pharmacy: {
        id: 5,
        name: 'Netmeds Pharmacy',
        address: 'Udyog Vihar, Gurugram',
        distance: '4.2 km',
        rating: 4.3,
        verified: true,
        deliveryTime: '40-50 min',
        deliveryFee: 50,
        phone: '+91 98765 43214'
      },
      inStock: false,
      fastDelivery: false,
      prescription: false
    },
    {
      id: 6,
      name: 'Paracetamol IV 1000mg',
      category: 'Medicine',
      power: '1000mg',
      price: 145,
      discountedPrice: 125,
      discount: 14,
      image: '/api/placeholder/200/150',
      rating: 4.7,
      reviews: 67,
      pharmacy: {
        id: 6,
        name: 'PharmEasy Store',
        address: 'Sohna Road, Gurugram',
        distance: '5.8 km',
        rating: 4.5,
        verified: true,
        deliveryTime: '45-60 min',
        deliveryFee: 40,
        phone: '+91 98765 43215'
      },
      inStock: true,
      fastDelivery: true,
      prescription: true
    }
  ];

  const handleWishlistToggle = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product.id]);
    // You can show a success toast here
    console.log('Added to cart:', product.name);
  };

  const filteredResults = mockResults.filter(product => {
    if (location === 'nearby') return parseFloat(product.pharmacy.distance) <= 5;
    return true;
  });

  const totalResults = filteredResults.length;
  const resultsPerPage = 12;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Search Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="700" mb={2}>
            Search Results
          </Typography>
          
          {/* Search Bar */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: '12px',
              overflow: 'hidden',
              bgcolor: 'rgba(255,255,255,0.95)',
              mb: 2,
            }}
          >
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for medicines, supplements, healthcare products..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#667eea' }} />
                  </InputAdornment>
                ),
                sx: { py: 1 },
              }}
              sx={{
                '& fieldset': { border: 'none' },
              }}
            />
          </Paper>

          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Found {totalResults} results for "{searchQuery}" in nearby pharmacies
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Filters and Sort */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="distance">Distance</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="delivery">Fastest Delivery</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  label="Price Range"
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="all">All Prices</MenuItem>
                  <MenuItem value="0-50">Under ₹50</MenuItem>
                  <MenuItem value="50-100">₹50 - ₹100</MenuItem>
                  <MenuItem value="100-200">₹100 - ₹200</MenuItem>
                  <MenuItem value="200+">Above ₹200</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  label="Location"
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="nearby">Nearby (5km)</MenuItem>
                  <MenuItem value="city">Across City</MenuItem>
                  <MenuItem value="all">All Locations</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<TuneIcon />}
                sx={{
                  borderRadius: '12px',
                  borderColor: '#667eea',
                  color: '#667eea',
                  py: 1.5,
                }}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Grid */}
        <Grid container spacing={3}>
          {filteredResults.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e2e8f0',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.image}
                    alt={product.name}
                    sx={{ bgcolor: '#f8fafc' }}
                  />
                  
                  {/* Badges */}
                  <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                    {!product.inStock && (
                      <Chip
                        label="Out of Stock"
                        color="error"
                        size="small"
                        sx={{ fontSize: '0.7rem', fontWeight: 600, mb: 0.5 }}
                      />
                    )}
                    {product.fastDelivery && (
                      <Chip
                        label="Fast Delivery"
                        sx={{ 
                          bgcolor: '#e3f2fd', 
                          color: '#1976d2', 
                          fontSize: '0.7rem', 
                          fontWeight: 600,
                          mb: 0.5 
                        }}
                      />
                    )}
                    {product.prescription && (
                      <Chip
                        label="Prescription Required"
                        color="warning"
                        size="small"
                        sx={{ fontSize: '0.7rem', fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Chip
                        label={`${product.discount}% OFF`}
                        color="success"
                        size="small"
                        sx={{ fontSize: '0.7rem', fontWeight: 600 }}
                      />
                    </Box>
                  )}

                  {/* Wishlist Button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': { bgcolor: 'white' },
                    }}
                    onClick={() => handleWishlistToggle(product.id)}
                  >
                    {wishlist.includes(product.id) ? (
                      <FavoriteIcon sx={{ color: '#f44336' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>

                <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Product Info */}
                  <Typography variant="h6" fontWeight="600" mb={1} sx={{ fontSize: '1rem' }}>
                    {product.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {product.power} • {product.category}
                  </Typography>

                  {/* Rating */}
                  <Box display="flex" alignItems="center" mb={2}>
                    <Rating value={product.rating} readOnly size="small" precision={0.1} />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
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
                          textDecoration: 'line-through',
                          color: 'text.secondary',
                          ml: 1,
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                    )}
                  </Box>

                  {/* Pharmacy Info */}
                  <Box 
                    sx={{ 
                      bgcolor: '#f8fafc', 
                      borderRadius: '8px', 
                      p: 1.5, 
                      mb: 2,
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Box display="flex" alignItems="center">
                        <LocalPharmacyIcon sx={{ fontSize: '1rem', color: '#667eea', mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="600">
                          {product.pharmacy.name}
                        </Typography>
                        {product.pharmacy.verified && (
                          <VerifiedIcon sx={{ fontSize: '1rem', color: '#4caf50', ml: 0.5 }} />
                        )}
                      </Box>
                      <Box display="flex" alignItems="center">
                        <StarIcon sx={{ fontSize: '0.9rem', color: '#ffc107' }} />
                        <Typography variant="caption" sx={{ ml: 0.2 }}>
                          {product.pharmacy.rating}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <LocationOnIcon sx={{ fontSize: '0.9rem', color: '#64748b', mr: 0.3 }} />
                        <Typography variant="caption" color="text.secondary">
                          {product.pharmacy.distance}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <AccessTimeIcon sx={{ fontSize: '0.9rem', color: '#64748b', mr: 0.3 }} />
                        <Typography variant="caption" color="text.secondary">
                          {product.pharmacy.deliveryTime}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {product.pharmacy.deliveryFee === 0 ? (
                      <Chip 
                        label="FREE Delivery" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1, fontSize: '0.7rem' }}
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Delivery: ₹{product.pharmacy.deliveryFee}
                      </Typography>
                    )}
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ mt: 'auto' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          startIcon={<DirectionsIcon />}
                          sx={{
                            borderRadius: '8px',
                            borderColor: '#e2e8f0',
                            color: '#64748b',
                            fontSize: '0.8rem',
                          }}
                        >
                          Directions
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          startIcon={<PhoneIcon />}
                          sx={{
                            borderRadius: '8px',
                            borderColor: '#e2e8f0',
                            color: '#64748b',
                            fontSize: '0.8rem',
                          }}
                        >
                          Call
                        </Button>
                      </Grid>
                    </Grid>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<AddShoppingCartIcon />}
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        mt: 1,
                        borderRadius: '8px',
                        background: product.inStock 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : '#cbd5e0',
                        '&:hover': {
                          background: product.inStock 
                            ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                            : '#cbd5e0',
                        },
                      }}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results */}
        {filteredResults.length === 0 && (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '16px' }}>
            <LocalPharmacyIcon sx={{ fontSize: '4rem', color: '#cbd5e0', mb: 2 }} />
            <Typography variant="h5" fontWeight="600" mb={1}>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Try adjusting your search terms or filters
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Browse All Categories
            </Button>
          </Paper>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </Box>
        )}

        {/* Quick Filters */}
        <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: '16px' }}>
          <Typography variant="h6" fontWeight="600" mb={2}>
            Popular Filters
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {[
              'Free Delivery',
              'Fast Delivery',
              'Under ₹50',
              'Nearby Pharmacy',
              'Verified Stores',
              'High Rated',
              'Generic Medicines',
              'Prescription Free'
            ].map((filter) => (
              <Chip
                key={filter}
                label={filter}
                variant="outlined"
                clickable
                sx={{
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: '#667eea',
                    color: 'white',
                    borderColor: '#667eea',
                  },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Container>

      {/* Compare Floating Button */}
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#f8fafc',
          border: '2px solid #667eea',
          color: '#667eea',
          '&:hover': {
            bgcolor: '#667eea',
            color: 'white',
          },
        }}
      >
        <Badge badgeContent={2} color="error">
          <CompareArrowsIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default UserSearchResultsPage;