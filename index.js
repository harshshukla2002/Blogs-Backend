const express = require("express");
const { connection } = require("./database");
require("dotenv").config();
const cors = require("cors");
const { userRoute } = require("./routes/user.route");
const { blogRoute } = require("./routes/blog.route");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/user", userRoute);
server.use("/blog", blogRoute);

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`connection established on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
