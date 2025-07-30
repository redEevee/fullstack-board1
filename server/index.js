const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
