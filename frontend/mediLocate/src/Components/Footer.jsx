import { Box, Container, Grid, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: "#f5f5f5", py: 4, mt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              HealthConnect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your trusted platform for medical appointments, pharmacy orders, and health support.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <MuiLink component={Link} to="/" underline="hover" color="inherit">
                Home
              </MuiLink>
              <MuiLink component={Link} to="/about" underline="hover" color="inherit">
                About Us
              </MuiLink>
              <MuiLink component={Link} to="/contact" underline="hover" color="inherit">
                Contact
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@healthconnect.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +91 98765 43210
            </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} HealthConnect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;