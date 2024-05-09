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

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/contact', contactRoutes);

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).send('An unexpected error occurred');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
  );
}

const port = process.env.PORT || 5001;
// Start the server and handle the error
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use.`);
    process.exit(1);
  } else {
    throw error;
  }
});
