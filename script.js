// Wait for the DOM content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // "Add Task" button
    const taskInput = document.getElementById('task-input'); // Input field for new tasks
    const taskList = document.getElementById('task-list'); // Task list container

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input value and trim spaces

        if (taskText === '') {
            alert('Please enter a task.'); // Alert if the input is empty
            return;
        }

        const listItem = document.createElement('li'); // Create a new <li> element
        listItem.textContent = taskText; // Set the task text

        const removeButton = document.createElement('button'); // Create "Remove" button
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // Use classList.add to assign class

        // Assign click event to the remove button to remove the task
        removeButton.onclick = () => listItem.remove();

        listItem.appendChild(removeButton); // Add the button to the <li>
        taskList.appendChild(listItem); // Add the <li> to the task list

        taskInput.value = ''; // Clear the input field
    }

    // Attach event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Attach event listener to the input field for keypress event
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask(); // Call addTask if 'Enter' is pressed
        }
    });
});
