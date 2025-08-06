const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Backend Running");
});

const PORT = 5000;
mongoose
.connect(process.env.Mongo_URL)
.then(()=>{
    console.log("Mongo db connected");
    app.listen(5000, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch((err) => console.error("❌ MongoDB Connection Error:", err));
