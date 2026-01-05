let tasks = [];

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

function renderTasks() {
    taskList.innerHTML = ''; // Clear the list

    // Check if there are any incomplete tasks
    const hasPending = tasks.some(task => !task.completed);

    // Case 1: All tasks completed (and there is at least one task)
    if (tasks.length > 0 && !hasPending) {
        const celebrationDiv = document.createElement('div');
        celebrationDiv.className = 'celebration';

        celebrationDiv.innerHTML = `
            <h2>🎉 Congratulations!</h2>
            <p>You have completed all your tasks for today!</p>
            <p><strong>Are there any more tasks to add?</strong></p>
            <div class="buttons">
                <button id="addMoreYes">Yes</button>
                <button id="addMoreNo">No</button>
            </div>
        `;

        taskList.appendChild(celebrationDiv);

        // Yes button → Encourage adding more
        document.getElementById('addMoreYes').addEventListener('click', () => {
            celebrationDiv.innerHTML = `
                <h2>🚀 Well done!</h2>
                <p>You're on fire! Let's add more tasks and keep the momentum going!</p>
            `;
            taskInput.focus();
        });

        // No button → Final proud congratulations
        document.getElementById('addMoreNo').addEventListener('click', () => {
            celebrationDiv.innerHTML = `
                <h2>🌟 Amazing job!</h2>
                <p>You've truly completed everything for today.<br>Great work — rest well and be proud! 😊</p>
            `;
            taskInput.focus(); // Still allow adding if they change mind
        });

    } else {
        // Case 2: Normal task list or empty

        const pending = tasks.filter(task => !task.completed);
        const completed = tasks.filter(task => task.completed);
        const sortedTasks = [...pending, ...completed];

        if (sortedTasks.length === 0) {
            // No tasks at all
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-message';
            emptyMsg.textContent = 'No tasks yet. Add one below to get started!';
            taskList.appendChild(emptyMsg);
        } else {
            // Render all tasks
            sortedTasks.forEach((task) => {
                const originalIndex = tasks.findIndex(t => t === task);

                const li = document.createElement('li');
                if (task.completed) {
                    li.classList.add('completed');
                }

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', () => {
                    tasks[originalIndex].completed = !tasks[originalIndex].completed;
                    renderTasks(); // Re-render to update view and check for celebration
                });

                const span = document.createElement('span');
                span.textContent = task.description;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '🗑';
                deleteBtn.addEventListener('click', () => {
                    tasks.splice(originalIndex, 1);
                    renderTasks();
                });

                li.appendChild(checkbox);
                li.appendChild(span);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }
    }
}

// Add new task on Enter key
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim() !== '') {
        e.preventDefault();
        tasks.push({
            description: taskInput.value.trim(),
            completed: false
        });
        taskInput.value = '';
        renderTasks();
    }
});

// Theme toggle (Dark / Light mode)
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Initial render when page loads
renderTasks();