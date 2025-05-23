import mongoose from 'mongoose';

const Historia_clinicaSchema = new mongoose.Schema({
  mascota_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mascota' },
  fecha: String,
  peso: String,
  tipo_visita: String,
  signo: String,
  alergia: String,
  fecha_proxima_control: String,
  frecuencia_cardiaca: String,
  frecuencia_respiratoria: String,
  temperatura: String,
  prueba_complementaria: String,
  tllc: String,
  diagnostico: String,
  tratamiento: String,
  archivo: String,
  atendido_por: String,
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('historia_clinica', Historia_clinicaSchema);