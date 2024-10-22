// models/Graph.js
import mongoose from 'mongoose';

const graphSchema = new mongoose.Schema({
  graphs: {
    verbal: { type: String, required: true },
    performance: { type: String, required: true },
    misic: { type: String, required: true },
  },
});

const Graph = mongoose.model('Graph', graphSchema);
export default Graph;
