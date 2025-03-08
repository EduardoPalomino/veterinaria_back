import mongoose from 'mongoose';

const Detalle_ventaSchema = new mongoose.Schema({
  venta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'venta' },
  producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'producto' },
  cantidad: String,
  precio_venta: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('detalle_venta', Detalle_ventaSchema);