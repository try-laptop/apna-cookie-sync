const mongoose = require('mongoose');

// Schema for individual cookie objects within the cookies array
const cookieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, default: '' },
  domain: { type: String, required: true },
  path: { type: String, required: true },
  secure: { type: Boolean, default: false },
  httpOnly: { type: Boolean, default: false },
  sameSite: { type: String, default: 'lax' },
  expirationDate: { type: Number }
}, { _id: false }); // Don't add _id to each cookie in the array

// Main schema for cookie entries
const cookieEntrySchema = new mongoose.Schema({
  exportDate: {
    type: Date,
    default: Date.now
  },
  domains: [{
    type: String
  }],
  cookies: [cookieSchema]
}, { 
  timestamps: true,
  versionKey: false 
});

// Create index on createdAt to optimize latest cookie retrieval
cookieEntrySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Cookie', cookieEntrySchema);
