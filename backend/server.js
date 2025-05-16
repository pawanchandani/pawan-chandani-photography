const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Contact Form: ${name}, ${email}, ${message}`);
  res.json({ message: 'Message received successfully!' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
