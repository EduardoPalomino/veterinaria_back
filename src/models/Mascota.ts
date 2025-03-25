import mongoose from 'mongoose';

const MascotaSchema = new mongoose.Schema({
  nombre: String,
  especie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'especie' },
  raza_id: { type: mongoose.Schema.Types.ObjectId, ref: 'raza' },
  fecha_nacimiento: String,
  peso: String,
  sexo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sexo' },
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('mascota', MascotaSchema);