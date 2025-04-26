
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

let members = [
  { name: 'Rahul Verma', age: 25, plan: '3 Months' },
  { name: 'Anjali Singh', age: 28, plan: '1 Month' },
];
let trainers = [
  { name: 'Vikram Rathore', specialty: 'Strength Coach' },
  { name: 'Neha Mishra', specialty: 'Yoga Instructor' },
  { name: 'Sachin Kumar', specialty: 'Cardio & HIIT Expert' },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/members', (req, res) => res.json(members));
app.post('/api/members', (req, res) => {
  const { name, age, plan } = req.body;
  members.push({ name, age, plan });
  res.json({ message: 'Member added successfully!' });
});
app.delete('/api/members/:index', (req, res) => {
  members.splice(req.params.index, 1);
  res.json({ message: 'Member deleted successfully!' });
});

app.get('/api/trainers', (req, res) => res.json(trainers));
app.post('/api/trainers', (req, res) => {
  const { name, specialty } = req.body;
  trainers.push({ name, specialty });
  res.json({ message: 'Trainer added successfully!' });
});
app.delete('/api/trainers/:index', (req, res) => {
  trainers.splice(req.params.index, 1);
  res.json({ message: 'Trainer deleted successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
