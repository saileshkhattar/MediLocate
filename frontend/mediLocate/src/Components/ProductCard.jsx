import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const ProductSummaryCard = ({ product, availableStores }) => {
  if (!product) return null;

  // filter only in-stock stores
  const inStockStores = availableStores.filter((s) => s.product.quantity > 0);

  // compute min & max price
  const minPrice =
    inStockStores.length > 0
      ? Math.min(
          ...inStockStores.map(
            (s) => s.product.discountedPrice || s.product.price
          )
        )
      : null;

  const maxPrice =
    inStockStores.length > 0
      ? Math.max(...inStockStores.map((s) => s.product.price))
      : null;

  return (
    <Card
      sx={{
        position: "absolute",
        top: 425,
        right: 20,
        width: 350,
        zIndex: 100,
        borderRadius: "16px",
        display: {
          xs: "none", // hide on extra-small
          sm: "none", // hide on small
          md: "none", // hide on medium
          lg: "block", // show on large+
        },
        border: "2px solid #667eea",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.2)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Product header */}
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            component="img"
            src={product?.image}
            alt={product?.name}
            sx={{
              width: 60,
              height: 60,
              borderRadius: "12px",
              bgcolor: "#f8fafc",
              mr: 2,
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight="600" lineHeight={1.2}>
              {product?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.power} • {product?.category}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Price range */}
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Price Range
          </Typography>
          {minPrice !== null && maxPrice !== null ? (
            <Typography variant="h5" fontWeight="bold" color="primary">
              ₹{minPrice} - ₹{maxPrice}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Not available
            </Typography>
          )}
        </Box>

        {/* Availability */}
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Availability
          </Typography>
          <Chip
            label={`Available at ${inStockStores.length} stores`}
            color={inStockStores.length > 0 ? "success" : "default"}
            size="small"
          />
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          {product?.description}
        </Typography>

        {/* Action button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<CompareArrowsIcon />}
          sx={{
            borderRadius: "8px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          Compare All Stores
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductSummaryCard;
