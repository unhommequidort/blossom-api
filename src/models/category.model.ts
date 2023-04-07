import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isEditable: {
    type: Boolean,
    required: false,
    defalt: true,
  },
  color: {
    id: String,
    name: String,
    code: String,
  },
  icon: {
    id: String,
    name: String,
    symbol: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Category = mongoose.model('Category', categorySchema);
