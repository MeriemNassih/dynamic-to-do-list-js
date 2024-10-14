document.addEventListener('DOMContentLoaded', () => {
    // Load existing tasks from local storage
    loadTasks();

    const addButton = document.getElementById('add-task-btn'); // Get the "Add Task" button
    const taskInput = document.getElementById('task-input'); // Get the input field for new tasks
    const taskList = document.getElementById('task-list'); // Get the task list container

    // Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load without saving again
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        const listItem = document.createElement('li'); // Create <li> element
        listItem.textContent = taskText; // Set task text

        const removeButton = document.createElement('button'); // Create "Remove" button
        removeButton.textContent = 'Remove'; // Set button text

        // Use classList.add as required
        removeButton.classList.add('remove-btn'); 

        // Attach the click event to remove the task
        removeButton.onclick = () => {
            listItem.remove(); // Remove from the DOM
            removeTaskFromLocalStorage(taskText); // Remove from local storage
        };

        listItem.appendChild(removeButton); // Add button to the task item
        taskList.appendChild(listItem); // Add task to the list

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText); // Save new task
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update local storage
        }

        taskInput.value = ''; // Clear input field
    }

    // Function to remove a task from local storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Filter out the task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update local storage
    }

    // Attach click event to addButton to add tasks
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Get input value
        if (taskText) {
            addTask(taskText); // Add task if input is not empty
        } else {
            alert('Please enter a task.'); // Alert if input is empty
        }
    });

    // Allow adding tasks by pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get input value
            if (taskText) {
                addTask(taskText); // Add task if input is not empty
            } else {
                alert('Please enter a task.'); // Alert if input is empty
            }
        }
    });
});
