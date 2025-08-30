import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";
import bgImage from "../assets/logo-bg.png";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AuthForm = ({
  title,
  subtitle,
  signupFields,
  apiEndpoints,
  redirect,
  switchText,
  switchLink,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Signup
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const { login } = useAuth();
  const[error, setError] = useState("")

  useEffect(() => {
    if (location.state?.tab !== undefined) {
      setTab(location.state.tab);
    }
  }, [location.state]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (tab === 0) {
        const user = await login(form.email, form.password, apiEndpoints.login);
        console.log("Login success:");
        setError("")
        navigate(redirect.login);
      } else {
        const signupData = {
          ...form,
        };
        console.log(signupData);
        const res = await axios.post(apiEndpoints.signup, signupData);
        console.log("Signup success:");
        alert("🎉 Registration successful! Please log in to continue.");
        navigate(redirect.register, { state: { tab: 0 } });
        setError("")
      }
    } catch (err) {
      const message = err.response?.data?.message || err.response?.data || err.message;
      setError(message)
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Heading */}
      <Box textAlign="center" mb={3}>
        <Typography variant="h2" color="#333333">
          {title}
        </Typography>
        <Typography variant="h6" color="#000080">
          {subtitle}
        </Typography>
      </Box>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "700px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Box textAlign="center" mb={2}>
          <img
            src={logo}
            alt="MediLocate Logo"
            style={{ width: "150px", marginBottom: "10px" }}
          />
        </Box>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        {/* Extra fields for signup */}
        {tab === 1 &&
          signupFields?.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              margin="normal"
              label={field.label}
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
            />
          ))}

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <Box mt={3}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            {tab === 0 ? "Login" : "Signup"}
          </Button>
        </Box>

        {error !==""?(<Box mt={2} textAlign="center">
        <Typography variant="h8" color="red">
          {error}
        </Typography></Box>):(<></>)}

        {/* Switch link */}
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            {switchText}{" "}
            <Link component={RouterLink} to={switchLink}>
              Click here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthForm;
