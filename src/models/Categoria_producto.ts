import mongoose from 'mongoose';

const Categoria_productoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('categoria_producto', Categoria_productoSchema);