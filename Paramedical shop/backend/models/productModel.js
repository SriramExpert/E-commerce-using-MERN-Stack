import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  genericName: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['tablet', 'capsule', 'syrup', 'injection', 'drops', 'ointment', 'cream', 'gel', 'powder', 'device', 'other'],
    default: 'tablet'
  },
  strength: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  minStock: {
    type: Number,
    default: 10
  },
  images: [{
    type: String
  }],
  requiresPrescription: {
    type: Boolean,
    default: false
  },
  expiryDate: {
    type: Date
  },
  manufacturer: {
    type: String
  },
  composition: [{
    ingredient: String,
    quantity: String
  }],
  sideEffects: [String],
  dosage: {
    type: String
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  soldCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', genericName: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ requiresPrescription: 1 });
productSchema.index({ isActive: 1, stock: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;