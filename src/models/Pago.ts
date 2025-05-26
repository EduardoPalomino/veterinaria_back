import mongoose from 'mongoose';

const PagoSchema = new mongoose.Schema({
  venta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'venta' },
  medio_pago: String,
  cuota: String,
  monto: String,
  estado: String,
  fecha_pago: String,
  fecha_vencimiento: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('pago', PagoSchema);