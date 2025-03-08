import mongoose from 'mongoose';

const CompraSchema = new mongoose.Schema({
  fecha: String,
  total: String,
  proveedor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor' },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('compra', CompraSchema);