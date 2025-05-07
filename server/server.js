const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://trylaptop2024:trylaptop2024@cookies.m2qyhmn.mongodb.net/?retryWrites=true&w=majority&appName=cookies')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

// Import models
const Cookie = require('./models/Cookie');

// Routes

// GET: Server status and latest cookie timestamp
app.get('/api/status', async (req, res) => {
  try {
    const latestCookie = await Cookie.findOne().sort({ createdAt: -1 });
    
    return res.status(200).json({
      online: true,
      lastUpdate: latestCookie ? latestCookie.createdAt : null
    });
  } catch (error) {
    console.error('Status check error:', error);
    return res.status(500).json({ 
      online: true, 
      error: 'Internal server error' 
    });
  }
});

// POST: Upload cookies
app.post('/api/cookies/upload', async (req, res) => {
  try {
    const cookieData = req.body;
    
    if (!cookieData || !cookieData.cookies || !Array.isArray(cookieData.cookies)) {
      return res.status(400).json({ success: false, message: 'Invalid cookie data' });
    }
    
    // Create a new cookie document
    const newCookieEntry = new Cookie({
      exportDate: cookieData.exportDate || new Date(),
      domains: cookieData.domains || ['www.apnacollege.in'],
      cookies: cookieData.cookies
    });
    
    // Save to database
    await newCookieEntry.save();
    
    return res.status(201).json({ 
      success: true, 
      message: 'Cookies uploaded successfully',
      timestamp: newCookieEntry.createdAt
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET: Download latest cookies
app.get('/api/cookies/latest', async (req, res) => {
  try {
    // Get the most recent cookie entry
    const latestCookies = await Cookie.findOne().sort({ createdAt: -1 });
    
    if (!latestCookies) {
      return res.status(404).json({ success: false, message: 'No cookies found' });
    }
    
    return res.status(200).json(latestCookies);
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Basic home route
app.get('/', (req, res) => {
  res.send('Apna College Cookie Sync Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
