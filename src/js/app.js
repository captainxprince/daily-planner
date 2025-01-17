function updateDate() {
    const date = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = formattedDate;
}

// Update date immediately and set interval
updateDate();
setInterval(updateDate, 60000);

// Save and load priorities
function savePriorities() {
    const priorities = [];
    document.querySelectorAll('.priority-input').forEach(input => {
        priorities.push(input.value);
    });
    localStorage.setItem('priorities', JSON.stringify(priorities));
}

function loadPriorities() {
    const priorities = JSON.parse(localStorage.getItem('priorities')) || [];
    document.querySelectorAll('.priority-input').forEach((input, index) => {
        input.value = priorities[index] || '';
    });
}

// Save and load tasks
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            checked: li.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" ${task.checked ? 'checked' : ''}> <span>${task.text}</span>`;
        taskList.appendChild(li);
    });
}

// Save and load schedule
function saveSchedule() {
    const schedule = {};
    document.querySelectorAll('.time-block').forEach(block => {
        const time = block.querySelector('.time').textContent;
        const text = block.querySelector('.schedule-input').value;
        schedule[time] = text;
    });
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

function loadSchedule() {
    const schedule = JSON.parse(localStorage.getItem('schedule')) || {};
    document.querySelectorAll('.time-block').forEach(block => {
        const time = block.querySelector('.time').textContent;
        block.querySelector('.schedule-input').value = schedule[time] || '';
    });
}

// Save and load notes
function saveNotes() {
    const notes = document.querySelector('textarea').value;
    localStorage.setItem('notes', notes);
}

function loadNotes() {
    const notes = localStorage.getItem('notes') || '';
    document.querySelector('textarea').value = notes;
}

// Add Task function
function addTask() {
    const input = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox"> <span>${input.value}</span>`;
        taskList.appendChild(li);
        input.value = '';
        saveTasks();
    }
}

// Add event listeners
window.addEventListener('load', function() {
    // Load all data
    loadPriorities();
    loadTasks();
    loadSchedule();
    loadNotes();

    // Add event listeners for saving data
    document.querySelectorAll('.priority-input').forEach(input => {
        input.addEventListener('input', savePriorities);
    });

    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            saveTasks();
        }
    });

    document.querySelectorAll('.schedule-input').forEach(input => {
        input.addEventListener('input', saveSchedule);
    });

    document.querySelector('textarea').addEventListener('input', saveNotes);
});