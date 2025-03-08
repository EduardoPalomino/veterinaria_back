import mongoose from 'mongoose';

const Detalle_compraSchema = new mongoose.Schema({
  compra_id: { type: mongoose.Schema.Types.ObjectId, ref: 'compra' },
  producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'producto' },
  cantidad: String,
  precio_compra: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('detalle_compra', Detalle_compraSchema);