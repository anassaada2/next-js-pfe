// models/Visitor.js
import mongoose from 'mongoose';

const visitedPageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: null,
  },
  visitedPages: [visitedPageSchema],
  sessionEnd: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);
export default Visitor;