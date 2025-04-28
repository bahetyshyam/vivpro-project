import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import router from './routes';

const app = express();
const port = process.env.PORT || 3001;

// Basic middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minute
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

app.use(
  helmet()
);

// API routes
app.use('/api', router);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});