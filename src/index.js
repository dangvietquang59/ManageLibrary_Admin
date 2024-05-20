const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/auth");
const bookRoute = require("./routes/book");
const profileRoute = require("./routes/profile");
// const insertBooks = require("./models/insertBook");
// Kết nối đến cơ sở dữ liệu MongoDB
db.connect();
// Sử dụng CORS middleware
app.use(cors({ origin: true, credentials: true }));
// Middleware
app.use(express.json());

// Routes
app.use("/v1/auth", authRoute);

app.use("/v2/books", bookRoute);

app.use("/v3/profile", profileRoute);
// insertBooks();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
