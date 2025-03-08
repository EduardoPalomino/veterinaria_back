import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  rol_id: { type: mongoose.Schema.Types.ObjectId, ref: 'rol' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('usuario', UsuarioSchema);