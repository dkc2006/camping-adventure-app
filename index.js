const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const campingSpotRoutes = require('./routes/campingSpot');

const app = express();

mongoose.connect('mongodb://localhost:27017/camping-adventure', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', campingSpotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
