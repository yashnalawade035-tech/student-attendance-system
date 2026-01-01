const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Student Schema (The structure of your data)
const studentSchema = new mongoose.Schema({
    name: String,
    roll: { type: String, unique: true },
    course: String
});
const Student = mongoose.model('Student', studentSchema);

// --- API Endpoints ---

// Get all students
app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Add a student
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: "Duplicate Roll Number or Invalid Data" });
    }
});

// Update a student
app.put('/api/students/:id', async (req, res) => {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Record Deleted" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));