const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = parseInt(process.env.PORT) || 8005;
const DATA_FILE = path.join(__dirname, 'notes.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from ./dist
app.use(express.static(path.join(__dirname, 'dist')));

// In-memory storage with file persistence
let notes = [];

// Load notes from file on startup
function loadNotes() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      notes = JSON.parse(data);
      console.log(`Loaded ${notes.length} notes from file`);
    }
  } catch (err) {
    console.error('Error loading notes:', err.message);
    notes = [];
  }
}

// Save notes to file
function saveNotes() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
  } catch (err) {
    console.error('Error saving notes:', err.message);
  }
}

// Initialize data
loadNotes();

// GET /notes - Get all notes
app.get('/notes', (req, res) => {
  res.json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// POST /notes - Create new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }
  
  const newNote = {
    id: notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1,
    title: title.trim(),
    content: content || '',
    createdAt: new Date().toISOString()
  };
  
  notes.push(newNote);
  saveNotes();
  
  res.status(201).json({
    success: true,
    data: newNote
  });
});

// DELETE /notes/:id - Delete note
app.delete('/notes/:id', (req, res) => {
  const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
  
  if (noteIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Note not found'
    });
  }
  
  const deleted = notes.splice(noteIndex, 1)[0];
  saveNotes();
  
  res.json({
    success: true,
    data: deleted
  });
});

// GET /health - Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'notes-api'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`📝 Notes API server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist')}`);
  console.log(`📝 Endpoints:`);
  console.log(`   GET    /notes       - Get all notes`);
  console.log(`   POST   /notes       - Create new note`);
  console.log(`   DELETE /notes/:id   - Delete note`);
  console.log(`   GET    /health      - Health check`);
});
