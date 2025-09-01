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
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Alert,
  Fade,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function CompleteProfilePopup() {
  const [open, setOpen] = useState(true);
  const { user } = useAuth();
  const [formData, setFormData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
              phone: user.phone || "",
              pharmacyName: user.pharmacyName || "",
              licenseNumber: user.licenseNumber || "",
              gstNumber: user.gstNumber || "",
              images: [],
              fileType:"profile"
            }
          : {
              name: user.name || "",
              email: user.email || "",
              address: user.address || "",
              phone: user.phone || "",
              jobTitle: user.jobTitle || "",
              profileImage: null,
              fileType : "profile" 
            }
      );
    }
  }, [user]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          newErrors[name] = "Phone number must be exactly 10 digits";
        } else {
          delete newErrors[name];
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = "Please enter a valid email address";
        } else {
          delete newErrors[name];
        }
        break;
      case "gstNumber":
        if (value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
          newErrors[name] = "Please enter a valid GST number";
        } else {
          delete newErrors[name];
        }
        break;
      case "licenseNumber":
        if (value.length < 5) {
          newErrors[name] = "License number must be at least 5 characters";
        } else {
          delete newErrors[name];
        }
        break;
      case "name":
        if (value.length < 2) {
          newErrors[name] = "Name must be at least 2 characters";
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

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: value }));
    validateField("phone", value);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: user?.role === "pharmacy" ? 5 : 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrors(prev => ({ ...prev, images: "Please upload images under 5MB" }));
        return;
      }

      setErrors(prev => ({ ...prev, images: undefined }));
      
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
              ].slice(0, 5),
            }
          : {
              profileImage: Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
              }),
            }),
      }));
    },
  });

  const removeImage = (indexToRemove) => {
    if (user.role === "pharmacy") {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, index) => index !== indexToRemove)
      }));
    } else {
      setFormData(prev => ({ ...prev, profileImage: null }));
    }
  };

  if (!user) return <p>No user logged in</p>;
  if (!formData) return <p>Loading profile form...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const getSteps = () => {
    if (user.role === "pharmacy") {
      return ["Basic Information", "Pharmacy Details", "Upload Images"];
    }
    return ["Basic Information", "Work Information", "Profile Image"];
  };

  const isStepValid = (step) => {
    if (step === 0) {
      return formData.name && formData.phone && formData.address && 
             !errors.name && !errors.phone && !errors.address;
    }
    if (step === 1) {
      if (user.role === "pharmacy") {
        return formData.pharmacyName && formData.licenseNumber && formData.gstNumber &&
               !errors.pharmacyName && !errors.licenseNumber && !errors.gstNumber;
      } else {
        return formData.jobTitle && !errors.jobTitle;
      }
    }
    return true; // Images are optional
  };

  const handleNext = () => {
    if (isStepValid(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = new FormData();

      for (const key in formData) {
        if (key !== "images" && key !== "profileImage") {
          data.append(key, formData[key]);
        }
      }

      if (user.role === "pharmacy" && formData.images?.length > 0) {
        formData.images.forEach((file) => {
          data.append("images", file);
        });
      } else if (user.role !== "pharmacy" && formData.profileImage) {
        data.append("profileImage", formData.profileImage);
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
      setOpen(false);
      navigate(`/${user.role}-home`);
    } catch (err) {
      console.error("Error saving profile:", err.response?.data || err);
      setErrors({ submit: "Failed to save profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
            <CardContent sx={{ p: 0 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <PersonIcon sx={{ color: '#667eea', mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" fontWeight="600">
                  Basic Information
                </Typography>
              </Box>
              
              <Box display="flex" flexDirection="column" gap={3}>
                <Box display="flex" gap={2}>
                  <TextField
                    required
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    disabled
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                  <TextField
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Box>

                <Box display="flex" gap={2}>
                  <TextField
                    required
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    fullWidth
                    variant="outlined"
                    error={!!errors.phone}
                    helperText={errors.phone || "Enter 10 digit mobile number"}
                    inputProps={{ maxLength: 10 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                  <TextField
                    required
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    error={!!errors.address}
                    helperText={errors.address}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        );

      case 1:
        if (user.role === "pharmacy") {
          return (
            <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
              <CardContent sx={{ p: 0 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <BusinessIcon sx={{ color: '#667eea', mr: 1, fontSize: '1.5rem' }} />
                  <Typography variant="h6" fontWeight="600">
                    Pharmacy Information
                  </Typography>
                </Box>
                
                <Box display="flex" flexDirection="column" gap={3}>
                  <TextField
                    required
                    label="Pharmacy Name"
                    name="pharmacyName"
                    value={formData.pharmacyName}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    error={!!errors.pharmacyName}
                    helperText={errors.pharmacyName}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                      },
                    }}
                  />
                  
                  <Box display="flex" gap={2}>
                    <TextField
                      required
                      label="License Number"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      error={!!errors.licenseNumber}
                      helperText={errors.licenseNumber}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />
                    <TextField
                      required
                      label="GST Number"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      error={!!errors.gstNumber}
                      helperText={errors.gstNumber || "Format: 22AAAAA0000A1Z5"}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        } else {
          return (
            <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
              <CardContent sx={{ p: 0 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <BusinessIcon sx={{ color: '#667eea', mr: 1, fontSize: '1.5rem' }} />
                  <Typography variant="h6" fontWeight="600">
                    Work Information
                  </Typography>
                </Box>
                
                <TextField
                  required
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle || "e.g. Software Engineer, Doctor, Student"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    },
                  }}
                />
              </CardContent>
            </Card>
          );
        }

      case 2:
        return (
          <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
            <CardContent sx={{ p: 0 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <PhotoCameraIcon sx={{ color: '#667eea', mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" fontWeight="600">
                  {user.role === "pharmacy" ? "Pharmacy Images" : "Profile Image"}
                </Typography>
                <Chip 
                  label="Optional" 
                  size="small" 
                  sx={{ ml: 'auto', bgcolor: '#e3f2fd', color: '#1976d2' }} 
                />
              </Box>

              <Box
                {...getRootProps()}
                sx={{
                  border: `2px dashed ${isDragActive ? '#667eea' : '#e0e0e0'}`,
                  borderRadius: '16px',
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  bgcolor: isDragActive ? 'rgba(102, 126, 234, 0.05)' : 'rgba(248, 250, 252, 0.8)',
                  '&:hover': {
                    borderColor: '#667eea',
                    bgcolor: 'rgba(102, 126, 234, 0.05)',
                  },
                }}
              >
                <input {...getInputProps()} />
                <CloudUploadIcon sx={{ fontSize: '3rem', color: '#667eea', mb: 2 }} />
                <Typography variant="h6" mb={1} color="#1a202c">
                  {isDragActive ? 'Drop images here' : 'Upload Images'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.role === "pharmacy"
                    ? "Drag & drop up to 5 images, or click to select (Max 5MB each)"
                    : "Drag & drop your profile image, or click to select (Max 5MB)"}
                </Typography>
                {errors.images && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.images}
                  </Alert>
                )}
              </Box>

              {/* Image Previews */}
              {user.role === "user" && formData.profileImage && (
                <Fade in timeout={300}>
                  <Box mt={3} display="flex" justifyContent="center">
                    <Box position="relative">
                      <Avatar
                        src={formData.profileImage.preview}
                        sx={{ width: 120, height: 120, border: '4px solid #667eea' }}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(0);
                        }}
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          bgcolor: 'error.main',
                          color: 'white',
                          '&:hover': { bgcolor: 'error.dark' },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Fade>
              )}

              {user.role === "pharmacy" && formData.images && formData.images.length > 0 && (
                <Fade in timeout={300}>
                  <Box mt={3} display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                    {formData.images.map((file, idx) => (
                      <Box key={idx} position="relative">
                        <Box
                          component="img"
                          src={file.preview}
                          alt={`Pharmacy ${idx + 1}`}
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: '2px solid #667eea',
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => removeImage(idx)}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            bgcolor: 'error.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'error.dark' },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Fade>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: '700',
          fontSize: '1.75rem',
          textAlign: 'center',
          py: 3,
        }}
      >
        Complete Your {user.role === "pharmacy" ? "Pharmacy" : ""} Profile
        <Typography variant="body1" sx={{ mt: 1, opacity: 0.9, fontWeight: 400 }}>
          Let's set up your account to get started
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Progress Bar */}
        <Box sx={{ px: 4, pt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={(activeStep / (getSteps().length - 1)) * 100}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 3,
              },
            }}
          />
        </Box>

        {/* Stepper */}
        <Box sx={{ px: 4, py: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {getSteps().map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    style: {
                      color: index <= activeStep ? '#667eea' : '#cbd5e0',
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    color={index <= activeStep ? '#1a202c' : 'text.secondary'}
                    fontWeight={index === activeStep ? 600 : 400}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Content */}
        <Box sx={{ px: 4, pb: 3 }}>
          {renderStepContent(activeStep)}
          
          {errors.submit && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#f8fafc' }}>
        <Box display="flex" gap={2} width="100%">
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{
                borderRadius: '12px',
                px: 4,
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#5a67d8',
                  bgcolor: 'rgba(102, 126, 234, 0.05)',
                },
              }}
            >
              Back
            </Button>
          )}
          
          <Box flexGrow={1} />
          
          {activeStep < getSteps().length - 1 ? (
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={!isStepValid(activeStep)}
              sx={{
                borderRadius: '12px',
                px: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={isLoading}
              sx={{
                borderRadius: '12px',
                px: 4,
                background: 'linear-gradient(135deg, #43e97b 0%, #38d9a9 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #38d9a9 0%, #20bf6b 100%)',
                },
              }}
            >
              {isLoading ? (
                <>
                  <LinearProgress size={20} sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  Complete Profile
                </>
              )}
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default CompleteProfilePopup;
