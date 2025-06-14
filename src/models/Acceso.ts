import mongoose from 'mongoose';

const AccesoSchema = new mongoose.Schema({
  rol_id: { type: mongoose.Schema.Types.ObjectId, ref: 'rol' },
  page: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('acceso', AccesoSchema);