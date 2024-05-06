import express from 'express';
import path from 'path';
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contactRoutes.js';
// import flightRoutes from './routes/flightRoutes.js';


dotenv.config();
// console.log('Environment Variables:', process.env);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

connectDB().then(() => {
  // console.log('Database connected successfully');
}).catch(error => {
  // console.error('Database connection failed:', error);
});
const app = express ();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;




app.use((req, res, next) => {
  // console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length) {
    // console.log('Body:', req.body);
  } else {
    // console.log('No body or unsupported content type.');
  }
  next();
});

app.use(cors()); // Enable CORS
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/contact', contactRoutes);
// Example using Express and Mongoose
// app.use('/api/flights', flightRoutes);

app.use((error, req, res, next) => {
  // console.error('Unhandled error:', error);
  res.status(500).send('An unexpected error occurred');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
