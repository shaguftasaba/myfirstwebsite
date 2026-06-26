// Node.js/Express Backend for Portfolio Admin Panel
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Data file path
const dataFile = path.join(__dirname, 'data', 'forms.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize forms.json if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify({ forms: [] }, null, 2));
}

// ==================== ADMIN CREDENTIALS ====================
// Default admin credentials (change these in production!)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'portfolio123';
// In production, use hashed passwords with bcrypt

// ==================== API ENDPOINTS ====================

// POST: Submit contact form
app.post('/api/forms/submit', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    // Read existing forms
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

    // Create new form entry
    const newForm = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
      submittedAt: new Date().toISOString(),
      read: false
    };

    // Add to forms array
    data.forms.push(newForm);

    // Save to file
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      form: newForm
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST: Admin login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // In production, create a JWT token
      const token = 'admin_token_' + Date.now();
      res.json({
        success: true,
        message: 'Login successful',
        token
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET: Get all forms (Admin only)
app.get('/api/admin/forms', authenticateAdmin, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    res.json({
      success: true,
      forms: data.forms,
      total: data.forms.length,
      unread: data.forms.filter(f => !f.read).length
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET: Get single form
app.get('/api/admin/forms/:id', authenticateAdmin, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const form = data.forms.find(f => f.id === req.params.id);

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    // Mark as read
    form.read = true;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.json({ success: true, form });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE: Delete form
app.delete('/api/admin/forms/:id', authenticateAdmin, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const index = data.forms.findIndex(f => f.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    const deletedForm = data.forms.splice(index, 1);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.json({ success: true, message: 'Form deleted', form: deletedForm[0] });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE: Clear all forms (Admin only)
app.delete('/api/admin/forms', authenticateAdmin, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const count = data.forms.length;
    data.forms = [];
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.json({ success: true, message: `Cleared ${count} forms` });
  } catch (error) {
    console.error('Error clearing forms:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== MIDDLEWARE ====================

// Authentication middleware
function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || !token.startsWith('admin_token_')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
}

// ==================== SERVER ====================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║   Portfolio Admin Panel Server         ║
    ║   Running on: http://localhost:${PORT}   ║
    ╚════════════════════════════════════════╝
  `);
  console.log(`\n📋 Admin Panel: http://localhost:${PORT}/admin-login.html`);
  console.log(`📧 Default Credentials:`);
  console.log(`   Username: ${ADMIN_USERNAME}`);
  console.log(`   Password: ${ADMIN_PASSWORD}\n`);
});
