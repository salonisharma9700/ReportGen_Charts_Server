// routes/graphRoutes.js
import express from 'express';
import Graph from '../models/Graph.js';

const router = express.Router();

router.post('/save-graphs', async (req, res) => {
  const { graphs } = req.body; // Get the graphs from the request body

  try {
    const newGraph = new Graph({ graphs });
    await newGraph.save();
    res.status(201).send('Graphs saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default router;
