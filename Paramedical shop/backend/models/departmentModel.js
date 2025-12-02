import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: '💊'
  },
  description: {
    type: String
  },
  categories: [{
    type: String,
    required: true
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;