// Admin Dashboard JavaScript

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = '/admin-login.html';
    return;
  }

  // Initialize event listeners
  initializeEventListeners();
  loadForms();
});

// ==================== EVENT LISTENERS ====================

function initializeEventListeners() {
  // Sidebar navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section;
      switchSection(section);
      
      // Update active state
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Close mobile menu
      const sidebar = document.querySelector('.sidebar-nav');
      sidebar.classList.remove('active');
      document.querySelector('.sidebar-toggle').textContent = '☰';
    });
  });

  // Sidebar toggle (mobile)
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar-nav');
      sidebar.classList.toggle('active');
      sidebarToggle.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Refresh button
  document.getElementById('refreshBtn').addEventListener('click', loadForms);

  // Search functionality
  document.getElementById('searchInput').addEventListener('input', filterForms);

  // Clear all button
  document.getElementById('clearAllBtn').addEventListener('click', showClearConfirmation);
  document.getElementById('clearAllSettingsBtn').addEventListener('click', showClearConfirmation);

  // Modal close buttons
  document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close modal when clicking outside
  document.getElementById('formModal').addEventListener('click', (e) => {
    if (e.target.id === 'formModal') {
      closeModal();
    }
  });
}

// ==================== SECTION SWITCHING ====================

function switchSection(section) {
  // Hide all sections
  document.querySelectorAll('.admin-section').forEach(s => {
    s.classList.remove('active');
  });

  // Show selected section
  document.getElementById(section + 'Section').classList.add('active');

  // Update page title
  const titles = {
    forms: 'Form Submissions',
    stats: 'Statistics',
    settings: 'Settings'
  };
  document.getElementById('pageTitle').textContent = titles[section];

  // Load data for stats section
  if (section === 'stats') {
    loadStatistics();
  }
}

// ==================== FORMS MANAGEMENT ====================

async function loadForms() {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('/api/admin/forms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      logout();
      return;
    }

    const data = await response.json();

    if (data.success) {
      displayForms(data.forms);
      updateStats(data);
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.error('Error loading forms:', error);
    showError('Failed to load forms');
  }
}

function displayForms(forms) {
  const container = document.getElementById('formsContainer');

  if (forms.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>📭 No form submissions yet</p></div>';
    return;
  }

  // Sort forms by submission date (newest first)
  forms.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  container.innerHTML = forms.map(form => `
    <div class="form-item ${!form.read ? 'unread' : ''}" onclick="viewForm('${form.id}')">
      <div class="form-item-header">
        <span class="form-item-name">${escapeHtml(form.name)}</span>
        <span class="form-item-time">${formatDate(form.submittedAt)}</span>
      </div>
      <div class="form-item-email">${escapeHtml(form.email)}</div>
      <span class="form-item-subject">${escapeHtml(form.subject)}</span>
    </div>
  `).join('');
}

function updateStats(data) {
  document.getElementById('totalForms').textContent = data.total;
  document.getElementById('unreadForms').textContent = data.unread;
  document.getElementById('statTotal').textContent = data.total;
  document.getElementById('statRead').textContent = data.total - data.unread;
  document.getElementById('statUnread').textContent = data.unread;
}

async function viewForm(formId) {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`/api/admin/forms/${formId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      const form = data.form;
      const modalBody = document.getElementById('modalBody');
      
      modalBody.innerHTML = `
        <div class="modal-form-group">
          <label>Name:</label>
          <p>${escapeHtml(form.name)}</p>
        </div>
        <div class="modal-form-group">
          <label>Email:</label>
          <p><a href="mailto:${escapeHtml(form.email)}">${escapeHtml(form.email)}</a></p>
        </div>
        <div class="modal-form-group">
          <label>Phone:</label>
          <p>${escapeHtml(form.phone)}</p>
        </div>
        <div class="modal-form-group">
          <label>Subject:</label>
          <p>${escapeHtml(form.subject)}</p>
        </div>
        <div class="modal-form-group">
          <label>Message:</label>
          <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(form.message)}</p>
        </div>
        <div class="modal-form-group">
          <label>Submitted:</label>
          <p>${formatDate(form.submittedAt)}</p>
        </div>
      `;

      // Store current form ID for deletion
      document.getElementById('deleteFormBtn').onclick = () => deleteForm(formId);

      showModal();
      loadForms(); // Refresh to update unread count
    }
  } catch (error) {
    console.error('Error viewing form:', error);
    showError('Failed to load form details');
  }
}

async function deleteForm(formId) {
  if (!confirm('Are you sure you want to delete this form?')) {
    return;
  }

  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`/api/admin/forms/${formId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      closeModal();
      loadForms();
      showSuccess('Form deleted successfully');
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.error('Error deleting form:', error);
    showError('Failed to delete form');
  }
}

async function clearAllForms() {
  if (!confirm('Are you sure? This will delete ALL form submissions. This action cannot be undone.')) {
    return;
  }

  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('/api/admin/forms', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      loadForms();
      showSuccess(data.message);
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.error('Error clearing forms:', error);
    showError('Failed to clear forms');
  }
}

function filterForms() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const formItems = document.querySelectorAll('.form-item');

  formItems.forEach(item => {
    const name = item.querySelector('.form-item-name').textContent.toLowerCase();
    const email = item.querySelector('.form-item-email').textContent.toLowerCase();

    if (name.includes(searchTerm) || email.includes(searchTerm)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// ==================== STATISTICS ====================

async function loadStatistics() {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('/api/admin/forms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      const forms = data.forms;
      
      // Sort by date for recent list
      const recent = forms.sort((a, b) => 
        new Date(b.submittedAt) - new Date(a.submittedAt)
      ).slice(0, 5);

      document.getElementById('recentFormsContainer').innerHTML = recent.length > 0 
        ? recent.map(form => `
            <div class="recent-item">
              <div class="recent-item-info">
                <div class="recent-item-name">${escapeHtml(form.name)}</div>
                <div class="recent-item-email">${escapeHtml(form.email)}</div>
              </div>
              <div class="recent-item-time">${formatDate(form.submittedAt)}</div>
            </div>
          `).join('')
        : '<div class="empty-state"><p>No submissions yet</p></div>';
    }
  } catch (error) {
    console.error('Error loading statistics:', error);
  }
}

// ==================== UTILITIES ====================

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ==================== MODAL MANAGEMENT ====================

function showModal() {
  document.getElementById('formModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('formModal').style.display = 'none';
}

function showClearConfirmation() {
  clearAllForms();
}

// ==================== NOTIFICATIONS ====================

function showSuccess(message) {
  // Create temporary notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(34, 211, 238, 0.2);
    border: 1px solid rgba(34, 211, 238, 0.5);
    color: #7dd3fc;
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 2000;
    font-weight: 600;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

function showError(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.5);
    color: #fca5a5;
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 2000;
    font-weight: 600;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

// ==================== LOGOUT ====================

function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin-login.html';
}
