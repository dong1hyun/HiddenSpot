require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const placeRouter = require("./routes/place");
const userRouter = require("./routes/user");

app.use("/place", placeRouter);
app.use("/user", userRouter);

app.get('/', (req, res) => {
  res.send('Express Server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});