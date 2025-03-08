import mongoose from 'mongoose';

const Historia_clinicaSchema = new mongoose.Schema({
  mascota_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mascota' },
  fecha: String,
  motivo_consulta: String,
  diagnostico: String,
  tratamiento: String,
  observaciones: String,
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('historia_clinica', Historia_clinicaSchema);