# Portfolio Admin Panel - Setup & Usage Guide

## 📋 Overview

Your portfolio now includes a complete **admin panel system** for managing contact form submissions. This guide will help you set up and use it.

---

## 🚀 Quick Start

### Step 1: Install Node.js Dependencies

```bash
npm install
```

This installs:
- `express` - Web server framework
- `cors` - Handle cross-origin requests
- `body-parser` - Parse form data
- `nodemon` (dev) - Auto-restart server during development

### Step 2: Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

**You should see:**
```
╔════════════════════════════════════════╗
║   Portfolio Admin Panel Server         ║
║   Running on: http://localhost:3000    ║
╚════════════════════════════════════════╝

📋 Admin Panel: http://localhost:3000/admin-login.html
📧 Default Credentials:
   Username: admin
   Password: portfolio123
```

### Step 3: Access Admin Panel

1. Open browser: `http://localhost:3000/admin-login.html`
2. Login with default credentials
3. View and manage form submissions

---

## 🔑 Default Credentials

- **Username:** `admin`
- **Password:** `portfolio123`

⚠️ **IMPORTANT:** Change these in production!

To change credentials, edit `server.js`:
```javascript
const ADMIN_USERNAME = 'your_username';
const ADMIN_PASSWORD = 'your_password';
```

---

## 📁 File Structure

```
portfolio web/
├── server.js                 ← Backend API server
├── package.json             ← Node.js dependencies
├── .env                     ← Environment variables
├── admin-login.html         ← Admin login page
├── admin-dashboard.html     ← Admin dashboard
├── contact.html             ← Contact form (updated)
├── css/
│   ├── admin.css            ← Admin styling
│   └── contact.css          ← Updated with form styles
├── js/
│   └── admin-dashboard.js   ← Admin panel functionality
└── data/
    └── forms.json           ← Stored form submissions
```

---

## 🎯 How It Works

### Contact Form Flow:
1. **User fills contact form** on `/contact.html`
2. **Form submits via API** to `/api/forms/submit`
3. **Backend validates** and stores in `data/forms.json`
4. **User sees confirmation** message

### Admin Access Flow:
1. **Admin logs in** with credentials
2. **Token stored** in browser localStorage
3. **Dashboard fetches** all submissions from `/api/admin/forms`
4. **Admin can view, search, delete** forms

---

## 📊 Admin Dashboard Features

### All Forms Section
- **View all submissions** in a list
- **Search** by name or email
- **Click to view details** in a modal
- **Delete individual** forms
- **See unread count**

### Statistics Section
- **Total submissions** count
- **Read vs Unread** forms
- **Recent submissions** list
- **Quick overview** of activity

### Settings Section
- **Admin information**
- **Clear all submissions** (with confirmation)
- **API information**

---

## 🔌 API Endpoints

All admin endpoints require authentication with a token.

### 1. Submit Contact Form (Public)
```
POST /api/forms/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss..."
}

Response:
{
  "success": true,
  "message": "Form submitted successfully",
  "form": { ... }
}
```

### 2. Admin Login
```
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "portfolio123"
}

Response:
{
  "success": true,
  "token": "admin_token_..."
}
```

### 3. Get All Forms (Admin)
```
GET /api/admin/forms
Authorization: Bearer admin_token_...

Response:
{
  "success": true,
  "forms": [...],
  "total": 5,
  "unread": 2
}
```

### 4. Get Single Form (Admin)
```
GET /api/admin/forms/:id
Authorization: Bearer admin_token_...

Response:
{
  "success": true,
  "form": { ... }
}
```

### 5. Delete Form (Admin)
```
DELETE /api/admin/forms/:id
Authorization: Bearer admin_token_...

Response:
{
  "success": true,
  "message": "Form deleted",
  "form": { ... }
}
```

### 6. Clear All Forms (Admin)
```
DELETE /api/admin/forms
Authorization: Bearer admin_token_...

Response:
{
  "success": true,
  "message": "Cleared 5 forms"
}
```

---

## 📦 Data Storage

Forms are stored in `data/forms.json` with the following structure:

```json
{
  "forms": [
    {
      "id": "1624567890123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "subject": "Project Inquiry",
      "message": "I'd like to discuss your services...",
      "submittedAt": "2024-06-26T10:30:45.123Z",
      "read": false
    }
  ]
}
```

---

## 🔒 Security Considerations

### Current Setup (Development)
- ✅ Basic authentication with tokens
- ✅ CORS enabled
- ✅ Data stored locally

### For Production, Add:
- ⚠️ JWT tokens with expiration
- ⚠️ Password hashing (bcrypt)
- ⚠️ HTTPS/SSL encryption
- ⚠️ Database instead of JSON files
- ⚠️ Rate limiting
- ⚠️ Input sanitization
- ⚠️ Change default credentials
- ⚠️ Environment-based configuration

Example with bcrypt:
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
```

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "Port 3000 already in use"
Change port in `.env` or `server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### Forms not saving
Check `data/` folder exists and is writable

### Admin panel blank
- Clear browser cache
- Check browser console for errors
- Ensure backend is running (`npm start`)

### CORS errors
Make sure backend is running on `http://localhost:3000`

---

## 📝 Usage Example

### For Users:
1. Go to `/contact.html`
2. Fill out the form
3. Click "Send Message"
4. See confirmation

### For Admin:
1. Go to `/admin-login.html`
2. Login with credentials
3. View dashboard
4. Click forms to see details
5. Delete as needed

---

## 🎨 Customization

### Change Admin Credentials
Edit `server.js`:
```javascript
const ADMIN_USERNAME = 'your_username';
const ADMIN_PASSWORD = 'your_password';
```

### Change Port
Edit `.env`:
```
PORT=3001
```

### Add More Form Fields
1. Add input to `contact.html`
2. Include in form submission JavaScript
3. Update server.js validation
4. Admin dashboard will display automatically

---

## 🚀 Deployment

### For Production:
1. Use Node.js hosting (Heroku, DigitalOcean, etc.)
2. Set environment variables on server
3. Use HTTPS
4. Implement database
5. Add password hashing
6. Use JWT tokens

### Example Environment Variables (.env)
```
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_secure_password
DB_URL=your_database_url
```

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `server.js` | Node.js backend API |
| `admin-login.html` | Admin login page |
| `admin-dashboard.html` | Admin dashboard UI |
| `js/admin-dashboard.js` | Admin panel functionality |
| `css/admin.css` | Admin panel styling |
| `contact.html` | Contact form (updated) |
| `data/forms.json` | Submitted forms storage |
| `package.json` | Node dependencies |
| `.env` | Environment config |

---

## ✅ Features Summary

✅ **Contact Form** - Users can submit messages
✅ **Form Storage** - Submissions saved to file
✅ **Admin Login** - Secure authentication
✅ **View Forms** - See all submissions
✅ **Search** - Find forms by name/email
✅ **Details Modal** - View full form content
✅ **Delete Forms** - Remove individual submissions
✅ **Statistics** - See submission stats
✅ **Responsive** - Works on mobile & desktop
✅ **Easy Setup** - Just `npm install && npm start`

---

## 📞 Support

If you encounter issues:
1. Check terminal for error messages
2. Verify Node.js is installed: `node --version`
3. Verify npm is installed: `npm --version`
4. Check if backend is running
5. Review browser console for errors

---

## 🎉 You're All Set!

Your portfolio admin panel is ready to use. Start the server and begin collecting form submissions!

```bash
npm start
```

Then visit: `http://localhost:3000/admin-login.html`
