import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  foto: String,
  categoria_producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categoria_producto' },
  tamano: String,
  precio_venta: String,
  stock: String,
  descripcion: String,
  proveedor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedor' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('producto', ProductoSchema);