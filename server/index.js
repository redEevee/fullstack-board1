const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/posts");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
