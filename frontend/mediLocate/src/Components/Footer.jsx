import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  IconButton,
  Divider,
  Chip
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
  ];

  const services = [
    { label: "Prescription Medicines", path: "/medicines" },
    { label: "Health Supplements", path: "/supplements" },
    { label: "Personal Care", path: "/personal-care" },
    { label: "Medical Devices", path: "/devices" },
    { label: "Lab Tests", path: "/lab-tests" },
  ];

  const support = [
    { label: "Help Center", path: "/help" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Return Policy", path: "/returns" },
    { label: "Track Order", path: "/track" },
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
        color: 'white',
        mt: 'auto'
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white">
                  M
                </Typography>
              </Box>
              <Typography 
                variant="h5" 
                fontWeight="700"
                sx={{ 
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                MediLocate
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
              Your trusted partner for all medical needs. We provide genuine medicines, 
              health supplements, and healthcare essentials with fast delivery.
            </Typography>

            {/* Trust Badges */}
            <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
              <Chip 
                icon={<VerifiedIcon />}
                label="Verified Store" 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(67, 233, 123, 0.2)', 
                  color: '#43e97b',
                  '& .MuiChip-icon': { color: '#43e97b' }
                }} 
              />
              <Chip 
                icon={<SecurityIcon />}
                label="Secure Payments" 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(102, 126, 234, 0.2)', 
                  color: '#667eea',
                  '& .MuiChip-icon': { color: '#667eea' }
                }} 
              />
            </Box>

            {/* Social Media */}
            <Typography variant="h6" fontWeight="600" mb={2}>
              Follow Us
            </Typography>
            <Box display="flex" gap={1}>
              {[
                { icon: <FacebookIcon />, color: '#1877f2' },
                { icon: <TwitterIcon />, color: '#1da1f2' },
                { icon: <InstagramIcon />, color: '#e4405f' },
                { icon: <LinkedInIcon />, color: '#0077b5' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '12px',
                    '&:hover': {
                      bgcolor: social.color,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="600" mb={3}>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {quickLinks.map((link, index) => (
                <MuiLink
                  key={index}
                  component={Link}
                  to={link.path}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#667eea',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="600" mb={3}>
              Our Services
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {services.map((service, index) => (
                <MuiLink
                  key={index}
                  component={Link}
                  to={service.path}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#667eea',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {service.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="600" mb={3}>
              Support
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {support.map((item, index) => (
                <MuiLink
                  key={index}
                  component={Link}
                  to={item.path}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#667eea',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {item.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="600" mb={3}>
              Contact Us
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(102, 126, 234, 0.2)', 
                    color: '#667eea',
                    minWidth: 'auto',
                    p: 1,
                  }}
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    support@medilocate.com
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <IconButton 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(67, 233, 123, 0.2)', 
                    color: '#43e97b',
                    minWidth: 'auto',
                    p: 1,
                  }}
                >
                  <PhoneIcon fontSize="small" />
                </IconButton>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    +91 98765 43210
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <IconButton 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(240, 147, 251, 0.2)', 
                    color: '#f093fb',
                    minWidth: 'auto',
                    p: 1,
                  }}
                >
                  <SupportAgentIcon fontSize="small" />
                </IconButton>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    24/7 Support
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    Always Available
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Bottom Footer */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ opacity: 0.7, textAlign: { xs: 'center', md: 'left' } }}>
              © {currentYear} MediLocate. All rights reserved. Built with ❤️ for better healthcare.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              display="flex" 
              justifyContent={{ xs: 'center', md: 'flex-end' }} 
              gap={3}
              mt={{ xs: 2, md: 0 }}
            >
              <MuiLink
                component={Link}
                to="/privacy"
                underline="none"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#667eea' },
                }}
              >
                Privacy
              </MuiLink>
              <MuiLink
                component={Link}
                to="/terms"
                underline="none"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#667eea' },
                }}
              >
                Terms
              </MuiLink>
              <MuiLink
                component={Link}
                to="/sitemap"
                underline="none"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem',
                  '&:hover': { color: '#667eea' },
                }}
              >
                Sitemap
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;