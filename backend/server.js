import express from 'express';
import path from 'path';
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

connectDB().then(() => {
  console.log('Database connected successfully');
}).catch(error => {
  console.error('Database connection failed:', error);
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use(cors());
app.use(express.json());

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../../../frontend/build')));

app.use('/api/contact', contactRoutes);

// Serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../frontend/build', 'index.html'));
});
console.log('Serving static files from:', path.join(__dirname, '../../../frontend/build'));

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).send('An unexpected error occurred');
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
