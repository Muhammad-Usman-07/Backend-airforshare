const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging line

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log('MongoDB connection error:', err));

const numberSchema = new mongoose.Schema({
  site: String,
});

const Number = mongoose.model('Number', numberSchema);

app.post('/api/numbers', async (req, res) => {
  const newNumber = new Number(req.body);
  await newNumber.save();
  res.json(newNumber);
});

app.get('/api/numbers', async (req, res) => {
  const numbers = await Number.find();
  res.json(numbers);
});

app.delete('/api/numbers/:id', async (req, res) => {
  await Number.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
