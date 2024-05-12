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
app.use(cors());
app.use(express.json());

const isDevelopment = process.env.NODE_ENV !== 'production';
const basePath = isDevelopment ? 
    path.join(__dirname, 'C:\Users\zakfr\OneDrive\Desktop\dadajon\frontend\build\index.html') : // Adjust this path based on your local development structure
    '/opt/render/frontend/build'; // This should be the absolute path on your production server

app.use(express.static(basePath));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/contact', contactRoutes);

// Serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'));
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).send('An unexpected error occurred');
});

const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving static files from: ${basePath}`);
});
