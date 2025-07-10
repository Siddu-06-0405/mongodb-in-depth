const express = require('express');
const Counter = require('./models/Counter.js');
const connectToMongoDB = require('../db/connectToMongoDB.js')

require('dotenv').config();
connectToMongoDB();
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post('/increment', async (req, res) => {
    try {
        const existing = await Counter.findOne();
        if (!existing) {
            await Counter.create({ value: 0 });
            console.log("Initialized counter with value 0");
        }
        const counter = await Counter.findOne(); // 1. Read current value
        counter.value += 1;                      // 2. Increment in memory
        await counter.save();                    // 3. Save back to DB
        res.json({ success: true, value: counter.value });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/current-value", async (req, res) => {
    try {
        const counter = await Counter.findOne(); // 1. Read current value
        res.json({ success: true, value: counter.value }); //2. send current value
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

app.put("/modify-value/:value", async (req, res) => {
    try {
        const newValue = parseInt(req.params.value); // Convert string to number

        const counter = await Counter.findOneAndUpdate(
            {},                         // match any document (only one counter)
            { value: newValue },        // update value to newValue
            { new: true, upsert: true } // return updated doc; create if none exists
        );

        res.json({ success: true, value: counter.value });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/increment-atomic', async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, value: counter.value });
  } catch (err) {
    console.error("🔥 Error:", err); // inside catch block
    res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(3000, () => {
    console.log("app running on port 3000");
})