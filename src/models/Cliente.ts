import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  dni: String,
  telefono: String,
  direccion: String,
  email: String,
  indicacion_general: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('cliente', ClienteSchema);