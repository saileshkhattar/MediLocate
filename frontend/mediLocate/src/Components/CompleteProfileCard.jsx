import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CompleteProfilePopup() {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();
  const [formData, setFormData] = useState(null); // start with null, not {}
  const navigate = useNavigate();

   useEffect(() => {
    if (user) {
      setOpen(!user.isProfileComplete);  
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData(
        user.role === "pharmacy"
          ? {
              name: user.name || "",
              email: user.email || "",
              address: user.address || "",
              phone: user.phone || "", // ✅ added
              pharmacyName: user.pharmacyName || "", // ✅ added
              licenseNumber: user.licenseNumber || "",
              gstNumber: user.gstNumber || "", // ✅ added
              images: [],
            }
          : {
              name: user.name || "",
              email: user.email || "",
              address: user.address || "",
              phone: user.phone || "", // ✅ added
              jobTitle: user.jobTitle || "",
              profileImage: null,
            }
      );
    }
  }, [user]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: user?.role === "pharmacy" ? 5 : 1,
    onDrop: (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        ...(user.role === "pharmacy"
          ? {
              images: [
                ...(prev.images || []),
                ...acceptedFiles.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                ),
              ].slice(0, 5), // enforce max 5
            }
          : {
              profileImage: Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
              }),
            }),
      }));
    },
  });

  if (!user) return <p>No user logged in</p>;
  if (!formData) return <p>Loading profile form...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const data = new FormData();

      // append text fields
      for (const key in formData) {
        if (key !== "images" && key !== "profileImage") {
          data.append(key, formData[key]);
        }
      }

      // append images (pharmacy can have multiple, user has one)
      if (user.role === "pharmacy" && formData.images?.length > 0) {
        formData.images.forEach((file) => {
          data.append("images", file); // ✅ match multer.array("images")
        });
      } else if (user.role !== "pharmacy" && formData.profileImage) {
        data.append("profileImage", formData.profileImage); // ✅ match multer.single("profileImage")
      }

      const res = await axios.post(
        `http://localhost:5000/profile/${user.role}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Saved:", res.data);
      navigate(`/${user.role}-home`);
    } catch (err) {
      console.error("Error saving profile:", err.response?.data || err);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: "3.0rem", textAlign: "center" }}
      >
        {user.role === "pharmacy"
          ? "Complete Your Pharmacy Profile"
          : "Complete Your Profile"}
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h5" gutterBottom fullWidth>
            Basic Information
          </Typography>

          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
            marginBottom={5}
            gap={5}
            marginTop={2.5}
          >
            <TextField
              required
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ borderRadius: "10px" }}
              m={2.5}
            />

            <TextField
              required
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              m={2.5}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
            marginBottom={5}
            gap={5}
          >
            <TextField
              required
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />

            <TextField
              required
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              m={2.5}
              variant="outlined"
            />
          </Box>

          {/* User-specific */}
          {user.role === "user" && (
            <>
              <Typography variant="h5" gutterBottom fullWidth>
                Work Info
              </Typography>

              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                width="100%"
                marginBottom={5}
              >
                <TextField
                  required
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Box>
            </>
          )}

          {/* Pharmacy-specific */}
          {user.role === "pharmacy" && (
            <>
              <Typography variant="h5" gutterBottom fullWidth>
                Pharmacy Information
              </Typography>

              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                width="100%"
                margin={2.5}
                gap={7}
              >
                <TextField
                  required
                  label="Pharmacy Name"
                  name="pharmacyName"
                  value={formData.pharmacyName}
                  onChange={handleChange}
                />

                <TextField
                  required
                  label="License Number"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />

                <TextField
                  required
                  label="GST Number"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                />
              </Box>
            </>
          )}

          {/* Image Upload */}
          <Typography variant="h5" gutterBottom fullWidth>
            Profile Image
          </Typography>

          <Box
            {...getRootProps()}
            p={3}
            border="2px dashed grey"
            borderRadius="10px"
            textAlign="center"
            sx={{ cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            <Typography>
              {user.role === "pharmacy"
                ? "Drag & drop up to 5 images, or click to select"
                : "Drag & drop profile image, or click to select"}
            </Typography>
          </Box>

          {/* Preview */}
          {user.role === "user" && formData.profileImage && (
            <Box mt={2}>
              <Typography variant="subtitle1">Profile Preview</Typography>
              <img
                src={formData.profileImage.preview}
                alt="Profile Preview"
                width={120}
                style={{ borderRadius: "10px" }}
              />
            </Box>
          )}

          {user.role === "pharmacy" &&
            formData.images &&
            formData.images.length > 0 && (
              <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
                {formData.images.map((file, idx) => (
                  <img
                    key={idx}
                    src={file.preview}
                    alt={`Pharmacy ${idx + 1}`}
                    width={120}
                    style={{ borderRadius: "10px" }}
                  />
                ))}
              </Box>
            )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
          sx={{ py: 1.5, fontWeight: "bold", borderRadius: "10px" }}
        >
          SAVE PROFILE
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CompleteProfilePopup;
