require("dotenv").config();
const express = require("express");
const { connectionWithDB } = require("./src/config/db");
const { userRouter } = require("./src/routes/user.routes");
const { orderRoutes } = require("./src/routes/order.routes");
const { reviewRoutes } = require("./src/routes/review.route");
const app = express();
app.use(express.json());



app.use('/user',userRouter);

app.use('/order',orderRoutes);

app.use('/review', reviewRoutes)


app.get("/", (req, res) => {
  res.send("This is home route");
});
app.listen(process.env.PORT, async () => {
  await connectionWithDB();
  console.log(`Server is running at ${process.env.PORT}`);
});
