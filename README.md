# To-Do List Application

A modern, feature-rich to-do list application built with HTML, CSS, and JavaScript. This app uses browser's localStorage to persist your tasks, so they remain available even after closing the browser.

## 🎯 Features

### Task Management
- ✅ **Add Tasks** - Create new tasks with a single click
- ✏️ **Edit Tasks** - Modify task description, category, and priority
- 🗑️ **Delete Tasks** - Remove individual tasks
- ✓ **Mark Complete** - Check off completed tasks
- 💾 **Local Storage** - All tasks are automatically saved to browser storage

### Organization
- 🏷️ **Categories** - Organize tasks by:
  - Work
  - Personal
  - Shopping
  - Health
  - Other
- 🚩 **Priority Levels** - Set task priority:
  - High (Red)
  - Medium (Orange)
  - Low (Green)
- 📅 **Date Tracking** - Tasks show creation date (Today, Tomorrow, or specific date)

### Filtering & Sorting
- 📋 **Filter by Status**:
  - All Tasks
  - Active Tasks
  - Completed Tasks
- 📊 **Sort Options**:
  - Sort by Date (newest first)
  - Sort by Priority (High → Low)

### Statistics
- 📈 **Task Statistics** - View at a glance:
  - Total tasks
  - Active tasks
  - Completed tasks

### Additional Features
- 🧹 **Clear Completed** - Remove all completed tasks at once
- 🗑️ **Clear All** - Delete all tasks (with confirmation)
- 📥 **Export Tasks** - Download tasks as a JSON file
- 🔔 **Toast Notifications** - Feedback messages for actions
- 🌙 **Dark Theme** - Easy on the eyes with a modern dark interface
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 📦 Installation

1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

No installation, build process, or dependencies required. It works completely in your browser.

## 💻 Usage

### Adding a Task
1. Enter your task description in the input field
2. Select a category from the dropdown
3. Choose a priority level
4. Click "Add" or press Enter

### Editing a Task
1. Click the edit (pencil) icon on any task
2. Modify the task description, category, or priority
3. Click "Save Changes"

### Marking Tasks Complete
1. Check the checkbox next to any task
2. The task will be marked as complete (crossed out)

### Deleting a Task
1. Click the delete (trash) icon next to the task
2. The task will be permanently removed

### Filtering Tasks
1. Use the filter buttons to view:
   - All tasks
   - Only active tasks
   - Only completed tasks

### Sorting Tasks
1. Click "Date" to sort by creation date (newest first)
2. Click "Priority" to sort by priority level

### Bulk Actions
1. **Clear Completed** - Remove all completed tasks
2. **Clear All** - Delete all tasks (requires confirmation)
3. **Export** - Download all tasks as a JSON file

## 🎨 Design Features

- **Modern Dark Theme** - Easy on the eyes with indigo accent colors
- **Smooth Animations** - Fade-in, slide-in effects for visual feedback
- **Color-Coded Badges** - Quick visual identification of categories and priorities
- **Responsive Layout** - Adapts to all screen sizes
- **Interactive Modal** - Pop-up editor for task modifications
- **Toast Notifications** - Non-intrusive feedback messages

## 📊 Statistics Dashboard

The app displays real-time statistics:
- **Total**: All tasks in the system
- **Active**: Number of incomplete tasks
- **Completed**: Number of finished tasks

Statistics update instantly as you add, complete, or delete tasks.

## 💾 Data Persistence

All tasks are automatically saved to your browser's localStorage. This means:
- ✅ Tasks persist across browser sessions
- ✅ Tasks remain if you close and reopen the browser
- ✅ No server or login required
- ⚠️ Clearing browser data will delete tasks
- ⚠️ Data is stored locally per device/browser

## 📥 Import/Export

### Export Tasks
- Click the "Export" button
- A JSON file with all your tasks will be downloaded
- File naming: `todos_YYYY-MM-DD.json`

### Import Tasks (Manual)
1. Open developer console (F12)
2. Copy the JSON content from an exported file
3. Paste this in the console:
   ```javascript
   localStorage.setItem('todos', '[paste-json-here]');
   location.reload();
   ```

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with:
  - CSS Grid and Flexbox
  - CSS Variables
  - Gradient backgrounds
  - Smooth transitions
  - Responsive design
- **Vanilla JavaScript** - No frameworks or libraries
  - ES6+ Class syntax
  - LocalStorage API
  - Event delegation
  - DOM manipulation

## 🌐 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Opera (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Resources

This project demonstrates:
- Object-oriented JavaScript with ES6 classes
- LocalStorage API for data persistence
- DOM manipulation and event handling
- Responsive web design
- CSS Grid and Flexbox layouts
- Modal dialogs and form handling
- Toast notifications
- Data filtering and sorting

## 📝 Project Structure

```
├── index.html      # Main HTML file
├── styles.css      # Complete styling
├── script.js       # Application logic
└── README.md       # Documentation
```

## 🚀 Future Enhancements

Potential features for future versions:
- Due dates with reminders
- Task tags and labels
- Recurring tasks
- Cloud sync with Firebase/Supabase
- Dark/Light theme toggle
- Drag & drop reordering
- Task notes and descriptions
- Subtasks
- Search functionality
- Import from other apps

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Created with ❤️ | Made to help you stay productive**