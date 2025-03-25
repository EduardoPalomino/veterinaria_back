import mongoose from 'mongoose';

const SexoSchema = new mongoose.Schema({
  descripcion: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('sexo', SexoSchema);