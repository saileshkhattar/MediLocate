const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config();

const AuthRouter = require("./Routers/AuthRouter")
const PharmacyRouter = require("./Routers/PharmacyRouter")
const ProfileRouter = require("./Routers/ProfileRouter")


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/", (req, res)=>{
    res.send("Backend Running");
});

app.use("/auth", AuthRouter)
app.use("/pharmacy", PharmacyRouter);
app.use("/profile", ProfileRouter)

const PORT = 5000;
mongoose
.connect(process.env.Mongo_URL)
.then(()=>{
    console.log("Mongo db connected");
    app.listen(5000, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch((err) => console.error("❌ MongoDB Connection Error:", err));
