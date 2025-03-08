import mongoose from 'mongoose';

const VentaSchema = new mongoose.Schema({
  fecha: String,
  total: String,
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente' },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('venta', VentaSchema);