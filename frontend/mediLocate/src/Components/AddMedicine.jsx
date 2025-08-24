import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountedPrice: "",
    Quantit: "",
    image: "",
  });

  const categories = ["Medicine", "Supplements", "Equipment", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create form data
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("discountedPrice", discountedPrice);
      formData.append("quantity", quantity);

      // Optional: Pass the user or pharmacy name for filename generation
      formData.append("userName", userName); // e.g., "PharmaOne"

      // Append the image file
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Send POST request
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added:", res.data);
      alert("Product added successfully!");
      // Optionally clear form
      setFormData({
        productName: "",
        category: "",
        price: "",
        discountedPrice: "",
        quantity: "",
        imageFile: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <Box
      maxWidth="500px"
      mx="auto"
      my={5}
      p={3}
      bgcolor="white"
      borderRadius="10px"
      boxShadow={3}
    >
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Category */}
        <TextField
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        {/* Price */}
        <TextField
          label="Price (₹)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* Discounted Price */}
        <TextField
          label="Discounted Price (₹)"
          name="discountedPrice"
          type="number"
          value={formData.discountedPrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 2, width: "50%" }}
        >
          Upload Product Image
          <input
            type="file"
            accept="image/*"
            hidden
            name="image"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </Button>

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "#4CAF50",
            "&:hover": { bgcolor: "#388E3C" },
          }}
          fullWidth
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
}
