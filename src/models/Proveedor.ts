import mongoose from 'mongoose';

const ProveedorSchema = new mongoose.Schema({
  nombre: String,
  ruc: String,
  telefono: String,
  email: String,
  direccion: String,
  contacto: String,
  observaciones: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('proveedor', ProveedorSchema);