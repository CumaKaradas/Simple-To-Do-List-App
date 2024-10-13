document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    taskList.addEventListener('click', handleTaskClick);

    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = createTaskElement(taskText);

        taskList.appendChild(li);
        saveTasks();
        taskInput.value = '';
        taskInput.focus();
    }

    function handleTaskClick(e) {
        const li = e.target.parentElement;
        if (e.target.classList.contains('deleteButton')) {
            taskList.removeChild(li);
        } else if (e.target.classList.contains('editButton')) {
            const newTaskText = prompt('Edit your task', li.firstChild.textContent);
            if (newTaskText) {
                li.firstChild.textContent = newTaskText;
            }
        } else if (e.target.classList.contains('completeButton')) {
            li.classList.toggle('completed');
        }
        saveTasks();
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'completeButton';
        li.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'editButton';
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        li.appendChild(deleteButton);

        return li;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = createTaskElement(task.text);
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }
});
