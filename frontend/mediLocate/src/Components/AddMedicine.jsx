import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Typography,
  Grid,
  IconButton,
  Chip,
  Alert,
  LinearProgress,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../Context/AuthContext";

export default function AddMedicineDialog({ open, handleClose, product }) {
  const isProduct = Boolean(product)
  const { user } = useAuth();
  console.log(user.name);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    power: "",
    price: "",
    discountedPrice: "",
    quantity: "",
    image: null,
    fileType: "medicines",
    pharmacyName: user?.name || "",
  });

  // Auto-fill when product is provided/changes
  useEffect(() => {
    if (isProduct) {
      setFormData((prev) => ({
        ...prev,
        name: product.name || "",
        category: product.category || "",
        power: product.power || "",
        price: product.price || "",
        discountedPrice: product.discountedPrice || "",
        quantity: product.quantity || "",
        image: product.image || null,
      }));
    }
  }, [product]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Medicine",
    "Supplements",
    "Equipment",
    "Personal Care",
    "Baby Care",
    "Other",
  ];

  const validateField = (name, value) => {
    console.log("Dsdsdsdsd");
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (value.length < 2) {
          newErrors[name] = "Medicine name must be at least 2 characters";
        } else {
          delete newErrors[name];
        }
        break;
      case "price":
        if (!value || parseFloat(value) <= 0) {
          newErrors[name] = "Price must be greater than 0";
        } else {
          delete newErrors[name];
        }
        break;
      case "discountedPrice":
        if (value && parseFloat(value) >= parseFloat(formData.price)) {
          newErrors[name] = "Discounted price must be less than original price";
        } else {
          delete newErrors[name];
        }
        break;
      case "quantity":
        if (!value || parseInt(value) <= 0) {
          newErrors[name] = "Quantity must be greater than 0";
        } else {
          delete newErrors[name];
        }
        break;
      default:
        if (!value.trim()) {
          newErrors[name] = "This field is required";
        } else {
          delete newErrors[name];
        }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, image: undefined }));
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      power: "",
      price: "",
      discountedPrice: "",
      quantity: "",
      image: null,
    });
    setErrors({});
    setImagePreview(null);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = ["name", "category", "power", "price", "quantity"];
    requiredFields.forEach((field) => validateField(field, formData[field]));

    // if (Object.keys(errors).length > 0) {
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("power", formData.power);
      data.append("price", formData.price);
      data.append("discountedPrice", formData.discountedPrice || "0");
      data.append("quantity", formData.quantity);
      data.append("pharmacyName", formData.pharmacyName);
      data.append("fileType", formData.fileType);

      if (formData.image) {
        data.append("image", formData.image);
      }

      console.log(data);

      if (product) {
        // EDIT product
        const res = await axios.put(
          `http://localhost:5000/pharmacy/edit/${product._id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        console.log("Product updated:", res.data);
      } else {
        // ADD product
        const res = await axios.post(
          "http://localhost:5000/pharmacy/add",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        console.log("Product added:", res.data);
      }

      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setErrors({ submit: "Failed to add product. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const getSavings = () => {
    if (formData.price && formData.discountedPrice) {
      const savings = (
        ((parseFloat(formData.price) - parseFloat(formData.discountedPrice)) /
          parseFloat(formData.price)) *
        100
      ).toFixed(0);
      return savings > 0 ? `${savings}% OFF` : null;
    }
    return null;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Box display="flex" alignItems="center">
          <LocalPharmacyIcon sx={{ mr: 1.5 }} />
          Add New Medicine
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "white",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {isLoading && (
          <LinearProgress
            sx={{
              mb: 2,
              borderRadius: 2,
              bgcolor: "#f0f0f0",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              },
            }}
          />
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2.5} mt={5}>
            {/* Medicine Name & Category */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Medicine Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                error={!!errors.name}
                helperText={errors.name}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  minWidth: "250px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                error={!!errors.category}
                helperText={errors.category}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  minWidth: "250px",
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Power & Quantity */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Power/Strength"
                name="power"
                value={formData.power}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                placeholder="e.g. 500mg, 10ml"
                error={!!errors.power}
                helperText={errors.power}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  minWidth: "250px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                error={!!errors.quantity}
                helperText={errors.quantity}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  minWidth: "250px",
                }}
              />
            </Grid>

            {/* Pricing */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  minWidth: "250px",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Discounted Price (₹)"
                name="discountedPrice"
                type="number"
                value={formData.discountedPrice}
                onChange={handleChange}
                fullWidth
                size="small"
                placeholder="Optional"
                error={!!errors.discountedPrice}
                helperText={errors.discountedPrice}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                  endAdornment: getSavings() && (
                    <Chip
                      label={getSavings()}
                      size="small"
                      color="success"
                      sx={{ fontSize: "0.75rem", height: "20px" }}
                    />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  minWidth: "250px",
                }}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhotoCameraIcon sx={{ mr: 1, fontSize: "1rem" }} />
                Product Image (Optional)
              </Typography>

              {!imagePreview ? (
                <Box
                  sx={{
                    border: "2px dashed #cbd5e0",
                    borderRadius: "8px",
                    p: 2,
                    minWidth: "500px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#667eea",
                      bgcolor: "#f8fafc",
                    },
                  }}
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <CloudUploadIcon
                    sx={{ fontSize: "2rem", color: "#94a3b8", mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Click to upload image (Max 5MB)
                  </Typography>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    bgcolor: "#f8fafc",
                  }}
                >
                  <Avatar
                    src={imagePreview}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="body2" fontWeight="500">
                      {formData.image?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Image ready to upload
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={removeImage}
                    size="small"
                    sx={{ color: "error.main" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}

              {errors.image && (
                <Alert severity="error" sx={{ mt: 1, py: 0.5 }}>
                  {errors.image}
                </Alert>
              )}
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ py: 0.5 }}>
                  {errors.submit}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={() => {
            resetForm();
            handleClose();
          }}
          variant="outlined"
          sx={{
            borderRadius: "8px",
            borderColor: "#e2e8f0",
            color: "#64748b",
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          sx={{
            borderRadius: "8px",
            background: "linear-gradient(135deg, #43e97b 0%, #38d9a9 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #38d9a9 0%, #20bf6b 100%)",
            },
            "&:disabled": {
              background: "#cbd5e0",
            },
          }}
        >
          {isLoading ? (
            <>Saving...</>
          ) : (
            <>
              <CheckCircleIcon sx={{ mr: 1, fontSize: "1.1rem" }} />
              {product ? "Update Medicine" : "Add MEDICINE"}
            </>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
