const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const DATA_FILE = 'data.json';

// Load data from JSON file
function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    const rawData = fs.readFileSync(DATA_FILE);
    return JSON.parse(rawData);
  }
  return { members: [], trainers: [] };
}

// Save data to JSON file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let database = loadData();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes

// Get Members
app.get('/api/members', (req, res) => {
  res.json(database.members);
});

// Add Member
app.post('/api/members', (req, res) => {
  const { name, age, plan } = req.body;
  database.members.push({ name, age, plan });
  saveData(database);
  res.json({ message: 'Member added successfully!' });
});

// Delete Member
app.delete('/api/members/:index', (req, res) => {
  database.members.splice(req.params.index, 1);
  saveData(database);
  res.json({ message: 'Member deleted successfully!' });
});

// Get Trainers
app.get('/api/trainers', (req, res) => {
  res.json(database.trainers);
});

// Add Trainer
app.post('/api/trainers', (req, res) => {
  const { name, specialty } = req.body;
  database.trainers.push({ name, specialty });
  saveData(database);
  res.json({ message: 'Trainer added successfully!' });
});

// Delete Trainer
app.delete('/api/trainers/:index', (req, res) => {
  database.trainers.splice(req.params.index, 1);
  saveData(database);
  res.json({ message: 'Trainer deleted successfully!' });
});

// Start server
app.listen(port, () => {
  console.log(Server running on port ${port});
});
