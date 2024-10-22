const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// Initialize app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/chartDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const chartSchema = new mongoose.Schema({
  verbalGraph: Buffer,  // Store as buffer
  performanceGraph: Buffer, 
  misicProfileGraph: Buffer,
});

const ChartModel = mongoose.model("Chart", chartSchema);

// Route to save chart data
app.post("/save-charts", async (req, res) => {
  const { chartObj } = req.body;

  const newChart = new ChartModel({
    verbalGraph: Buffer.from(chartObj.verbalGraph, "base64"),
    performanceGraph: Buffer.from(chartObj.performanceGraph, "base64"),
    misicProfileGraph: Buffer.from(chartObj.misicProfileGraph, "base64"),
  });

  try {
    await newChart.save();
    res.status(200).send("Charts saved successfully.");
  } catch (error) {
    res.status(500).send("Error saving charts: " + error.message);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
