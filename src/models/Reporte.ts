import mongoose from 'mongoose';

const ReporteSchema = new mongoose.Schema({
  tipo_reporte: String,
  fecha_generado: String,
  contenido: String,
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('reporte', ReporteSchema);