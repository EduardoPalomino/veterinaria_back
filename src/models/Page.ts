import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  order: String,
  ruta: String,
  nombre: String,
  descripcion: String,
  icon: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('page', PageSchema);