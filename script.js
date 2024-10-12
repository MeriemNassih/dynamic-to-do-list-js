document.addEventListener('DOMContentLoaded', () => {
    // Load existing tasks from local storage
    loadTasks();

    const addButton = document.getElementById('add-task-btn'); // Get the "Add Task" button element
    const taskInput = document.getElementById('task-input'); // Get the input field for new tasks
    const taskList = document.getElementById('task-list'); // Get the task list container

    function loadTasks() {
        // Retrieve tasks from local storage, or an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Loop through each stored task and add it to the list (not saving again)
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again
    }

    function addTask(taskText, save = true) {
        const listItem = document.createElement('li'); // Create a new <li> element for the task
        listItem.textContent = taskText; // Set the text content of the list item to the task text

        const removeButton = document.createElement('button'); // Create a "Remove" button
        removeButton.textContent = 'Remove'; // Set button text
        removeButton.className = 'remove-btn'; // Set the class name for the button
        removeButton.onclick = () => {
            listItem.remove(); // Remove the list item from the DOM
            removeTaskFromLocalStorage(taskText); // Remove the task from local storage
        };

        listItem.appendChild(removeButton); // Append the remove button to the list item
        taskList.appendChild(listItem); // Append the list item to the task list

        if (save) {
            // Save the task to local storage if specified
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get existing tasks
            storedTasks.push(taskText); // Add the new task to the array
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update local storage with the new array
        }

        taskInput.value = ''; // Reset the input field to be empty
    }

    function removeTaskFromLocalStorage(taskText) {
        // Remove the specified task from local storage
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get existing tasks
        // Filter out the task that needs to be removed
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update local storage with the filtered array
    }

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Get the trimmed input value
        if (taskText) {
            addTask(taskText); // Add the task if the input is not empty
        } else {
            alert('Please enter a task.'); // Alert if the input is empty
        }
    });

    taskInput.addEventListener('keypress', (event) => {
        // Check if the key pressed is 'Enter'
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get the trimmed input value
            if (taskText) {
                addTask(taskText); // Add the task if the input is not empty
            } else {
                alert('Please enter a task.'); // Alert if the input is empty
            }
        }
    });
});
