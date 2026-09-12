// Todo List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add todo
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
                e.target.closest('.filter-btn').classList.add('active');
                this.currentFilter = e.target.closest('.filter-btn').dataset.filter;
                this.render();
            });
        });

        // Sort buttons
        document.getElementById('sortByDate').addEventListener('click', () => this.sortByDate());
        document.getElementById('sortByPriority').addEventListener('click', () => this.sortByPriority());

        // Action buttons
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTodos());

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveEdit());
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') this.closeModal();
        });
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const category = document.getElementById('categorySelect').value;
        const priority = document.getElementById('prioritySelect').value;
        const text = input.value.trim();

        if (!text) {
            this.showToast('Please enter a task', 'warning');
            return;
        }

        const todo = {
            id: Date.now(),
            text,
            category,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        this.render();
        input.value = '';
        document.getElementById('prioritySelect').value = 'medium';
        this.showToast('Task added successfully!', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveToStorage();
        this.render();
        this.showToast('Task deleted', 'success');
    }

    openEditModal(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        this.editingId = id;
        document.getElementById('editInput').value = todo.text;
        document.getElementById('editCategory').value = todo.category;
        document.getElementById('editPriority').value = todo.priority;
        document.getElementById('editModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.editingId = null;
    }

    saveEdit() {
        if (!this.editingId) return;

        const todo = this.todos.find(t => t.id === this.editingId);
        if (!todo) return;

        const text = document.getElementById('editInput').value.trim();
        if (!text) {
            this.showToast('Task cannot be empty', 'warning');
            return;
        }

        todo.text = text;
        todo.category = document.getElementById('editCategory').value;
        todo.priority = document.getElementById('editPriority').value;
        
        this.saveToStorage();
        this.render();
        this.closeModal();
        this.showToast('Task updated successfully!', 'success');
    }

    sortByDate() {
        this.todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.saveToStorage();
        this.render();
        this.showToast('Sorted by date', 'success');
    }

    sortByPriority() {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        this.todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        this.saveToStorage();
        this.render();
        this.showToast('Sorted by priority', 'success');
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showToast('No completed tasks to clear', 'warning');
            return;
        }
        if (confirm(`Are you sure? This will delete ${completedCount} completed task(s).`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
            this.showToast('Completed tasks cleared', 'success');
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            this.showToast('No tasks to clear', 'warning');
            return;
        }
        if (confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
            this.todos = [];
            this.saveToStorage();
            this.render();
            this.showToast('All tasks cleared', 'success');
        }
    }

    exportTodos() {
        if (this.todos.length === 0) {
            this.showToast('No tasks to export', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        this.showToast('Tasks exported successfully!', 'success');
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('completedCount').textContent = completed;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        this.updateStats();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '';
            emptyState.style.display = 'flex';
            return;
        }

        emptyState.style.display = 'none';
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleTodo(${todo.id})"
                >
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        <span class="todo-badge badge-category ${todo.category}">${todo.category}</span>
                        <span class="todo-badge badge-priority ${todo.priority}">${todo.priority} Priority</span>
                        <span class="todo-badge badge-date">${this.formatDate(todo.createdAt)}</span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="action-icon-btn edit" onclick="app.openEditModal(${todo.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-icon-btn delete" onclick="app.deleteTodo(${todo.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    saveToStorage() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            this.showToast('Error saving tasks', 'error');
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('todos');
            this.todos = data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.todos = [];
            this.showToast('Error loading tasks', 'error');
        }
    }
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});