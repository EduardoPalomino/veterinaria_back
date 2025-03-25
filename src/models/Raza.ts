import mongoose from 'mongoose';

const RazaSchema = new mongoose.Schema({
  descripcion: String,
  especie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'especie' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('raza', RazaSchema);