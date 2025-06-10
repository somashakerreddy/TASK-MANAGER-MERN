import dotenv from 'dotenv';
dotenv.config(); // Must be at the very top

import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

// Debug: Verify environment variables
console.log('[ENV CHECK] MONGO_URI:', process.env.MONGO_URI ? '***loaded***' : 'NOT LOADED!');
console.log('[ENV CHECK] PORT:', process.env.PORT || 'Not set, using default (3000)');
console.log('[ENV CHECK] JWT_SECRET:', process.env.JWT_SECRET ? '***loaded***' : 'NOT LOADED!');

// ✅ Log FRONTEND_BASE_URL or fallback
console.log('[ENV CHECK] FRONTEND_BASE_URL:', process.env.FRONTEND_BASE_URL || 'http://localhost:5173');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

// ✅ Allow frontend on port 5174 if env not set
app.use(cors({
  origin: process.env.FRONTEND_BASE_URL || 'http://localhost:5174',
  credentials: true
}));

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, Welcome To Task Manager Backend' });
});

// Database Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB connection URI is not defined');
    }

    const connectionString = process.env.MONGO_URI.includes('?')
      ? process.env.MONGO_URI
      : `${process.env.MONGO_URI}?retryWrites=true&w=majority`;

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Task-Manager'

    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n[SUCCESS] Server running:`);
      console.log(`- Local: http://localhost:${PORT}`);
      console.log(`- API Base: http://localhost:${PORT}/api/v1`);
      console.log(`- MongoDB: Connected to ${mongoose.connection.name} database\n`);
    });
  } catch (error) {
    console.error('\n[FAILURE] Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
