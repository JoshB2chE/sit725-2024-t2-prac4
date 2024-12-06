const { MongoClient } = require('mongodb');
const express = require('express');

const PORT = 3000;
const app = express();
const mongo = new MongoClient('mongodb://db:27017');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', async (req, res) => {
  await mongo.connect();
  const users = mongo.db('sit725').collection('users');
  const result = await users.find().toArray();
  res.json(result);
});

app.post('/user', async (req, res) => {
  await mongo.connect();
  const users = mongo.db('sit725').collection('users');

  const newUser = { name: 'Joshua Bertucci', studentId: '220254185', updatedAt: Date.now() };
  const result = await users.insertOne(newUser);
  res.json(result);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});